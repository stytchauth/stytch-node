import axios from "axios";
import { Sessions } from "../lib/sessions";

import type { AxiosRequestConfig } from "axios";

type Response = {
  status: number;
  data: Record<string, unknown>;
};

type Request = {
  method: string;
  path: string;
  params: Record<string, unknown>;
  data?: Record<string, unknown>;
};

function mockRequest(
  handler: (config: Request) => Response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (config: AxiosRequestConfig) => Promise<any> {
  return (config: AxiosRequestConfig) => {
    const request = {
      method: config.method?.toString() || "",
      path: config.url?.toString() || "",
      params: config.params,
      data: config.data && JSON.parse(config.data),
    };
    const response = handler(request);
    return Promise.resolve({
      ...response,
      config,
    });
  };
}

describe("sessions.get", () => {
  test("success", () => {
    const adapter = mockRequest((req) => {
      expect(req).toEqual({
        method: "get",
        path: "sessions",
        params: {
          user_id: "user-test-22222222-2222-4222-8222-222222222222",
        },
      });

      const data = {
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
      return { status: 200, data };
    });
    const sessions = new Sessions(axios.create({ adapter }));

    return expect(
      sessions.get({
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
      })
    ).resolves.toMatchObject({
      status_code: 200,
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
    const adapter = mockRequest((req) => {
      expect(req).toEqual({
        method: "post",
        path: "sessions/authenticate",
        data: {
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
          session_duration_minutes: 60,
        },
      });

      const data = {
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
      return { status: 200, data };
    });
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
  const adapter = mockRequest((req) => {
    expect(req).toEqual({
      method: "post",
      path: "sessions/revoke",
      data: {
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      },
    });

    return { status: 200, data: {} };
  });
  const sessions = new Sessions(axios.create({ adapter }));

  test("success", () => {
    return expect(
      sessions.revoke({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toEqual({});
  });
});
