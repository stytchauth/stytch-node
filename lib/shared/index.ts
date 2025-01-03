import type { Dispatcher, BodyInit } from "undici";
import { RequestError, StytchError, StytchErrorJSON } from "./errors";

export interface fetchConfig {
  baseURL: string;
  fraudBaseURL: string;
  headers: Record<string, string>;
  timeout: number;
  dispatcher?: Dispatcher;
}

export type requestConfig = {
  url: string;
  method: "GET" | "DELETE" | "POST" | "PUT";
  params?: Record<string, string | number | boolean | undefined>;
  data?: unknown;
  dataRaw?: BodyInit;
  headers?: Record<string, string>;
  baseURLType?: "AUTH" | "FRAUD";
};

export async function request<T>(
  fetchConfig: fetchConfig,
  requestConfig: requestConfig
): Promise<T> {
  const baseURL =
    requestConfig.baseURLType && requestConfig.baseURLType == "FRAUD"
      ? fetchConfig.fraudBaseURL
      : fetchConfig.baseURL;
  const url = new URL(requestConfig.url, baseURL);
  if (requestConfig.params) {
    Object.entries(requestConfig.params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const finalHeaders = { ...fetchConfig.headers, ...requestConfig.headers };

  let response: Response;
  try {
    const body: BodyInit | undefined = requestConfig.data
      ? JSON.stringify(requestConfig.data)
      : requestConfig.dataRaw;

    response = await fetch(url.toString(), {
      method: requestConfig.method,
      body: body,
      // @ts-expect-error [AUTH-2047] things fail catastrophically when using the NextJS fetch-cache
      // so we need to explicitly opt out of it using the "no-store" tag - which isn't part of the core Node fetch API
      cache: "no-store",
      ...fetchConfig,
      headers: finalHeaders,
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
