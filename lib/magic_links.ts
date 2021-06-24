import { request } from "./shared";

import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Name } from "./shared";

interface SendByEmailRequest {
  email: string;
  login_magic_link_url: string;
  signup_magic_link_url: string;
  login_expiration_minutes?: bigint;
  signup_expiration_minutes?: bigint;
  attributes?: Attributes;
}

interface SendByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

interface LoginOrCreateByEmailRequest {
  email: string;
  login_magic_link_url: string;
  signup_magic_link_url: string;
  login_expiration_minutes?: bigint;
  signup_expiration_minutes?: bigint;
  create_user_as_pending?: boolean;
  attributes?: Attributes;
}

interface LoginOrCreateByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
  user_created: boolean;
}

interface InviteByEmailRequest {
  email: string;
  invite_magic_link_url: string;
  invite_expiration_minutes?: bigint;
  name?: Name;
  attributes?: Attributes;
}

interface InviteByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

interface AuthenticateRequest {
  token: string;
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
  attributes?: Attributes;
}

interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  method_id: string;
}

interface RevokePendingInviteByEmailRequest {
  email: string;
}

interface RevokePendingInviteByEmailResponse extends BaseResponse {} // eslint-disable-line @typescript-eslint/no-empty-interface

class Email {
  base_path: string;
  delivery = "email";

  private client: AxiosInstance;

  constructor(client: AxiosInstance, parent_path: string) {
    this.client = client;
    this.base_path = `${parent_path}`;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: SendByEmailRequest): Promise<SendByEmailResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: LoginOrCreateByEmailRequest
  ): Promise<LoginOrCreateByEmailResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data,
    });
  }

  invite(data: InviteByEmailRequest): Promise<InviteByEmailResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("invite"),
      data,
    });
  }

  revokePendingInvite(
    data: RevokePendingInviteByEmailRequest
  ): Promise<RevokePendingInviteByEmailResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("revoke_invite"),
      data,
    });
  }
}

export default class MagicLinks {
  base_path = "magic_links";
  email: Email;

  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.email = new Email(client, this.base_path);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
