import { discovery } from "../../lib/b2b/discovery";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";
import { Discovery } from "../../lib/b2b/discovery";

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

const discovery = new Discovery(MOCK_FETCH_CONFIG);

describe("discovery.organizations.list", () => {
  test("success", () => {
    return expect(
      discovery.organizations.list({
        intermediate_session_token:
          "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "discovery/organizations",
      data: {
        intermediate_session_token:
          "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
      },
    });
  });
});

describe("discovery.organizations.create", () => {
  test("success", () => {
    return expect(
      discovery.organizations.create({
        intermediate_session_token:
          "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        organization_name: "organization_name",
        organization_slug: "slug",
        organization_logo_url: "https://example.com",
        trusted_metadata: { a: 1, b: "two" },
        sso_jit_provisioning: "ALL_ALLOWED",
        email_allowed_domains: ["stytch.co", "example.io"],
        email_jit_provisioning: "RESTRICTED",
        email_invites: "ALL_ALLOWED",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "discovery/organizations/create",
      data: {
        intermediate_session_token:
          "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        organization_name: "organization_name",
        organization_slug: "slug",
        organization_logo_url: "https://example.com",
        trusted_metadata: { a: 1, b: "two" },
        sso_jit_provisioning: "ALL_ALLOWED",
        email_allowed_domains: ["stytch.co", "example.io"],
        email_jit_provisioning: "RESTRICTED",
        email_invites: "ALL_ALLOWED",
      },
    });
  });
});

describe("discovery.intermediateSessions.exchange", () => {
  test("success", () => {
    return expect(
      discovery.intermediateSessions.exchange({
        intermediate_session_token:
          "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        organization_id: "organization-id-1234",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "discovery/intermediate_sessions/exchange",
      data: {
        intermediate_session_token:
          "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        organization_id: "organization-id-1234",
      },
    });
  });
});
