import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";
import { M2M } from "../../lib/b2c/m2m";
import * as jose from "jose";

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
  let createJWT: (payload: Record<string, unknown>) => Promise<string>;

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

    createJWT = (payload: Record<string, unknown>) =>
      new jose.SignJWT({
        sub: CLIENT_ID,
        ...payload,
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

    // And now sign the JWTs.
    accessToken = await createJWT({
      scope: "read:users read:books write:penguins",
      // Include some custom claims
      "custom key": "custom value",
    });
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
    ).rejects.toThrow(
      "missing_scopes: Missing required scopes: write:giraffes"
    );
  });

  it("fails when stale", async () => {
    await expect(() =>
      m2m.authenticateToken({
        access_token: accessToken,
        max_token_age_seconds: 0,
      })
    ).rejects.toThrow(/jwt_too_old/);
  });

  describe("scope wildcard matching", () => {
    const testCases = [
      {
        name: "wildcard match succeeds when enabled",
        client_scopes: ["read:*"],
        required_scopes: ["read:books"],
        permit_wildcard_matching: true,
        result: true,
      },
      {
        name: "wildcard match succeeds with arbitrary delimiter: _",
        client_scopes: ["read_*"],
        required_scopes: ["read_books"],
        permit_wildcard_matching: true,
        result: true,
      },
      {
        name: "wildcard match succeeds with no delimiter",
        client_scopes: ["read*"],
        required_scopes: ["readbooks"],
        permit_wildcard_matching: true,
        result: true,
      },
      {
        name: "wildcard match succeeds with multiple delimiters",
        client_scopes: ["read_*_*"],
        required_scopes: ["read_books_topsecret"],
        permit_wildcard_matching: true,
        result: true,
      },
      {
        name: "wildcard match fails with universal scope",
        client_scopes: ["*"],
        required_scopes: ["read"],
        permit_wildcard_matching: true,
        result: false,
      },
      {
        name: "universal scope still can match itself",
        client_scopes: ["*"],
        required_scopes: ["*"],
        permit_wildcard_matching: true,
        result: true,
      },
      {
        name: "wildcard match fails when wildcard hits delimiter boundary",
        client_scopes: ["read_*"],
        required_scopes: ["read_books_topsecret"],
        permit_wildcard_matching: true,
        result: false,
      },
      {
        name: "wildcard match fails when rest of word does not match",
        client_scopes: ["read:*"],
        required_scopes: ["write:books"],
        permit_wildcard_matching: false,
        result: false,
      },
      {
        name: "wildcard match fails when delimiter does not match",
        client_scopes: ["read_*"],
        required_scopes: ["read:books"],
        permit_wildcard_matching: false,
        result: false,
      },
      {
        name: "wildcard match fails when disabled",
        client_scopes: ["read:*"],
        required_scopes: ["read:books"],
        permit_wildcard_matching: false,
        result: false,
      },
    ];

    testCases.forEach((tc) => {
      it(tc.name, async () => {
        const accessToken = await createJWT({
          scope: tc.client_scopes.join(" "),
        });
        const res = m2m.authenticateToken({
          access_token: accessToken,
          required_scopes: tc.required_scopes,
          permit_wildcard_matching: tc.permit_wildcard_matching,
        });

        if (tc.result) {
          await expect(res).resolves.toEqual({
            client_id: CLIENT_ID,
            custom_claims: {},
            scopes: tc.client_scopes,
          });
        } else {
          await expect(res).rejects.toThrow(/missing_scopes/);
        }
      });
    });
  });
});
