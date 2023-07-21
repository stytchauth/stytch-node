import { request, requestConfig } from "../lib/shared";
import * as http from "http";

export type Response = {
  status: number;
  data: Record<string, unknown>;
};

export type Request = {
  method: string;
  path: string;
  params?: Record<string, unknown>;
  data?: unknown;
};

export const MOCK_FETCH_CONFIG = {
  baseURL: "https://example.net",
  headers: {
    "User-Agent": `Stytch Node vTEST`,
  },
  timeout: 100,
  agent: { mock: "agent" } as unknown as http.Agent,
};

export function mockRequest(
  handler: (config: Request) => Response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): void {
  if (!(request as jest.Mock).mockImplementation) {
    throw Error(
      `request() is not a jest mock. Be sure to call "jest.mock('../lib/shared');" before using this helper!`
    );
  }
  (request as jest.Mock).mockReset();
  (request as jest.Mock).mockImplementation(
    (_, requestConfig: requestConfig) => {
      const request = {
        method: requestConfig.method?.toString() || "",
        path: requestConfig.url?.toString() || "",
        params: requestConfig.params,
        data: requestConfig.data,
      };
      const { status, data } = handler(request);
      return Promise.resolve({
        status,
        ...data,
      });
    }
  );
}
