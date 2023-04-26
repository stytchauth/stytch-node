import { request, BaseResponse, fetchConfig } from "../shared";
import { Attributes, Name, Session, User } from "./shared_b2c";

export interface SendByEmailRequest {
  email: string;
  login_magic_link_url?: string;
  signup_magic_link_url?: string;
  login_expiration_minutes?: number;
  signup_expiration_minutes?: number;
  login_template_id?: string;
  signup_template_id?: string;
  attributes?: Attributes;
  code_challenge?: string;
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
  locale?: string;
}

export interface SendByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface LoginOrCreateByEmailRequest {
  email: string;
  login_magic_link_url?: string;
  signup_magic_link_url?: string;
  login_expiration_minutes?: number;
  signup_expiration_minutes?: number;
  login_template_id?: string;
  signup_template_id?: string;
  create_user_as_pending?: boolean;
  attributes?: Attributes;
  code_challenge?: string;
  locale?: string;
}

export interface LoginOrCreateByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
  user_created: boolean;
}

export interface InviteByEmailRequest {
  email: string;
  invite_magic_link_url?: string;
  invite_expiration_minutes?: number;
  invite_template_id?: string;
  name?: Name;
  attributes?: Attributes;
  locale?: string;
}

export interface InviteByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface MagicLinksCreateRequest {
  user_id: string;
  expiration_minutes?: number;
  attributes?: Attributes;
}

export interface MagicLinksCreateResponse extends BaseResponse {
  token: string;
  user_id: string;
}

export interface MagicLinksAuthenticateRequest {
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
  attributes?: Attributes;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface MagicLinksAuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  method_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
  reset_sessions: boolean;
}

export interface RevokePendingInviteByEmailRequest {
  email: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RevokePendingInviteByEmailResponse extends BaseResponse {}

class Email {
  base_path: string;
  delivery = "email";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, parent_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: SendByEmailRequest): Promise<SendByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: LoginOrCreateByEmailRequest
  ): Promise<LoginOrCreateByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
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

  revokeInvite(
    data: RevokePendingInviteByEmailRequest
  ): Promise<RevokePendingInviteByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke_invite"),
      data,
    });
  }
}

export class MagicLinks {
  base_path = "magic_links";
  email: Email;

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(data: MagicLinksCreateRequest): Promise<MagicLinksCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data: data,
    });
  }

  authenticate(
    token: string,
    data?: MagicLinksAuthenticateRequest
  ): Promise<MagicLinksAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: { token, ...data },
    });
  }
}
