import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, fetchConfig, request } from "../shared";
import { DiscoveredOrganization } from "./organizations";

export interface B2BMagicLinksLoginOrSignupByEmailRequest {
  organization_id: string;
  email_address: string;
  login_redirect_url?: string;
  signup_redirect_url?: string;
  pkce_code_challenge?: string;
  login_template_id?: string;
  signup_template_id?: string;
  locale?: "en" | "es" | "pt-br";
}

export interface B2BMagicLinksLoginOrSignupByEmailResponse
  extends ResponseWithMember {
  member_created: boolean;
}

export interface B2BMagicLinksInviteByEmailRequest {
  organization_id: string;
  email_address: string;
  name?: string;
  invite_redirect_url?: string;
  invited_by_member_id?: string;
  invite_template_id?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  locale?: "en" | "es" | "pt-br";
}

export type B2BMagicLinksInviteByEmailResponse = ResponseWithMember;

export interface B2BMagicLinksAuthenticateRequest {
  magic_links_token: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  pkce_code_verifier?: string;
}

export interface B2BMagicLinksAuthenticateResponse extends ResponseWithMember {
  organization_id: string;
  method_id: string;
  member_session?: MemberSession;
  session_token?: string;
  session_jwt?: string;
  reset_sessions: boolean;
}

export interface B2BMagicLinksDiscoveryByEmailRequest {
  email_address: string;
  discovery_redirect_url?: string;
  pkce_code_challenge?: string;
  login_template_id?: string;
  locale?: "en" | "es" | "pt-br";
}

export type B2BMagicLinksDiscoveryByEmailResponse = BaseResponse;

export interface B2BMagicLinksDiscoveryAuthenticateRequest {
  discovery_magic_links_token: string;
  pkce_code_verifier?: string;
}

export interface B2BMagicLinksDiscoveryAuthenticateResponse
  extends BaseResponse {
  intermediate_session_token: string;
  email_address: string;
  discovered_organizations: DiscoveredOrganization[];
}

class EmailDiscovery {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  send(
    data: B2BMagicLinksDiscoveryByEmailRequest
  ): Promise<B2BMagicLinksDiscoveryByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: "magic_links/email/discovery/send",
      data,
    });
  }
}

class Discovery {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  authenticate(
    data: B2BMagicLinksDiscoveryAuthenticateRequest
  ): Promise<B2BMagicLinksDiscoveryAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: "magic_links/discovery/authenticate",
      data,
    });
  }
}

class Email {
  private base_path: string;
  private delivery = "email";

  private fetchConfig: fetchConfig;
  discovery: EmailDiscovery;

  constructor(fetchConfig: fetchConfig, parent_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
    this.discovery = new EmailDiscovery(fetchConfig);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  loginOrSignup(
    data: B2BMagicLinksLoginOrSignupByEmailRequest
  ): Promise<B2BMagicLinksLoginOrSignupByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_signup"),
      data,
    });
  }

  invite(
    data: B2BMagicLinksInviteByEmailRequest
  ): Promise<B2BMagicLinksInviteByEmailResponse> {
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
  discovery: Discovery;

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
    this.discovery = new Discovery(fetchConfig);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(
    data: B2BMagicLinksAuthenticateRequest
  ): Promise<B2BMagicLinksAuthenticateResponse> {
    return request<B2BMagicLinksAuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
