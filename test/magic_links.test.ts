import axios from "axios";
import { MagicLinks } from "../lib/magic_links";

import type { AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = (config: AxiosRequestConfig): Promise<any> => {
  return Promise.resolve({
    data: {
      method: config.method,
      path: config.url,
      data: JSON.parse(config.data),
    },
  });
};
const magicLinks = new MagicLinks(axios.create({ adapter }));

describe("magicLinks.authenticate", () => {
  test("success", () => {
    return expect(
      magicLinks.authenticate("DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=", {
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration: "3600s",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "magic_links/authenticate",
      data: {
        token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration: "3600s",
      },
    });
  });
});

describe("magicLinks.email.send", () => {
  test("success", () => {
    return expect(
      magicLinks.email.send({
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "magic_links/email/send",
      data: {
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
      },
    });
  });
});

describe("magicLinks.email.loginOrCreate", () => {
  test("success", () => {
    return expect(
      magicLinks.email.loginOrCreate({
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "magic_links/email/login_or_create",
      data: {
        email: "sandbox@stytch.com",
        login_magic_link_url: "http://localhost:8000/login",
        signup_magic_link_url: "http://localhost:8000/signup",
      },
    });
  });
});

describe("magicLinks.email.invite", () => {
  test("success", () => {
    return expect(
      magicLinks.email.invite({
        email: "sandbox@stytch.com",
        invite_magic_link_url: "http://localhost:8000/invite",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "magic_links/email/invite",
      data: {
        email: "sandbox@stytch.com",
        invite_magic_link_url: "http://localhost:8000/invite",
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
      method: "post",
      path: "magic_links/email/revoke_invite",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
});
