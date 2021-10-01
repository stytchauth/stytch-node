import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
import { request } from "./shared";

export interface AuthenticateRequest {
  session_management_type?: "stytch" | "idp" | "none",
  session_token?: string;
  session_duration_minutes?: number;
}

export interface OAuthSession {
  idp?: {
    access_token?: string;
    refresh_token?: string;
  }
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  provider_subject: string;
  provider_type: string;
  session?: OAuthSession;
}

export class OAuth {
  base_path = "oauth";

  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(
    token: string,
    data?: AuthenticateRequest
  ): Promise<AuthenticateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: { token, ...data },
    });
  }
}
