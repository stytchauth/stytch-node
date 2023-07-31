import { SSO } from "../../lib/b2b/sso";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";

jest.mock("../../lib/shared");

beforeEach(() => {
  (request as jest.Mock).mockReset();
  (request as jest.Mock).mockImplementation((_, config) => {
    return Promise.resolve({
      method: config.method,
      path: config.url,
      data: config.data,
      params: config.params,
    });
  });
});

const oidc = new SSO(MOCK_FETCH_CONFIG).oidc;

describe("oidc.create", () => {
  test("success", () => {
    return expect(
      oidc.createConnection({
        organization_id: "organization-id-1234",
        display_name: "Test Connection",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "/v1/b2b/sso/oidc/organization-id-1234",
      data: {
        display_name: "Test Connection",
      },
    });
  });
});

describe("oidc.update", () => {
  test("success", () => {
    return expect(
      oidc.updateConnection({
        organization_id: "organization-id-1234",
        connection_id: "oidc-connection-5678",
        display_name: "Test Connection",
        client_id: "client-id-1234",
        client_secret: "client-secret-5678",
        issuer: "https://example.com/sso",
        authorization_url: "https://example.com/sso/authorize",
        token_url: "https://example.com/sso/token",
        userinfo_url: "https://example.com/sso/userinfo",
        jwks_url: "https://example.com/sso/jwks",
      })
    ).resolves.toMatchObject({
      method: "PUT",
      path: "/v1/b2b/sso/oidc/organization-id-1234/connections/oidc-connection-5678",
      data: {
        display_name: "Test Connection",
        client_id: "client-id-1234",
        client_secret: "client-secret-5678",
        issuer: "https://example.com/sso",
        authorization_url: "https://example.com/sso/authorize",
        token_url: "https://example.com/sso/token",
        userinfo_url: "https://example.com/sso/userinfo",
        jwks_url: "https://example.com/sso/jwks",
      },
    });
  });
});
