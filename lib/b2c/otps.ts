import { Attributes, Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";

export interface B2COTPsEmailSendRequest {
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

export interface B2COTPsEmailSendResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface B2COTPsEmailLoginOrCreateRequest {
  email: string;
  expiration_minutes?: number;
  login_template_id?: string;
  signup_template_id?: string;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
  locale?: string;
}

export interface B2COTPsEmailLoginOrCreateResponse extends BaseResponse {
  user_id: string;
  email_id: string;
  user_created: boolean;
}

export interface B2COTPsSMSSendRequest {
  phone_number: string;
  expiration_minutes?: number;
  attributes?: Attributes;
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
  locale?: string;
}

export interface B2COTPsSMSSendResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

export interface B2COTPsSMSLoginOrCreateRequest {
  phone_number: string;
  expiration_minutes?: number;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
  locale?: string;
}

export interface B2COTPsSMSLoginOrCreateResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
  user_created: boolean;
}

export interface B2COTPsWhatsAppSendRequest {
  phone_number: string;
  expiration_minutes?: number;
  attributes?: Attributes;
  user_id?: string;
  session_token?: string;
  session_jwt?: string;
  locale?: string;
}

export interface B2COTPsWhatsAppSendResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

export interface B2COTPsWhatsAppLoginOrCreateRequest {
  phone_number: string;
  expiration_minutes?: number;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
  locale?: string;
}

export interface B2COTPsWhatsAppLoginOrCreateResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
  user_created: boolean;
}

export interface B2COTPsAuthenticateRequest {
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

export interface B2COTPsAuthenticateResponse extends BaseResponse {
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

  send(data: B2COTPsEmailSendRequest): Promise<B2COTPsEmailSendResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: B2COTPsEmailLoginOrCreateRequest
  ): Promise<B2COTPsEmailLoginOrCreateResponse> {
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

  send(data: B2COTPsSMSSendRequest): Promise<B2COTPsSMSSendResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: B2COTPsSMSLoginOrCreateRequest
  ): Promise<B2COTPsSMSLoginOrCreateResponse> {
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

  send(data: B2COTPsWhatsAppSendRequest): Promise<B2COTPsWhatsAppSendResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("send"),
      data,
    });
  }

  loginOrCreate(
    data: B2COTPsWhatsAppLoginOrCreateRequest
  ): Promise<B2COTPsWhatsAppLoginOrCreateResponse> {
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

  authenticate(
    data: B2COTPsAuthenticateRequest
  ): Promise<B2COTPsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
