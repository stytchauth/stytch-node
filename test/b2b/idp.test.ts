import { MOCK_FETCH_CONFIG } from "../helpers";
import { IDP } from "../../lib/b2c/idp";
import * as jose from "jose";

jest.mock("../../lib/shared");

const PROJECT_ID = "project-test-00000000-0000-4000-8000-000000000000";
const CLIENT_ID = "idp-client-test-00000000-0000-4000-8000-000000000000";
const MEMBER_ID = "member-test-00000000-0000-4000-8000-000000000000";

describe("idp.introspectTokenLocal", () => {
  let accessToken: string;
  let idp: IDP;
  const nowEpoch = Math.floor(+new Date() / 1000);

  beforeEach(async () => {
    // Generate a new key and add it to a local JWKS.
    const keyID = "key0";
    const { publicKey, privateKey } = await jose.generateKeyPair("RS256");

    const jwk = await jose.exportJWK(publicKey);
    const jwks = jose.createLocalJWKSet({ keys: [{ ...jwk, kid: keyID }] });

    idp = new IDP(MOCK_FETCH_CONFIG, {
      projectID: PROJECT_ID,
      jwks,
    });

    accessToken = await new jose.SignJWT({
      sub: MEMBER_ID,
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
      .setIssuer(`https://stytch.com/${PROJECT_ID}`)
      .setAudience([CLIENT_ID])
      .sign(privateKey);
  });

  it("success", async () => {
    const res = await idp.introspectTokenLocal({
      token: accessToken,
      client_id: CLIENT_ID,
    });
    expect(res).toEqual({
      subject: MEMBER_ID,
      expires_at: nowEpoch + 60 * 60,
      audience: [CLIENT_ID],
      issued_at: nowEpoch,
      issuer: `https://stytch.com/${PROJECT_ID}`,
      not_before: nowEpoch,
      scope:
        "openid email profile phone full_access offline_access read:users read:books write:penguins",
      token_type: "access_token",
      custom_claims: { "custom key": "custom value" },
    });
  });
});
