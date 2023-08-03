import { OAuth } from "../../lib/b2c/oauth";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";

jest.mock("../../lib/shared");

(request as jest.Mock).mockImplementation((_, config) => {
  return Promise.resolve({
    method: config.method,
    path: config.url,
    data: config.data,
    params: config.params,
  });
});

const oauth = new OAuth(MOCK_FETCH_CONFIG);

describe("oauth.authenticate", () => {
  test("session", () => {
    return expect(
      oauth.authenticate({ token: "fake-token" })
    ).resolves.toMatchObject({
      method: "POST",
      path: "/v1/oauth/authenticate",
      data: {
        token: "fake-token",
      },
    });
  });
});
