import * as http from "http";
import { StytchError, RequestError, StytchErrorJSON } from "./errors";

// https://github.com/developit/unfetch/issues/99
import * as fetchImport from 'isomorphic-unfetch'
const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default

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
  verified: boolean;
}

export interface CryptoWallet {
  crypto_wallet_id: string;
  crypto_wallet_address: string;
  crypto_wallet_type: string;
  verified: boolean;
}

export interface OAuthProvider {
  provider_subject: string;
  provider_type: string;
}

export interface EmailFactor {
  delivery_method: "email" | "embedded";
  type: string;
  last_authenticated_at: string;
  email_factor: {
    email_id: string;
    email_address: string;
  };
}

export interface PhoneNumberFactor {
  delivery_method: "sms" | "whatsapp";
  type: string;
  last_authenticated_at: string;
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

export interface MicrosoftOAuthFactor {
  delivery_method: "oauth_microsoft";
  type: string;
  last_authenticated_at: string;
  microsoft_oauth_factor: {
    id: string;
    email_id: string;
    provider_subject: string;
  };
}

export interface AppleOAuthFactor {
  delivery_method: "oauth_apple";
  type: string;
  last_authenticated_at: string;
  apple_oauth_factor: {
    id: string;
    email_id: string;
    provider_subject: string;
  };
}

export interface GithubOAuthFactor {
  delivery_method: "oauth_github";
  type: string;
  last_authenticated_at: string;
  github_oauth_factor: {
    id: string;
    email_id: string;
    provider_subject: string;
  };
}

export interface GitLabOAuthFactor {
  delivery_method: "oauth_gitlab";
  type: string;
  last_authenticated_at: string;
  gitlab_oauth_factor: {
    id: string;
    email_id: string;
    provider_subject: string;
  };
}

export interface FacebookOAuthFactor {
  delivery_method: "oauth_facebook";
  type: string;
  last_authenticated_at: string;
  facebook_oauth_factor: {
    id: string;
    email_id: string;
    provider_subject: string;
  };
}

export interface WebAuthnFactor {
  delivery_method: "webauthn_registration";
  type: string;
  last_authenticated_at: string;
  webauthn_factor: {
    webauthn_registration_id: string;
    domain: string;
    user_agent: string;
  };
}

export interface AuthenticatorAppFactor {
  delivery_method: "authenticator_app";
  type: string;
  last_authenticated_at: string;
  authenticator_app_factor: {
    totp_id: string;
  };
}

export interface RecoveryCodeFactor {
  delivery_method: "recovery_code";
  type: string;
  last_authenticated_at: string;
  recovery_code_factor: {
    totp_recovery_code_id: string;
  };
}

export interface CryptoWalletFactor {
  delivery_method: "crypto_wallet";
  type: string;
  last_authenticated_at: string;
  crypto_wallet_factor: {
    crypto_wallet_id: string;
    crypto_wallet_address: string;
    crypto_wallet_type: string;
  };
}

export type AuthenticationFactor =
  | EmailFactor
  | PhoneNumberFactor
  | GoogleOAuthFactor
  | MicrosoftOAuthFactor
  | AppleOAuthFactor
  | GithubOAuthFactor
  | GitLabOAuthFactor
  | FacebookOAuthFactor
  | WebAuthnFactor
  | AuthenticatorAppFactor
  | RecoveryCodeFactor
  | CryptoWalletFactor;

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

export interface fetchConfig {
  baseURL: string;
  headers: Record<string, string>;
  timeout: number;
  agent?: http.Agent;
}

export type requestConfig = {
  url: string;
  method: "GET" | "DELETE" | "POST" | "PUT";
  params?: Record<string, string | number>;
  data?: unknown;
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
    response = await fetch(url.toString(), {
      method: requestConfig.method,
      body: JSON.stringify(requestConfig.data),
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
