import type { BaseResponse, Session, fetchConfig, WithRawUser, User } from "./shared";
import { parseUser, request } from "./shared";

export interface AuthenticateRequest {
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  provider_subject: string;
  provider_type: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
  provider_values: ProvidersValues;
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
    data?: AuthenticateRequest
  ): Promise<AuthenticateResponse> {
    return request<WithRawUser<AuthenticateResponse>>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: { token, ...data },
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }
}
