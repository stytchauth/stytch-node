import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { fetchConfig, request } from "../shared";

export interface B2BOTPsSMSSendRequest {
  organization_id: string;
  member_id: string;
  phone_number?: string;
  locale?: "en" | "es" | "pt-br";
}

export type B2BOTPsSMSSendResponse = ResponseWithMember;

export interface B2BOTPsSMSAuthenticateRequest {
  organization_id: string;
  member_id: string;
  code: string;
  intermediate_session_token?: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  set_mfa_enrollment?: "enroll" | "unenroll";
}

export interface B2BOTPsSMSAuthenticateResponse extends ResponseWithMember {
  session_token: string;
  session_jwt: string;
  member_session: MemberSession;
}

class SMS {
  base_path: string;
  delivery = "sms";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, base_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: B2BOTPsSMSSendRequest): Promise<B2BOTPsSMSSendResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  authenticate(
    data: B2BOTPsSMSAuthenticateRequest
  ): Promise<B2BOTPsSMSAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}

export class OTPs {
  base_path = "otps";
  sms: SMS;

  constructor(fetchConfig: fetchConfig) {
    this.sms = new SMS(fetchConfig, this.base_path);
  }
}
