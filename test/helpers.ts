import type { AxiosRequestConfig } from "axios";

export type Response = {
  status: number;
  data: Record<string, unknown>;
};

export type Request = {
  method: string;
  path: string;
  params: Record<string, unknown>;
  data?: Record<string, unknown>;
};

export function mockRequest(
  handler: (config: Request) => Response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): (config: AxiosRequestConfig) => Promise<any> {
  return (config: AxiosRequestConfig) => {
    const request = {
      method: config.method?.toString() || "",
      path: config.url?.toString() || "",
      params: config.params,
      data: config.data && JSON.parse(config.data)
    };
    const response = handler(request);
    return Promise.resolve({
      ...response,
      config
    });
  };
}
