import { StytchError } from "./stytch_error";

import type { AxiosInstance, AxiosRequestConfig } from "axios";

export interface Attributes {
  ip_address?: string;
  user_agent?: string;
}

export interface Name {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
}

export interface Email {
  email_id: string;
  email: string;
  verified: boolean;
}

export interface PhoneNumber {
  phone_id: string;
  phone_number: string;
  verified: boolean;
}

export interface BaseResponse {
  status_code: bigint;
  request_id: string;
}

export function request<T>(
  client: AxiosInstance,
  config: AxiosRequestConfig
): Promise<T> {
  return client
    .request(config)
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        throw new StytchError(err.response.data);
      } else if (err.request) {
        // No response received for the request.
        throw new Error(err.request);
      } else {
        // The request couldn't be sent for some reason.
        throw new Error(err.message);
      }
    });
}
