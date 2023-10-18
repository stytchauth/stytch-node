import type { Dispatcher } from "undici";
import { RequestError, StytchError, StytchErrorJSON } from "./errors";

export interface fetchConfig {
  baseURL: string;
  headers: Record<string, string>;
  timeout: number;
  dispatcher?: Dispatcher;
}

export type requestConfig = {
  url: string;
  method: "GET" | "DELETE" | "POST" | "PUT";
  params?: Record<string, string | number>;
  data?: unknown;
  dataRaw?: BodyInit;
};

export async function request<T>(
  fetchConfig: fetchConfig,
  requestConfig: requestConfig
): Promise<T> {
  const url = new URL(requestConfig.url, fetchConfig.baseURL);
  if (requestConfig.params) {
    Object.entries(requestConfig.params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value))
    );
  }

  let response: Response;
  try {
    const body: BodyInit | undefined = requestConfig.data
      ? JSON.stringify(requestConfig.data)
      : requestConfig.dataRaw;

    response = await fetch(url.toString(), {
      method: requestConfig.method,
      body: body,
      cache: "no-store",
      ...fetchConfig,
    });
  } catch (e) {
    const err = e as Error;
    throw new RequestError(err.message, requestConfig);
  }

  let responseJSON;
  try {
    responseJSON = await response.json();
  } catch (e) {
    const err = e as Error;
    throw new RequestError(
      `Unable to parse JSON response from server: ${err.message}`,
      requestConfig
    );
  }

  if (response.status >= 400) {
    throw new StytchError(responseJSON as StytchErrorJSON);
  }

  return responseJSON as T;
}
