import { MemberSession, Member } from "./shared_b2b";
import { BaseResponse, fetchConfig, request } from "../shared";
import { Organization } from "./organizations";

export interface LoginOrSignupByEmailRequest {
  organization_id: string;
  email_address: string;
  login_redirect_url?: string;
  signup_redirect_url?: string;
  pkce_code_challenge?: string;
  login_template_id?: string;
  signup_template_id?: string;
}

export interface LoginOrSignupByEmailResponse extends BaseResponse {
  member_id: string;
  member: Member;
  member_created: boolean;
  organization: Organization;
}

export interface InviteByEmailRequest {
  organization_id: string;
  email_address: string;
  name?: string;
  invite_redirect_url?: string;
  invited_by_member_id?: string;
  invite_template_id?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface InviteByEmailResponse extends BaseResponse {
  member_id: string;
  member: Member;
  organization: Organization;
}

export interface AuthenticateRequest {
  magic_links_token: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  pkce_code_verifier?: string;
}

export interface AuthenticateResponse extends BaseResponse {
  member_id: string;
  member: Member;
  organization: Organization;
  organization_id: string;
  method_id: string;
  member_session?: MemberSession;
  session_token?: string;
  session_jwt?: string;
  reset_sessions: boolean;
}

class Email {
  private base_path: string;
  private delivery = "email";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, parent_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  loginOrSignup(
    data: LoginOrSignupByEmailRequest
  ): Promise<LoginOrSignupByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_signup"),
      data,
    });
  }

  invite(data: InviteByEmailRequest): Promise<InviteByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("invite"),
      data,
    });
  }
}

export class MagicLinks {
  private base_path = "magic_links";
  email: Email;

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<AuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
