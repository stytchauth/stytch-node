import type { BaseResponse, fetchConfig, Session, User } from "./shared";
export interface AuthenticateRequest {
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    code_verifier?: string;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    user: User;
    oauth_user_registration_id: string;
    provider_subject: string;
    provider_type: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
    provider_values: ProvidersValues;
    reset_sessions: boolean;
}
export interface ProvidersValues {
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
    expires_at?: number;
    scopes: string[];
}
export interface AttachRequest {
    provider: string;
    user_id?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface AttachResponse extends BaseResponse {
    oauth_attach_token: string;
}
export declare class OAuth {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(token: string, data?: AuthenticateRequest): Promise<AuthenticateResponse>;
    attach(data?: AttachRequest): Promise<AttachResponse>;
}
