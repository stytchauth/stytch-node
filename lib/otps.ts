import { request } from "./shared";

import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Session } from "./shared";

export interface SendOTPBySMSRequest {
  phone_number: string;
  expiration_minutes?: bigint;
  attributes?: Attributes;
}

export interface SendOTPBySMSResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

export interface LoginOrCreateUserBySMSRequest {
  phone_number: string;
  expiration_minutes?: bigint;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
}

export interface LoginOrCreateUserBySMSResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
  user_created: boolean;
}

export interface OTPWhatsAppSendRequest {
  phone_number: string;
  expiration_minutes?: bigint;
  attributes?: Attributes;
}

export interface OTPWhatsAppSendResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

export interface OTPWhatsAppLoginOrCreateRequest {
  phone_number: string;
  expiration_minutes?: bigint;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
}

export interface OTPWhatsAppLoginOrCreateResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
  user_created: boolean;
}

export interface AuthenticateRequest {
  method_id: string;
  code: string;
  attributes?: Attributes;
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
  session_token?: string;
  session_duration?: string;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  method_id: string;
  session_token: string;
  session: Session;
}

class SMS {
  base_path: string;
  delivery = "sms";

  private client: AxiosInstance;

  constructor(client: AxiosInstance, base_path: string) {
    this.client = client;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: SendOTPBySMSRequest): Promise<SendOTPBySMSResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: LoginOrCreateUserBySMSRequest
  ): Promise<LoginOrCreateUserBySMSResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data,
    });
  }
}

class WhatsApp {
  base_path: string;
  delivery = "whatsapp";

  private client: AxiosInstance;

  constructor(client: AxiosInstance, base_path: string) {
    this.client = client;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: OTPWhatsAppSendRequest): Promise<OTPWhatsAppSendResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: OTPWhatsAppLoginOrCreateRequest
  ): Promise<OTPWhatsAppLoginOrCreateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data,
    });
  }
}

export class OTPs {
  base_path = "otps";
  sms: SMS;
  whatsapp: WhatsApp;

  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.sms = new SMS(client, this.base_path);
    this.whatsapp = new WhatsApp(client, this.base_path);
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
