import { OAuth } from "../../lib/b2b/oauth";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";

jest.mock("../../lib/shared");
jest.mock("../../lib/b2c/shared_b2c");

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
    const data = {
      oauth_token: "fake-token",
    };
    return expect(oauth.authenticate(data)).resolves.toMatchObject({
      method: "POST",
      path: "oauth/authenticate",
      data: {
        oauth_token: "fake-token",
      },
    });
  });
});

describe("oauth.discovery.authenticate", () => {
  test("session", () => {
    const data = {
      discovery_oauth_token: "fake-token",
    };
    return expect(oauth.discovery.authenticate(data)).resolves.toMatchObject({
      method: "POST",
      path: "oauth/discovery/authenticate",
      data: {
        discovery_oauth_token: "fake-token",
      },
    });
  });
});
