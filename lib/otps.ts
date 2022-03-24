import { request } from "./shared";

import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Session } from "./shared";

export interface OTPEmailSendRequest {
  email: string;
  expiration_minutes?: number;
  attributes?: Attributes;
}

export interface OTPEmailSendResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface OTPEmailLoginOrCreateRequest {
  email: string;
  expiration_minutes?: number;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
}

export interface OTPEmailLoginOrCreateResponse extends BaseResponse {
  user_id: string;
  email_id: string;
  user_created: boolean;
}

export interface SendOTPBySMSRequest {
  phone_number: string;
  expiration_minutes?: number;
  attributes?: Attributes;
}

export interface SendOTPBySMSResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

export interface LoginOrCreateUserBySMSRequest {
  phone_number: string;
  expiration_minutes?: number;
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
  expiration_minutes?: number;
  attributes?: Attributes;
}

export interface OTPWhatsAppSendResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

export interface OTPWhatsAppLoginOrCreateRequest {
  phone_number: string;
  expiration_minutes?: number;
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
  session_jwt?: string;
  session_duration_minutes?: number;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  method_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

class Email {
  base_path: string;
  delivery = "email";

  private client: AxiosInstance;

  constructor(client: AxiosInstance, base_path: string) {
    this.client = client;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: OTPEmailSendRequest): Promise<OTPEmailSendResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: OTPEmailLoginOrCreateRequest
  ): Promise<OTPEmailLoginOrCreateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data,
    });
  }
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
  email: Email;
  sms: SMS;
  whatsapp: WhatsApp;

  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.email = new Email(client, this.base_path);
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
