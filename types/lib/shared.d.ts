import type { AxiosInstance, AxiosRequestConfig } from "axios";
export interface Attributes {
    ip_address?: string;
    user_agent?: string;
}
export interface Name {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
}
export interface Email {
    email_id: string;
    email: string;
    verified: boolean;
}
export interface PhoneNumber {
    phone_id: string;
    phone_number: string;
    verified: boolean;
}
export interface EmailFactor {
    delivery_method: "email" | "embedded";
    type: string;
    last_authenticated_at: Date;
    email_factor: {
        email_id: string;
        email_address: string;
    };
}
export interface PhoneNumberFactor {
    delivery_method: "sms" | "whatsapp";
    type: string;
    last_authenticated_at: Date;
    phone_number_factor: {
        phone_id: string;
        phone_number: string;
    };
}
export interface GoogleOAuthFactor {
    delivery_method: "oauth_google";
    type: string;
    last_authenticated_at: string;
    google_oauth_factor: {
        id: string;
        email_id: string;
        provider_subject: string;
    };
}
export declare type AuthenticationFactor = EmailFactor | PhoneNumberFactor | GoogleOAuthFactor;
export interface Session {
    session_id: string;
    user_id: string;
    started_at: Date;
    last_accessed_at: Date;
    expires_at: Date;
    attributes: Attributes;
    authentication_factors: AuthenticationFactor[];
}
export interface BaseResponse {
    status_code: number;
    request_id: string;
}
export declare function request<T>(client: AxiosInstance, config: AxiosRequestConfig): Promise<T>;
