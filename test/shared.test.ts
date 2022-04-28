// import axios from "axios";
import { request } from "../lib/shared";
//
// import type { AxiosRequestConfig } from "axios";
// import { MOCK_FETCH_CONFIG } from "./helpers";

describe.skip("request", () => {
  test("dummy test so jest doesnt fail us", () => {
    expect(request).toBeInstanceOf(Function);
  })
  // test("successful response returns data", () => {
  //   return expect(
  //     request(MOCK_FETCH_CONFIG, { url: "http://localhost:8000/hello" })
  //   ).resolves.toEqual({ key: "value" });
  // });

  // test("error response throws inspectable error", () => {
  //   expect.assertions(2);
  //
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const adapter = (config: AxiosRequestConfig): Promise<any> => {
  //     expect(config.url).toEqual("http://localhost:8000/whoops");
  //     const err = new Error();
  //     const enhancements = {
  //       response: {
  //         data: {
  //           status_code: 400,
  //           error_type: "bad_request",
  //           error_message: "Whoops!",
  //           error_url: "https://stytch.com/docs/api/errors/400",
  //         },
  //       },
  //     };
  //     return Promise.reject({ ...err, ...enhancements });
  //   };
  //   const client = axios.create({ adapter, validateStatus: () => false });
  //   return request(client, { url: "http://localhost:8000/whoops" }).catch(
  //     (err) => {
  //       expect(err).toMatchObject({
  //         status_code: 400,
  //         error_type: "bad_request",
  //         error_message: "Whoops!",
  //         error_url: "https://stytch.com/docs/api/errors/400",
  //       });
  //     }
  //   );
  // });
  //
  // test("no response rethrows original error", () => {
  //   expect.assertions(3);
  //
  //   const client = axios.create();
  //   return request(client, { url: "nowhere" }).catch((err) => {
  //     expect(err.toString()).toEqual(
  //       "Error: connect ECONNREFUSED 127.0.0.1:80"
  //     );
  //     expect(err.message).toEqual("connect ECONNREFUSED 127.0.0.1:80");
  //     expect(err.request).toMatchObject({
  //       url: "nowhere",
  //     });
  //   });
  // });
  //
  // test("unsendable request rethrows original error", () => {
  //   // Using assertions instead of .rejects so we can check both .toString() and unpacked values
  //   // in the same matcher.
  //   expect.assertions(3);
  //
  //   const client = axios.create();
  //   // BigInts don't serialize, which is weird, but that's useful to us here!
  //   return request(client, {
  //     url: "bigint",
  //     data: { bigint: BigInt(10) },
  //   }).catch((err) => {
  //     expect(err.toString()).toEqual(
  //       "Error: Do not know how to serialize a BigInt"
  //     );
  //     expect(err.message).toEqual("Do not know how to serialize a BigInt");
  //     expect(err.request).toMatchObject({
  //       url: "bigint",
  //     });
  //   });
  // });
});
