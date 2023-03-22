import { MemberSession, Member } from "./shared_b2b";
import { BaseResponse, fetchConfig, request } from "../shared";
import { DiscoveredOrganization, Organization } from "./organizations";

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

export interface DiscoveryByEmailRequest {
  email_address: string;
  discovery_redirect_url?: string;
  pkce_code_challenge?: string;
  login_template_id?: string;
}

export type DiscoveryByEmailResponse = BaseResponse;

export interface DiscoveryAuthenticateRequest {
  intermediate_magic_links_token: string;
  pkce_code_verifier?: string;
}

export interface DiscoveryAuthenticateResponse extends BaseResponse {
  intermediate_session_token: string;
  email_address: string;
  discovered_organizations: DiscoveredOrganization[];
}

class Discovery {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  send(data: DiscoveryByEmailRequest): Promise<DiscoveryByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: "magic_links/email/discovery/send",
      data,
    });
  }

  authenticate(
    data: DiscoveryAuthenticateRequest
  ): Promise<DiscoveryAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: "magic_links/email/discovery/authenticate",
      data,
    });
  }
}

class Email {
  private base_path: string;
  private delivery = "email";

  private fetchConfig: fetchConfig;
  discovery: Discovery;

  constructor(fetchConfig: fetchConfig, parent_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
    this.discovery = new Discovery(fetchConfig);
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
