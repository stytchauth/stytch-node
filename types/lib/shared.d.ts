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
export interface WebAuthnRegistration {
    webauthn_registration_id: string;
    domain: string;
    user_agent: string;
    verified: boolean;
}
export interface TOTP {
    totp_id: string;
    verified: boolean;
}
export interface OAuthProvider {
    provider_subject: string;
    provider_type: string;
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
export interface WebAuthnFactor {
    delivery_method: "webauthn_registration";
    type: string;
    last_authenticated_at: Date;
    webauthn_factor: {
        webauthn_registration_id: string;
        domain: string;
        user_agent: string;
    };
}
export interface AuthenticatorAppFactor {
    delivery_method: "authenticator_app";
    type: string;
    last_authenticated_at: Date;
    authenticator_app_factor: {
        totp_id: string;
    };
}
export interface RecoveryCodeFactor {
    delivery_method: "recovery_code";
    type: string;
    last_authenticated_at: Date;
    recovery_code: {
        totp_recovery_code_id: string;
    };
}
export declare type AuthenticationFactor = EmailFactor | PhoneNumberFactor | GoogleOAuthFactor | WebAuthnFactor | AuthenticatorAppFactor | RecoveryCodeFactor;
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
