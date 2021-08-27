import axios from "axios";
import { Sessions } from "../lib/sessions";

import type { AxiosRequestConfig } from "axios";

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

describe("sessions.get", () => {
  test("success", () => {
    return expect(
      sessions.get({
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
      })
    ).resolves.toMatchObject({
      method: "get",
      path: "sessions",
      params: {
        user_id: "user-test-22222222-2222-4222-8222-222222222222",
      },
    });
  });
});

describe("sessions.authenticate", () => {
  test("success", () => {
    return expect(
      sessions.authenticate({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration: "3600s",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "sessions/authenticate",
      data: {
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration: "3600s",
      },
    });
  });
});

describe("sessions.revoke", () => {
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
