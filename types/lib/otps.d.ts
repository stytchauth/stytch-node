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
declare class Email {
    base_path: string;
    delivery: string;
    private client;
    constructor(client: AxiosInstance, base_path: string);
    private endpoint;
    send(data: OTPEmailSendRequest): Promise<OTPEmailSendResponse>;
    loginOrCreate(data: OTPEmailLoginOrCreateRequest): Promise<OTPEmailLoginOrCreateResponse>;
}
declare class SMS {
    base_path: string;
    delivery: string;
    private client;
    constructor(client: AxiosInstance, base_path: string);
    private endpoint;
    send(data: SendOTPBySMSRequest): Promise<SendOTPBySMSResponse>;
    loginOrCreate(data: LoginOrCreateUserBySMSRequest): Promise<LoginOrCreateUserBySMSResponse>;
}
declare class WhatsApp {
    base_path: string;
    delivery: string;
    private client;
    constructor(client: AxiosInstance, base_path: string);
    private endpoint;
    send(data: OTPWhatsAppSendRequest): Promise<OTPWhatsAppSendResponse>;
    loginOrCreate(data: OTPWhatsAppLoginOrCreateRequest): Promise<OTPWhatsAppLoginOrCreateResponse>;
}
export declare class OTPs {
    base_path: string;
    email: Email;
    sms: SMS;
    whatsapp: WhatsApp;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
export {};
