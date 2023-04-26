import { Attributes, Name, Session, User } from "./shared_b2c";
import { BaseResponse, fetchConfig } from "../shared";
import { UserMetadata } from "./users";
import * as shared from "../shared/passwords";
export interface CreateRequest {
    email: string;
    password: string;
    name?: Name;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    trusted_metadata?: UserMetadata;
    untrusted_metadata?: UserMetadata;
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
    reset_password_template_id?: string;
    attributes?: Attributes;
    code_challenge?: string;
    locale?: string;
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
export interface ResetByExistingPasswordRequest {
    email: string;
    existing_password: string;
    new_password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface ResetByExistingPasswordResponse extends BaseResponse {
    user_id: string;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface ResetBySessionRequest {
    password: string;
    session_token?: string;
    session_jwt?: string;
}
export interface ResetBySessionResponse extends BaseResponse {
    user_id: string;
    user: User;
    session: Session;
}
export interface StrengthCheckRequest {
    email?: string;
    password: string;
}
export interface StrengthCheckResponse extends BaseResponse {
    valid_password: boolean;
    score: number;
    breached_password: boolean;
    strength_policy: string;
    breach_detection_on_create: boolean;
    feedback: {
        suggestions: string[];
        warning: string;
        luds_requirements: {
            has_lower_case: boolean;
            has_upper_case: boolean;
            has_digit: boolean;
            has_symbol: boolean;
            missing_complexity: number;
            missing_characters: number;
        };
    };
}
interface MigrateRequestBase {
    email: string;
    hash: string;
    name?: Name;
    trusted_metadata?: UserMetadata;
    untrusted_metadata?: UserMetadata;
}
export declare type MigrateRequest = (shared.MD5MigrateRequest & MigrateRequestBase) | (shared.BcryptMigrateRequest & MigrateRequestBase) | (shared.Argon2IMigrateRequest & MigrateRequestBase) | (shared.Argon2IDMigrateRequest & MigrateRequestBase) | (shared.SHA1MigrateRequest & MigrateRequestBase) | (shared.ScryptMigrateRequest & MigrateRequestBase) | (shared.PHPassMigrateRequest & MigrateRequestBase);
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
    resetByExistingPassword(data: ResetByExistingPasswordRequest): Promise<ResetByExistingPasswordResponse>;
    resetBySession(data: ResetBySessionRequest): Promise<ResetBySessionResponse>;
    strengthCheck(data: StrengthCheckRequest): Promise<StrengthCheckResponse>;
    migrate(data: MigrateRequest): Promise<MigrateResponse>;
}
export {};
