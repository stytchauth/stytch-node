import { Attributes, Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";

export interface OTPEmailSendRequest {
  email: string;
  expiration_minutes?: number;
  login_template_id?: string;
  signup_template_id?: string;
  attributes?: Attributes;
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
  locale?: string;
}

export interface OTPEmailSendResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface OTPEmailLoginOrCreateRequest {
  email: string;
  expiration_minutes?: number;
  login_template_id?: string;
  signup_template_id?: string;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
  locale?: string;
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
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
  locale?: string;
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
  locale?: string;
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
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
  locale?: string;
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
  locale?: string;
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
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  method_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
  reset_sessions: boolean;
}

class Email {
  base_path: string;
  delivery = "email";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, base_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: OTPEmailSendRequest): Promise<OTPEmailSendResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: OTPEmailLoginOrCreateRequest
  ): Promise<OTPEmailLoginOrCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data,
    });
  }
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

  send(data: SendOTPBySMSRequest): Promise<SendOTPBySMSResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: LoginOrCreateUserBySMSRequest
  ): Promise<LoginOrCreateUserBySMSResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("login_or_create"),
      data,
    });
  }
}

class WhatsApp {
  base_path: string;
  delivery = "whatsapp";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, base_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(data: OTPWhatsAppSendRequest): Promise<OTPWhatsAppSendResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: OTPWhatsAppLoginOrCreateRequest
  ): Promise<OTPWhatsAppLoginOrCreateResponse> {
    return request(this.fetchConfig, {
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

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.email = new Email(fetchConfig, this.base_path);
    this.sms = new SMS(fetchConfig, this.base_path);
    this.whatsapp = new WhatsApp(fetchConfig, this.base_path);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
