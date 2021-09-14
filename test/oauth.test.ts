import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { OAuth } from "../dist/oauth";


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
const oauth = new OAuth(axios.create({ adapter }));

describe("oauth.authenticate", () => {
  test("session", () => {
    return expect(
      oauth.authenticate("fake-token")
    ).resolves.toMatchObject({
      method: "post",
      path: "oauth/authenticate",
      data: {
        token: "fake-token",
      },
    });
  });
  test("no session", () => {
    return expect(
      oauth.authenticate("fake-token",{
        session_management_type: "idp"
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "oauth/authenticate",
      data: {
        token: "fake-token",
        session_management_type: "idp",
      },
    });
  });
});
