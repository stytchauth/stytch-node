import { OTPs } from "../../lib/b2c/otps";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";

jest.mock("../../lib/shared");
jest.mock("../../lib/b2c/shared_b2c");

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

const otps = new OTPs(MOCK_FETCH_CONFIG);

describe("otps.authenticate", () => {
  test("session", () => {
    return expect(
      otps.authenticate({
        method_id: "phone-number-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        code: "123456",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/authenticate",
      data: {
        method_id: "phone-number-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        code: "123456",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      },
    });
  });
  test("no session", () => {
    return expect(
      otps.authenticate({
        method_id: "phone-number-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        code: "123456",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/authenticate",
      data: {
        method_id: "phone-number-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        code: "123456",
      },
    });
  });
});

describe("otps.email.send", () => {
  test("success", () => {
    return expect(
      otps.email.send({
        email: "sandbox@stytch.com",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/email/send",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
});

describe("otps.email.loginOrCreate", () => {
  test("success", () => {
    return expect(
      otps.email.loginOrCreate({
        email: "sandbox@stytch.com",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/email/login_or_create",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
});

describe("otps.sms.send", () => {
  test("success", () => {
    return expect(
      otps.sms.send({
        phone_number: "+12025550162",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/sms/send",
      data: {
        phone_number: "+12025550162",
      },
    });
  });
});

describe("otps.sms.loginOrCreate", () => {
  test("success", () => {
    return expect(
      otps.sms.loginOrCreate({
        phone_number: "+12025550162",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/sms/login_or_create",
      data: {
        phone_number: "+12025550162",
      },
    });
  });
});

describe("otps.whatsapp.send", () => {
  test("success", () => {
    return expect(
      otps.whatsapp.send({
        phone_number: "+12025550162",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/whatsapp/send",
      data: {
        phone_number: "+12025550162",
      },
    });
  });
});

describe("otps.whatsapp.loginOrCreate", () => {
  test("success", () => {
    return expect(
      otps.whatsapp.loginOrCreate({
        phone_number: "+12025550162",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/whatsapp/login_or_create",
      data: {
        phone_number: "+12025550162",
      },
    });
  });
});
