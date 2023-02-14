import { TOTPs } from "../../lib/b2c/totps";
import { MOCK_FETCH_CONFIG, mockRequest } from "./helpers";

jest.mock("../../lib/shared");
jest.mock("../../lib/b2c/shared_b2c");

describe("totps.create", () => {
  test("only required fields", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        status_code: 200,
        secret: "BTGNX5RKJRMQWQFRQKTG34JCF6XDRHZS",
        qr_code:
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAAAAADYoy0BAAAG8ElEQVR8EAAD//7dQP/5Y00bRAAAAAElFTkSuQmCC",
        recovery_codes: [
          "ckss-2skx-ebow",
          "spbc-424h-usy0",
          "hi08-n5tk-lns5",
          "1n6i-l5na-8axe",
          "aduj-eufq-w6yy",
          "i4l3-dxyt-urmx",
          "ayyi-utb0-gj0s",
          "lz0m-02bi-psbx",
          "l2qm-zrk1-8ujs",
          "c2qd-k7m4-ifmc",
        ],
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.create({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      status_code: 200,
      secret: "BTGNX5RKJRMQWQFRQKTG34JCF6XDRHZS",
      qr_code:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAAAAADYoy0BAAAG8ElEQVR8EAAD//7dQP/5Y00bRAAAAAElFTkSuQmCC",
      recovery_codes: [
        "ckss-2skx-ebow",
        "spbc-424h-usy0",
        "hi08-n5tk-lns5",
        "1n6i-l5na-8axe",
        "aduj-eufq-w6yy",
        "i4l3-dxyt-urmx",
        "ayyi-utb0-gj0s",
        "lz0m-02bi-psbx",
        "l2qm-zrk1-8ujs",
        "c2qd-k7m4-ifmc",
      ],
    });
  });
  test("required fields and expiration", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          expiration_minutes: 10,
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        status_code: 200,
        secret: "BTGNX5RKJRMQWQFRQKTG34JCF6XDRHZS",
        qr_code:
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAAAAADYoy0BAAAG8ElEQVR8EAAD//7dQP/5Y00bRAAAAAElFTkSuQmCC",
        recovery_codes: [
          "ckss-2skx-ebow",
          "spbc-424h-usy0",
          "hi08-n5tk-lns5",
          "1n6i-l5na-8axe",
          "aduj-eufq-w6yy",
          "i4l3-dxyt-urmx",
          "ayyi-utb0-gj0s",
          "lz0m-02bi-psbx",
          "l2qm-zrk1-8ujs",
          "c2qd-k7m4-ifmc",
        ],
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.create({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        expiration_minutes: 10,
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      status_code: 200,
      secret: "BTGNX5RKJRMQWQFRQKTG34JCF6XDRHZS",
      qr_code:
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAAAAADYoy0BAAAG8ElEQVR8EAAD//7dQP/5Y00bRAAAAAElFTkSuQmCC",
      recovery_codes: [
        "ckss-2skx-ebow",
        "spbc-424h-usy0",
        "hi08-n5tk-lns5",
        "1n6i-l5na-8axe",
        "aduj-eufq-w6yy",
        "i4l3-dxyt-urmx",
        "ayyi-utb0-gj0s",
        "lz0m-02bi-psbx",
        "l2qm-zrk1-8ujs",
        "c2qd-k7m4-ifmc",
      ],
    });
  });
});

describe("totps.authenticate", () => {
  test("only required fields", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps/authenticate",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          totp_code: "111111",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        status_code: 200,
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.authenticate({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        totp_code: "111111",
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
    });
  });
  test("session token & duration", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps/authenticate",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          totp_code: "111111",
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
          session_duration_minutes: 60,
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session: {
          started_at: new Date("2021-08-28T00:41:58.935673Z"),
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        },
        status_code: 200,
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.authenticate({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        totp_code: "111111",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
      session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      session: {
        started_at: new Date("2021-08-28T00:41:58.935673Z"),
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      },
      status_code: 200,
    });
  });
});

describe("totps.recovery_codes", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps/recovery_codes",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        status_code: 200,
        totps: [
          {
            totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
            status: "active",
            recovery_codes: [
              "ckss-2skx-ebow",
              "spbc-424h-usy0",
              "hi08-n5tk-lns5",
              "1n6i-l5na-8axe",
              "aduj-eufq-w6yy",
              "i4l3-dxyt-urmx",
              "ayyi-utb0-gj0s",
              "lz0m-02bi-psbx",
              "l2qm-zrk1-8ujs",
              "c2qd-k7m4-ifmc",
            ],
          },
        ],
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.recoveryCodes({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      status_code: 200,
      totps: [
        {
          totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
          status: "active",
          recovery_codes: [
            "ckss-2skx-ebow",
            "spbc-424h-usy0",
            "hi08-n5tk-lns5",
            "1n6i-l5na-8axe",
            "aduj-eufq-w6yy",
            "i4l3-dxyt-urmx",
            "ayyi-utb0-gj0s",
            "lz0m-02bi-psbx",
            "l2qm-zrk1-8ujs",
            "c2qd-k7m4-ifmc",
          ],
        },
      ],
    });
  });
});

describe("totp.recover", () => {
  test("only required fields", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps/recover",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          recovery_code: "1111-1111-1111",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        status_code: 200,
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.recover({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        recovery_code: "1111-1111-1111",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
      status_code: 200,
    });
  });
  test("session token & duration", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "totps/recover",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          recovery_code: "1111-1111-1111",
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
          session_duration_minutes: 60,
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session: {
          started_at: new Date("2021-08-28T00:41:58.935673Z"),
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        },
        status_code: 200,
      };
      return { status: 200, data };
    });
    const totp = new TOTPs(MOCK_FETCH_CONFIG);

    return expect(
      totp.recover({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        recovery_code: "1111-1111-1111",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      totp_id: "totp-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
      session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      session: {
        started_at: new Date("2021-08-28T00:41:58.935673Z"),
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      },
      status_code: 200,
    });
  });
});
