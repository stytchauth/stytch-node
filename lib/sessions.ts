import { request, Session } from "./shared";

import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";

export interface GetRequest {
  user_id: string;
}

export interface GetResponse extends BaseResponse {
  sessions: Session[];
}

export interface AuthenticateRequest {
  session_token: string;
  session_duration?: string;
}

export interface AuthenticateResponse extends BaseResponse {
  session: Session;
  session_token: string;
}

export interface RevokeRequest {
  session_id?: string;
  session_token?: string;
}

export type RevokeResponse = BaseResponse;

export class Sessions {
  base_path = "sessions";
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  get(params: GetRequest): Promise<GetResponse> {
    return request(this.client, {
      method: "GET",
      url: this.base_path,
      params,
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }

  revoke(data: RevokeRequest): Promise<RevokeResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("revoke"),
      data,
    });
  }
}
