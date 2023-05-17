import { Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";

export interface B2COAuthAuthenticateRequest {
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface B2COAuthAuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  oauth_user_registration_id: string;
  provider_subject: string;
  provider_type: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
  provider_values: ProvidersValues;
  reset_sessions: boolean;
}

export interface ProvidersValues {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  expires_at?: number;
  scopes: string[];
}

export interface B2COAuthAttachRequest {
  provider: string;

  /** Exactly one of these user-selection fields must be provided. */
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
}

export interface B2COAuthAttachResponse extends BaseResponse {
  oauth_attach_token: string;
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
    data?: B2COAuthAuthenticateRequest
  ): Promise<B2COAuthAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: { token, ...data },
    });
  }

  attach(data?: B2COAuthAttachRequest): Promise<B2COAuthAttachResponse> {
    return request<B2COAuthAttachResponse>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("attach"),
      data,
    });
  }
}
