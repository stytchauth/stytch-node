import { Session, User } from "./shared";
import type { Attributes, BaseResponse, fetchConfig } from "./shared";
export interface CreateRequest {
    email: string;
    password: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface CreateResponse extends BaseResponse {
    user_id: string;
    user: User;
    email_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface AuthenticateRequest {
    email: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface ResetByEmailStartRequest {
    email: string;
    login_redirect_url?: string;
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
    options?: {
        ip_match_required?: boolean;
        user_agent_match_required?: boolean;
    };
    attributes?: Attributes;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    code_verifier?: string;
}
export interface ResetByEmailResponse extends BaseResponse {
    user_id: string;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface StrengthCheckRequest {
    email?: string;
    password: string;
}
export interface StrengthCheckResponse extends BaseResponse {
    valid_password: boolean;
    score: number;
    breached_password: boolean;
    feedback: {
        suggestions: string[];
        warning: string;
    };
}
export interface MigrateRequest {
    email: string;
    hash: string;
    hash_type: "bcrypt";
    prepend_salt?: string;
    append_salt?: string;
}
export interface MigrateResponse extends BaseResponse {
    user_id: string;
    email_id: string;
    user_created: boolean;
}
export declare class Passwords {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: CreateRequest): Promise<CreateResponse>;
    authenticate(data?: AuthenticateRequest): Promise<AuthenticateResponse>;
    resetByEmailStart(data: ResetByEmailStartRequest): Promise<ResetByEmailStartResponse>;
    resetByEmail(token: string, password: string, data?: ResetByEmailRequest): Promise<ResetByEmailResponse>;
    strengthCheck(data: StrengthCheckRequest): Promise<StrengthCheckResponse>;
    migrate(data: MigrateRequest): Promise<MigrateResponse>;
}
