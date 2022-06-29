import { Session, User } from "./shared";
import type { Attributes, BaseResponse, fetchConfig } from "./shared";
export interface CreateRequest {
    email: string;
    password: string;
    session_duration_minutes?: number;
}
export interface CreateResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
export interface AuthenticateRequest {
    email: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    user: User;
    method_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface ResetByEmailStartRequest {
    email: string;
    reset_password_redirect_url?: string;
    reset_password_expiration_minutes?: number;
    attributes?: Attributes;
    code_challenge?: string;
}
export interface ResetByEmailStartResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
export interface ResetByEmailRequest {
    password: string;
    options?: {
        ip_match_required?: boolean;
        user_agent_match_required?: boolean;
    };
    attributes?: Attributes;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    code_verifier?: string;
}
export interface ResetByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
export interface CheckStrengthRequest {
    email: string;
    password: string;
}
export interface CheckStrengthResponse extends BaseResponse {
    valid_password: boolean;
    score: number;
    breached_password: boolean;
    feedback: {
        suggestions: string[];
        warning: string;
    };
}
export declare class Passwords {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: CreateRequest): Promise<CreateResponse>;
    authenticate(data?: AuthenticateRequest): Promise<AuthenticateResponse>;
    resetByEmailStart(data: ResetByEmailStartRequest): Promise<ResetByEmailStartResponse>;
    resetByEmail(token: string, data: ResetByEmailRequest): Promise<ResetByEmailResponse>;
    checkStrength(data: CheckStrengthRequest): Promise<CheckStrengthResponse>;
}
