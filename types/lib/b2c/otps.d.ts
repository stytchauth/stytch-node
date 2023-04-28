import { Attributes, Session, User } from "./shared_b2c";
import { BaseResponse, fetchConfig } from "../shared";
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
    session_custom_claims?: Record<string, any>;
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
declare class Email {
    base_path: string;
    delivery: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, base_path: string);
    private endpoint;
    send(data: B2COTPsEmailSendRequest): Promise<B2COTPsEmailSendResponse>;
    loginOrCreate(data: B2COTPsEmailLoginOrCreateRequest): Promise<B2COTPsEmailLoginOrCreateResponse>;
}
declare class SMS {
    base_path: string;
    delivery: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, base_path: string);
    private endpoint;
    send(data: B2COTPsSMSSendRequest): Promise<B2COTPsSMSSendResponse>;
    loginOrCreate(data: B2COTPsSMSLoginOrCreateRequest): Promise<B2COTPsSMSLoginOrCreateResponse>;
}
declare class WhatsApp {
    base_path: string;
    delivery: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, base_path: string);
    private endpoint;
    send(data: B2COTPsWhatsAppSendRequest): Promise<B2COTPsWhatsAppSendResponse>;
    loginOrCreate(data: B2COTPsWhatsAppLoginOrCreateRequest): Promise<B2COTPsWhatsAppLoginOrCreateResponse>;
}
export declare class OTPs {
    base_path: string;
    email: Email;
    sms: SMS;
    whatsapp: WhatsApp;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(data: B2COTPsAuthenticateRequest): Promise<B2COTPsAuthenticateResponse>;
}
export {};
