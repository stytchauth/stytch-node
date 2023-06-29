import { Attributes, Name, Session, User } from "./shared_b2c";
import { BaseResponse, fetchConfig } from "../shared";
import { UserMetadata } from "./users";
import * as shared from "../shared/passwords";
export interface B2CPasswordsCreateRequest {
    email: string;
    password: string;
    name?: Name;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    trusted_metadata?: UserMetadata;
    untrusted_metadata?: UserMetadata;
}
export interface B2CPasswordsCreateResponse extends BaseResponse {
    user_id: string;
    user: User;
    email_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface B2CPasswordsAuthenticateRequest {
    email: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2CPasswordsAuthenticateResponse extends BaseResponse {
    user_id: string;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface B2CPasswordsResetByEmailStartRequest {
    email: string;
    login_redirect_url?: string;
    reset_password_redirect_url?: string;
    reset_password_expiration_minutes?: number;
    reset_password_template_id?: string;
    attributes?: Attributes;
    code_challenge?: string;
    locale?: string;
}
export interface B2CPasswordsResetByEmailStartResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
export interface B2CPasswordsResetByEmailRequest {
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
export interface B2CPasswordsResetByEmailResponse extends BaseResponse {
    user_id: string;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface B2CPasswordsResetByExistingPasswordRequest {
    email: string;
    existing_password: string;
    new_password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2CPasswordsResetByExistingPasswordResponse extends BaseResponse {
    user_id: string;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface B2CPasswordsResetBySessionRequest {
    password: string;
    session_token?: string;
    session_jwt?: string;
}
export interface B2CPasswordsResetBySessionResponse extends BaseResponse {
    user_id: string;
    user: User;
    session: Session;
}
export interface B2CPasswordsStrengthCheckRequest {
    email?: string;
    password: string;
}
export interface B2CPasswordsStrengthCheckResponse extends BaseResponse {
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
export declare type B2CPasswordsMigrateRequest = (shared.MD5MigrateRequest & MigrateRequestBase) | (shared.BcryptMigrateRequest & MigrateRequestBase) | (shared.Argon2IMigrateRequest & MigrateRequestBase) | (shared.Argon2IDMigrateRequest & MigrateRequestBase) | (shared.SHA1MigrateRequest & MigrateRequestBase) | (shared.ScryptMigrateRequest & MigrateRequestBase) | (shared.PHPassMigrateRequest & MigrateRequestBase) | (shared.PBKDF2MigrateRequest & MigrateRequestBase);
export interface B2CPasswordsMigrateResponse extends BaseResponse {
    user_id: string;
    email_id: string;
    user_created: boolean;
}
export declare class Passwords {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: B2CPasswordsCreateRequest): Promise<B2CPasswordsCreateResponse>;
    authenticate(data?: B2CPasswordsAuthenticateRequest): Promise<B2CPasswordsAuthenticateResponse>;
    resetByEmailStart(data: B2CPasswordsResetByEmailStartRequest): Promise<B2CPasswordsResetByEmailStartResponse>;
    resetByEmail(token: string, password: string, data?: B2CPasswordsResetByEmailRequest): Promise<B2CPasswordsResetByEmailResponse>;
    resetByExistingPassword(data: B2CPasswordsResetByExistingPasswordRequest): Promise<B2CPasswordsResetByExistingPasswordResponse>;
    resetBySession(data: B2CPasswordsResetBySessionRequest): Promise<B2CPasswordsResetBySessionResponse>;
    strengthCheck(data: B2CPasswordsStrengthCheckRequest): Promise<B2CPasswordsStrengthCheckResponse>;
    migrate(data: B2CPasswordsMigrateRequest): Promise<B2CPasswordsMigrateResponse>;
}
export {};
