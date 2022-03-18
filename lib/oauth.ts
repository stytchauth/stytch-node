import type { BaseResponse, Session, fetchConfig } from "./shared";
import { request } from "./shared";

export interface AuthenticateRequest {
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  provider_subject: string;
  provider_type: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
  providerValues: ProvidersValues;
}

export interface ProvidersValues {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  expires_at?: number;
  scopes: string[];
}

export class OAuth {
  base_path = "oauth";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(
    token: string,
    data?: AuthenticateRequest,
  ): Promise<AuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: { token, ...data },
    });
  }
}
