import { request, Attributes, Session, AuthenticationFactor } from "./shared";

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
  session_duration_minutes?: number;
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

type SessionRaw = {
  session_id: string;
  user_id: string;
  started_at: string;
  last_accessed_at: string;
  expires_at: string;
  attributes: Attributes;
  authentication_factors: AuthenticationFactor[];
};

interface GetResponseRaw extends BaseResponse {
  sessions: SessionRaw[];
}

interface AuthenticateResponseRaw extends BaseResponse {
  session: SessionRaw;
  session_token: string;
}

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
    return request<GetResponseRaw>(this.client, {
      method: "GET",
      url: this.base_path,
      params,
    }).then((res): GetResponse => {
      return {
        ...res,
        sessions: res.sessions.map(parseSession),
      };
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<AuthenticateResponseRaw>(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    }).then((res): AuthenticateResponse => {
      return {
        ...res,
        session: parseSession(res.session),
      };
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

function parseSession(session: SessionRaw): Session {
  const started_at = new Date(session.started_at);
  const last_accessed_at = new Date(session.last_accessed_at);
  const expires_at = new Date(session.expires_at);
  return {
    ...session,
    started_at,
    expires_at,
    last_accessed_at,
  };
}
