import { MagicLinks } from "../lib/b2c/magic_links";
import { MOCK_FETCH_CONFIG } from "./helpers";
import { request } from "../lib/b2c/shared";

jest.mock("../lib/shared");
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

describe("magicLinks.create", () => {
  test("success", () => {
    return expect(
      magicLinks.create({
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
        expiration_minutes: 75,
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links",
      data: {
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
        expiration_minutes: 75,
      },
    });
  });
});

describe("magicLinks.authenticate", () => {
  test("session", () => {
    return expect(
      magicLinks.authenticate("DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=", {
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/authenticate",
      data: {
        token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      },
    });
  });
  test("no session", () => {
    return expect(
      magicLinks.authenticate("DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=")
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/authenticate",
      data: {
        token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
      },
    });
  });
});

describe("magicLinks.email.send", () => {
  test("success: minimal", () => {
    return expect(
      magicLinks.email.send({
        email: "sandbox@stytch.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/send",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.email.send({
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
        login_expiration_minutes: 10,
        signup_expiration_minutes: 10,
        attributes: {
          user_agent: "Toaster/3.0",
          ip_address: "203.0.113.1",
        },
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/send",
      data: {
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
        login_expiration_minutes: 10,
        signup_expiration_minutes: 10,
        attributes: {
          user_agent: "Toaster/3.0",
          ip_address: "203.0.113.1",
        },
      },
    });
  });
});

describe("magicLinks.email.loginOrCreate", () => {
  test("success", () => {
    return expect(
      magicLinks.email.loginOrCreate({
        email: "sandbox@stytch.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/login_or_create",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.email.loginOrCreate({
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
        login_expiration_minutes: 10,
        signup_expiration_minutes: 10,
        create_user_as_pending: true,
        attributes: {
          user_agent: "Toaster/3.0",
          ip_address: "203.0.113.1",
        },
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/login_or_create",
      data: {
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
        login_expiration_minutes: 10,
        signup_expiration_minutes: 10,
        create_user_as_pending: true,
        attributes: {
          user_agent: "Toaster/3.0",
          ip_address: "203.0.113.1",
        },
      },
    });
  });
});

describe("magicLinks.email.invite", () => {
  test("success", () => {
    return expect(
      magicLinks.email.invite({
        email: "sandbox@stytch.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/invite",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
  test("success: everything", () => {
    return expect(
      magicLinks.email.invite({
        email: "sandbox@stytch.com",
        invite_magic_link_url: "http://localhost:8000/invite",
        invite_expiration_minutes: 10,
        attributes: {
          user_agent: "Toaster/3.0",
          ip_address: "203.0.113.1",
        },
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/invite",
      data: {
        email: "sandbox@stytch.com",
        invite_magic_link_url: "http://localhost:8000/invite",
        invite_expiration_minutes: 10,
        attributes: {
          user_agent: "Toaster/3.0",
          ip_address: "203.0.113.1",
        },
      },
    });
  });
});

describe("magicLinks.email.revokeInvite", () => {
  test("success", () => {
    return expect(
      magicLinks.email.revokeInvite({
        email: "sandbox@stytch.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "magic_links/email/revoke_invite",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
});
