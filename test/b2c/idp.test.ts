import { MOCK_FETCH_CONFIG } from "../helpers";
import { IDP } from "../../lib/b2c/idp";
import * as jose from "jose";
import { KeyLike } from "node:crypto";

jest.mock("../../lib/shared");

const PROJECT_ID = "project-test-00000000-0000-4000-8000-000000000000";
const USER_ID = "user-test-00000000-0000-4000-8000-000000000000";

async function generateAccessToken(
  keyID: string,
  nowEpoch: number,
  privateKey: KeyLike,
  issuer: string
): Promise<string> {
  return await new jose.SignJWT({
    sub: USER_ID,
    scope:
      "openid email profile phone full_access offline_access read:users read:books write:penguins",
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
    .setIssuer(issuer)
    .setAudience([PROJECT_ID])
    .sign(privateKey);
}

describe("idp.introspectTokenLocal", () => {
  let accessToken: string;
  let idp: IDP;
  let privateKey: string;
  const keyID = "key0";
  const nowEpoch = Math.floor(+new Date() / 1000);

  beforeEach(async () => {
    // Generate a new key and add it to a local JWKS.
    const { publicKey, privateKey: pk } = await jose.generateKeyPair("RS256");
    privateKey = pk;

    const jwk = await jose.exportJWK(publicKey);
    const jwks = jose.createLocalJWKSet({ keys: [{ ...jwk, kid: keyID }] });

    idp = new IDP(MOCK_FETCH_CONFIG, {
      projectID: PROJECT_ID,
      jwks,
      issuers: [`stytch.com/${PROJECT_ID}`, MOCK_FETCH_CONFIG.baseURL],
    });
    accessToken = await generateAccessToken(
      keyID,
      nowEpoch,
      privateKey,
      `stytch.com/${PROJECT_ID}`
    );
  });

  it("success", async () => {
    const res = await idp.introspectTokenLocal(accessToken);
    expect(res).toEqual({
      subject: USER_ID,
      expires_at: nowEpoch + 60 * 60,
      audience: [PROJECT_ID],
      issued_at: nowEpoch,
      issuer: `stytch.com/${PROJECT_ID}`,
      not_before: nowEpoch,
      scope:
        "openid email profile phone full_access offline_access read:users read:books write:penguins",
      token_type: "access_token",
      custom_claims: { "custom key": "custom value" },
    });
  });

  it("success with base URL issuer", async () => {
    const baseURLIssuerAccessToken = await generateAccessToken(
      keyID,
      nowEpoch,
      privateKey,
      MOCK_FETCH_CONFIG.baseURL
    );
    const res = await idp.introspectTokenLocal(baseURLIssuerAccessToken);
    expect(res).toEqual({
      subject: USER_ID,
      expires_at: nowEpoch + 60 * 60,
      audience: [PROJECT_ID],
      issued_at: nowEpoch,
      issuer: MOCK_FETCH_CONFIG.baseURL,
      not_before: nowEpoch,
      scope:
        "openid email profile phone full_access offline_access read:users read:books write:penguins",
      token_type: "access_token",
      custom_claims: { "custom key": "custom value" },
    });
  });
});
