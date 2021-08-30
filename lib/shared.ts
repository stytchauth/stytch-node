import { StytchError, RequestError } from "./errors";

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

export interface Session {
  session_id: string;
  user_id: string;
  started_at: Date;
  last_accessed_at: Date;
  expires_at: Date;
  attributes: Attributes;
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
        // Received a structured error from the API
        throw new StytchError(err.response.data);
      } else if (err.request) {
        // No response received for the request.
        throw new RequestError(err.message, err.config);
      } else {
        // The request couldn't be sent for some reason.
        throw new RequestError(err.message, config);
      }
    });
}
