import { parseUser, request, Session, User, WithRawUser } from "./shared";

import type { Attributes, BaseResponse, Name, fetchConfig } from "./shared";

export interface SendByEmailRequest {
  email: string;
  login_magic_link_url?: string;
  signup_magic_link_url?: string;
  login_expiration_minutes?: number;
  signup_expiration_minutes?: number;
  attributes?: Attributes;
  code_challenge?: string;
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
  create_user_as_pending?: boolean;
  attributes?: Attributes;
  code_challenge?: string;
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
  name?: Name;
  attributes?: Attributes;
}

export interface InviteByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface CreateRequest {
  user_id: string;
  expiration_minutes?: number;
  attributes?: Attributes;
}

export interface CreateResponse extends BaseResponse {
  token: string;
  user_id: string;
}

export interface AuthenticateRequest {
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
  attributes?: Attributes;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Map<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  method_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface RevokePendingInviteByEmailRequest {
  email: string;
}

export interface RevokePendingInviteByEmailResponse extends BaseResponse {} // eslint-disable-line @typescript-eslint/no-empty-interface

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

  create(data: CreateRequest): Promise<CreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data: data,
    });
  }

  authenticate(
    token: string,
    data?: AuthenticateRequest
  ): Promise<AuthenticateResponse> {
    return request<WithRawUser<AuthenticateResponse>>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: { token, ...data },
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }
}
