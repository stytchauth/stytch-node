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

export interface WebAuthnRegistration {
  webauthn_registration_id: string;
  domain: string;
  user_agent: string;
  verified: boolean;
}

export interface TOTP {
  totp_id: string;
  status: string;
}

export interface OAuthProvider {
  provider_subject: string;
  provider_type: string;
}

export interface EmailFactor {
  delivery_method: "email" | "embedded";
  type: string;
  last_authenticated_at: Date;
  email_factor: {
    email_id: string;
    email_address: string;
  };
}

export interface PhoneNumberFactor {
  delivery_method: "sms" | "whatsapp";
  type: string;
  last_authenticated_at: Date;
  phone_number_factor: {
    phone_id: string;
    phone_number: string;
  };
}

export interface GoogleOAuthFactor {
  delivery_method: "oauth_google";
  type: string;
  last_authenticated_at: string;
  google_oauth_factor: {
    id: string;
    email_id: string;
    provider_subject: string;
  };
}

export interface WebAuthnFactor {
  delivery_method: "webauthn_registration";
  type: string;
  last_authenticated_at: Date;
  webauthn_factor: {
    webauthn_registration_id: string;
    domain: string;
    user_agent: string;
  };
}

export interface AuthenticatorAppFactor {
  delivery_method: "authenticator_app";
  type: string;
  last_authenticated_at: Date;
  authenticator_app_factor: {
    totp_id: string;
  };
}

export type AuthenticationFactor =
  | EmailFactor
  | PhoneNumberFactor
  | GoogleOAuthFactor
  | WebAuthnFactor
  | AuthenticatorAppFactor;

export interface Session {
  session_id: string;
  user_id: string;
  started_at: Date;
  last_accessed_at: Date;
  expires_at: Date;
  attributes: Attributes;
  authentication_factors: AuthenticationFactor[];
}

export interface BaseResponse {
  status_code: number;
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
