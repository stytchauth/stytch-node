import axios from "axios";
import { Sessions } from "../lib/sessions";

import type { AxiosRequestConfig } from "axios";

describe("sessions.get", () => {
  test("success", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = (config: AxiosRequestConfig): Promise<any> => {
      expect(config.method).toEqual("get");
      expect(config.url).toEqual("sessions");
      expect(config.params).toEqual({
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
      });
      expect(config.data).toBeUndefined();
      const responseData = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        sessions: [
          {
            attributes: null,
            expires_at: "2021-08-30T18:16:53.370383Z",
            last_accessed_at: "2021-08-30T17:16:53.370383Z",
            session_id: "session-test-33333333-3333-4333-8333-333333333333",
            started_at: "2021-08-28T00:41:58.935673870Z",
            user_id: "user-test-22222222-2222-4222-8222-222222222222",
          },
        ],
        status_code: 200,
      };
      return Promise.resolve({
        data: responseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
    };
    const sessions = new Sessions(axios.create({ adapter }));
    return expect(
      sessions.get({
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
      })
    ).resolves.toMatchObject({
      sessions: [
        expect.objectContaining({
          started_at: new Date("2021-08-28T00:41:58.935673Z"),
          user_id: "user-test-22222222-2222-4222-8222-222222222222",
        }),
      ],
    });
  });
});

describe("sessions.authenticate", () => {
  test("success", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = (config: AxiosRequestConfig): Promise<any> => {
      expect(config.method).toEqual("post");
      expect(config.url).toEqual("sessions/authenticate");
      expect(config.params).toBeUndefined();
      expect(config.data && JSON.parse(config.data)).toEqual({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      });
      const responseData = {
        request_id: "request-id-test-a8876db0-601a-4251-94bd-79dafe63f4dc",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session: {
          attributes: null,
          expires_at: "2021-08-30T18:16:53.370383Z",
          last_accessed_at: "2021-08-30T17:16:53.370383Z",
          session_id: "session-test-eb94233f-8800-4ebd-8645-51dc15f9d028",
          started_at: "2021-08-28T00:41:58.935673870Z",
          user_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        },
        status_code: 200,
      };
      return Promise.resolve({
        data: responseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: config,
      });
    };
    const sessions = new Sessions(axios.create({ adapter }));
    return expect(
      sessions.authenticate({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      session: {
        started_at: new Date("2021-08-28T00:41:58.935673Z"),
        user_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
      },
    });
  });
});

describe("sessions.revoke", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = (config: AxiosRequestConfig): Promise<any> => {
    return Promise.resolve({
      data: {
        method: config.method,
        path: config.url,
        data: config.data && JSON.parse(config.data),
        params: config.params,
      },
    });
  };
  const sessions = new Sessions(axios.create({ adapter }));

  test("success", () => {
    return expect(
      sessions.revoke({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "sessions/revoke",
      data: {
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      },
    });
  });
});
