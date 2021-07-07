import axios from "axios";
import { request } from "../lib/shared";

import type { AxiosRequestConfig } from "axios";

describe("request", () => {
  test("successful response", () => {
    expect.assertions(2);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = (config: AxiosRequestConfig): Promise<any> => {
      expect(config.url).toEqual("http://localhost:8000/hello");
      return Promise.resolve({ data: { key: "value" } });
    };
    const client = axios.create({ adapter });
    return expect(
      request(client, { url: "http://localhost:8000/hello" })
    ).resolves.toEqual({ key: "value" });
  });

  test("error response", () => {
    expect.assertions(2);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adapter = (config: AxiosRequestConfig): Promise<any> => {
      expect(config.url).toEqual("http://localhost:8000/whoops");
      const err = new Error();
      const enhancements = {
        response: {
          data: {
            status_code: 400,
            error_type: "bad_request",
            error_message: "Whoops!",
            error_url: "https://stytch.com/docs/api/errors/400",
          },
        },
      };
      return Promise.reject({ ...err, ...enhancements });
    };
    const client = axios.create({ adapter, validateStatus: () => false });
    return request(client, { url: "http://localhost:8000/whoops" }).catch(
      (err) => {
        expect(err).toMatchObject({
          status_code: 400,
          error_type: "bad_request",
          error_message: "Whoops!",
          error_url: "https://stytch.com/docs/api/errors/400",
        });
      }
    );
  });
});
