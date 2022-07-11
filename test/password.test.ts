
import { Passwords } from "../lib/passwords";
import { request } from "../lib/shared";
import { MOCK_FETCH_CONFIG } from "./helpers";

jest.mock('../lib/shared');
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


const passwords = new Passwords(MOCK_FETCH_CONFIG);

describe("passwords.create", () => {
  test("basic", () => {
    return expect(
      passwords.create({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords",
      data: {
        password: "not-a-real-password",
        email: "Ada_Lovelace@example.com",
      },
    });
  })
})

describe("passwords.authenticate", () => {
  test("session", () => {
    return expect(
      passwords.authenticate({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/authenticate",
      data: {
        password: "not-a-real-password",
        email: "Ada_Lovelace@example.com",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      },
    });
  });
  test("no session", () => {
    return expect(
      passwords.authenticate({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/authenticate",
      data: {
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      },
    });
  });
});

describe("passwords.resetByEmailStart", () => {
  test("basic", () => {
    return expect(
      passwords.resetByEmailStart({
        email: "Ada_Lovelace@example.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset/start",
      data: {
        email: "Ada_Lovelace@example.com",
      },
    });
  })
  test("pkce", () => {
    return expect(
      passwords.resetByEmailStart({
        email: "Ada_Lovelace@example.com",
        code_challenge: "exmaple_code_challenge",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset/start",
      data: {
        code_challenge: "exmaple_code_challenge",
        email: "Ada_Lovelace@example.com",
      },
    });
  })
})

describe("passwords.resetByEmail", () => {
  test("basic", () => {
    return expect(
      passwords.resetByEmail('example-token',{
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset",
      data: {
        token: 'example-token',
        password: "not-a-real-password",
      },
    });
  })
  test("pkce", () => {
    return expect(
      passwords.resetByEmail('example-token',{
        password: "not-a-real-password",
        code_verifier: "exmaple_code_verifier",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset",
      data: {
        token: 'example-token',
        password: "not-a-real-password",
        code_verifier: "exmaple_code_verifier",
      },
    });
  })
})

describe("passwords.strengthCheck", () => {
  test("basic", () => {
    return expect(
      passwords.strengthCheck({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/strength_check",
      data: {
        password: "not-a-real-password",
        email: "Ada_Lovelace@example.com",
      },
    });
  })
})