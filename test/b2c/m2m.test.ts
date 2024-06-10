import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";
import { M2M } from "../../lib/b2c/m2m";
import * as jose from "jose";
import { performAuthorizationCheck } from "../../lib/b2c/m2m_local";
import { ClientError } from "../../lib/shared/errors";

jest.mock("../../lib/shared");

const PROJECT_ID = "project-test-00000000-0000-4000-8000-000000000000";
const CLIENT_ID = "m2m-client-test-00000000-0000-4000-8000-000000000000";

describe("m2m.token", () => {
  const m2m = new M2M(MOCK_FETCH_CONFIG, {
    projectID: PROJECT_ID,
    jwks: jose.createLocalJWKSet({ keys: [] }),
  });

  test("success", async () => {
    (request as jest.Mock).mockImplementation((fetchConfig, requestConfig) => {
      expect(fetchConfig).toEqual({
        ...MOCK_FETCH_CONFIG,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": `Stytch Node vTEST`,
        },
      });

      expect(requestConfig).toEqual({
        method: "POST",
        url: "/v1/public/project-test-00000000-0000-4000-8000-000000000000/oauth2/token",
        dataRaw: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: "expected_client_secret",
          grant_type: "client_credentials",
        }),
      });

      return Promise.resolve({ access_token: "eJy..." });
    });

    const res = await m2m.token({
      client_id: CLIENT_ID,
      client_secret: "expected_client_secret",
    });

    expect(res).toEqual({ access_token: "eJy..." });
  });

  test("success with scopes", async () => {
    (request as jest.Mock).mockImplementation((_, requestConfig) => {
      const scope = (requestConfig.dataRaw as URLSearchParams).get("scope");
      expect(scope).toEqual("read:users write:users");

      return Promise.resolve({ access_token: "eJy..." });
    });

    const res = await m2m.token({
      client_id: CLIENT_ID,
      client_secret: "expected_client_secret",
      scopes: ["read:users", "write:users"],
    });

    expect(res).toEqual({ access_token: "eJy..." });
  });
});

describe("m2m.authenticateToken", () => {
  let accessToken: string;
  let m2m: M2M;

  beforeEach(async () => {
    // Generate a new key and add it to a local JWKS.
    const keyID = "key0";
    const { publicKey, privateKey } = await jose.generateKeyPair("RS256");

    const jwk = await jose.exportJWK(publicKey);
    const jwks = jose.createLocalJWKSet({ keys: [{ ...jwk, kid: keyID }] });
    const nowEpoch = Math.floor(+new Date() / 1000);

    m2m = new M2M(MOCK_FETCH_CONFIG, {
      projectID: PROJECT_ID,
      jwks,
    });

    // And now sign the JWTs.
    accessToken = await new jose.SignJWT({
      sub: CLIENT_ID,
      scope: "read:users read:books write:penguins",
      // Include some custom claims
      "custom key": "custom value",
    })
      .setProtectedHeader({
        alg: "RS256",
        kid: keyID,
        typ: "JWT",
      })
      .setIssuedAt(nowEpoch)
      .setNotBefore(nowEpoch)
      .setExpirationTime(nowEpoch + 60 * 60) // one hour
      .setIssuer(`stytch.com/${PROJECT_ID}`)
      .setAudience([PROJECT_ID])
      .sign(privateKey);
  });

  it("success", async () => {
    const res = await m2m.authenticateToken({
      access_token: accessToken,
    });
    expect(res).toEqual({
      client_id: CLIENT_ID,
      custom_claims: { "custom key": "custom value" },
      scopes: ["read:users", "read:books", "write:penguins"],
    });
  });

  it("success when checking scopes", async () => {
    const res = await m2m.authenticateToken({
      access_token: accessToken,
      required_scopes: ["write:penguins"],
    });
    expect(res).toEqual({
      client_id: CLIENT_ID,
      custom_claims: { "custom key": "custom value" },
      scopes: ["read:users", "read:books", "write:penguins"],
    });
  });

  it("success with max_token_age_seconds param", async () => {
    const res = await m2m.authenticateToken({
      access_token: accessToken,
      max_token_age_seconds: 100,
    });
    expect(res).toEqual({
      client_id: CLIENT_ID,
      custom_claims: { "custom key": "custom value" },
      scopes: ["read:users", "read:books", "write:penguins"],
    });
  });

  it("fails when missing scope", async () => {
    await expect(() =>
      m2m.authenticateToken({
        access_token: accessToken,
        required_scopes: ["write:giraffes"],
      })
    ).rejects.toThrow(ClientError);
  });

  it("fails when stale", async () => {
    await expect(() =>
      m2m.authenticateToken({
        access_token: accessToken,
        max_token_age_seconds: 0,
      })
    ).rejects.toThrow(/jwt_too_old/);
  });
});

describe("performAuthorizationCheck", () => {
  test("basic", () => {
    const has = ["read:users", "write:users"];
    const needs = ["read:users"];

    const res = performAuthorizationCheck({
      hasScopes: has,
      requiredScopes: needs,
    });
    expect(res).toEqual(true);
  });

  test("multiple required scopes", () => {
    const has = ["read:users", "write:users", "read:books"];
    const needs = ["read:users", "read:books"];

    const res = performAuthorizationCheck({
      hasScopes: has,
      requiredScopes: needs,
    });
    expect(res).toEqual(true);
  });

  test("simple scopes", () => {
    const has = ["read_users", "write_users"];
    const needs = ["read_users"];

    const res = performAuthorizationCheck({
      hasScopes: has,
      requiredScopes: needs,
    });
    expect(res).toEqual(true);
  });

  test("wildcard resource", () => {
    const has = ["read:*", "write:*"];
    const needs = ["read:users"];

    const res = performAuthorizationCheck({
      hasScopes: has,
      requiredScopes: needs,
    });
    expect(res).toEqual(true);
  });

  test("missing required scope", () => {
    const has = ["read:users"];
    const needs = ["write:users"];

    const res = performAuthorizationCheck({
      hasScopes: has,
      requiredScopes: needs,
    });
    expect(res).toEqual(false);
  });

  test("missing required scope with wildcard", () => {
    const has = ["read:users", "write:*"];
    const needs = ["delete:books"];

    const res = performAuthorizationCheck({
      hasScopes: has,
      requiredScopes: needs,
    });
    expect(res).toEqual(false);
  });
  test("has simple scope and wants specific scope", () => {
    const params = {
      hasScopes: ["read"],
      requiredScopes: ["read:users"],
    };

    const res = performAuthorizationCheck(params);
    expect(res).toEqual(false);
  });

  test("has specific scope and wants simple scope", () => {
    const params = {
      hasScopes: ["read:users"],
      requiredScopes: ["read"],
    };

    const res = performAuthorizationCheck(params);
    expect(res).toEqual(false);
  });
});
