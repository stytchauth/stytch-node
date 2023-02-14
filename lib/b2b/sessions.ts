import { BaseResponse, request, fetchConfig } from "../shared";
import { Member, MemberSession } from "./shared_b2b";

export interface GetRequest {
  organization_id: string;
  member_id: string;
}

export interface GetResponse extends BaseResponse {
  member_sessions: MemberSession[];
}

export interface AuthenticateRequest {
  session_duration_minutes?: number;
  session_token?: string;
  session_jwt?: string;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthenticateResponse extends BaseResponse {
  member_session: MemberSession;
  member: Member;
  session_token: string;
  session_jwt: string;
}

export type RevokeRequest =
  | { member_session_id: string }
  | { session_token: string }
  | { session_jwt: string }
  | { member_id: string };

export type RevokeResponse = BaseResponse;

export class Sessions {
  private base_path = "sessions";
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  get({ organization_id, member_id }: GetRequest): Promise<GetResponse> {
    return request<GetResponse>(this.fetchConfig, {
      method: "GET",
      url: this.base_path,
      params: { organization_id, member_id },
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<AuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }

  revoke(data: RevokeRequest): Promise<RevokeResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke"),
      data,
    });
  }
}
