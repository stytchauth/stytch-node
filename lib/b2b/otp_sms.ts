// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { request } from "../shared";

export interface B2BSmsAuthenticateRequest {
  organization_id: string;
  member_id: string;
  code: string;
  intermediate_session_token?: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  set_mfa_enrollment?: string;
}

export interface B2BSmsAuthenticateResponse {
  request_id: string;
  member_id: string;
  member: Member;
  organization: Organization;
  session_token: string;
  session_jwt: string;
  status_code: number;
  member_session?: MemberSession;
}

export interface B2BSmsSendRequest {
  organization_id: string;
  member_id: string;
  phone_number?: string;
  locale?: "en" | "es" | "pt-br";
}

export interface B2BSmsSendResponse {
  request_id: string;
  member_id: string;
  member: Member;
  organization: Organization;
  status_code: number;
}

export class Sms {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  send(data: B2BSmsSendRequest): Promise<B2BSmsSendResponse> {
    return request<B2BSmsSendResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/otps/sms/send`,
      data,
    });
  }

  authenticate(
    data: B2BSmsAuthenticateRequest
  ): Promise<B2BSmsAuthenticateResponse> {
    return request<B2BSmsAuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/otps/sms/authenticate`,
      data,
    });
  }
}
