import { MagicLinks } from "../../lib/b2b/magic_links";
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

const magicLinks = new MagicLinks(MOCK_FETCH_CONFIG);

describe("magicLinks.authenticate", () => {
  test("session", () => {
    return expect(
      magicLinks.authenticate({
        magic_links_token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/authenticate",
      data: {
        magic_links_token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      },
    });
  });
  test("no session", () => {
    return expect(
      magicLinks.authenticate({
        magic_links_token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/authenticate",
      data: {
        magic_links_token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
      },
    });
  });
});

describe("magicLinks.email.loginOrSignup", () => {
  test("success", () => {
    return expect(
      magicLinks.email.loginOrSignup({
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/login_or_signup",
      data: {
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.email.loginOrSignup({
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
        login_redirect_url: "http://localhost:8000/login",
        signup_redirect_url: "http://localhost:8000/signup",
        pkce_code_challenge: "000000000000",
        login_template_id: "login_dark_mode",
        signup_template_id: "signup_dark_mode",
        locale: "es",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/login_or_signup",
      data: {
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
        login_redirect_url: "http://localhost:8000/login",
        signup_redirect_url: "http://localhost:8000/signup",
        pkce_code_challenge: "000000000000",
        login_template_id: "login_dark_mode",
        signup_template_id: "signup_dark_mode",
        locale: "es",
      },
    });
  });
});

describe("magicLinks.email.invite", () => {
  test("success", () => {
    return expect(
      magicLinks.email.invite({
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/invite",
      data: {
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.email.invite({
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
        name: "Joe Test",
        invite_redirect_url: "http://localhost:8000/invite",
        invited_by_member_id: "member-id-1234",
        invite_template_id: "invite_darkmode",
        trusted_metadata: { a: 1, b: [2] },
        untrusted_metadata: { a: 1, b: [2] },
        locale: "pt-br",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/invite",
      data: {
        email_address: "sandbox@stytch.com",
        organization_id: "organization-id-1234",
        name: "Joe Test",
        invite_redirect_url: "http://localhost:8000/invite",
        invited_by_member_id: "member-id-1234",
        invite_template_id: "invite_darkmode",
        trusted_metadata: { a: 1, b: [2] },
        untrusted_metadata: { a: 1, b: [2] },
        locale: "pt-br",
      },
    });
  });
});

describe("magicLinks.email.discovery.send", () => {
  test("success", () => {
    return expect(
      magicLinks.email.discovery.send({
        email_address: "sandbox@stytch.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/discovery/send",
      data: {
        email_address: "sandbox@stytch.com",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.email.discovery.send({
        email_address: "sandbox@stytch.com",
        discovery_redirect_url: "http://localhost:8000/discover",
        pkce_code_challenge: "000000000000",
        login_template_id: "login_dark_mode",
        locale: "pt-br",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/discovery/send",
      data: {
        email_address: "sandbox@stytch.com",
        discovery_redirect_url: "http://localhost:8000/discover",
        pkce_code_challenge: "000000000000",
        login_template_id: "login_dark_mode",
        locale: "pt-br",
      },
    });
  });
});

describe("magicLinks.discovery.authenticate", () => {
  test("success", () => {
    return expect(
      magicLinks.discovery.authenticate({
        discovery_magic_links_token:
          "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/discovery/authenticate",
      data: {
        discovery_magic_links_token:
          "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.discovery.authenticate({
        discovery_magic_links_token:
          "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        pkce_code_verifier: "1111111111",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/discovery/authenticate",
      data: {
        discovery_magic_links_token:
          "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        pkce_code_verifier: "1111111111",
      },
    });
  });
});
