import { BaseResponse, fetchConfig } from "../shared";
import { MemberSession, ResponseWithMember } from "./shared_b2b";
import * as shared from "../shared/passwords";
export interface AuthenticateRequest {
    organization_id: string;
    email_address: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface AuthenticateResponse extends ResponseWithMember {
    organization_id: string;
    session_token?: string;
    session_jwt?: string;
    member_session?: MemberSession;
}
export interface EmailResetStartRequest {
    organization_id: string;
    email_address: string;
    login_redirect_url?: string;
    reset_password_redirect_url?: string;
    reset_password_expiration_minutes?: number;
    reset_password_template_id?: string;
    code_challenge?: string;
    locale?: string;
}
export interface EmailResetStartResponse extends BaseResponse {
    member_id: string;
    member_email_id: string;
}
export interface EmailResetRequest {
    password_reset_token: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    code_verifier?: string;
}
export interface EmailResetResponse extends ResponseWithMember {
    member_email_id: string;
    organization_id: string;
    session_token?: string;
    session_jwt?: string;
    member_session?: MemberSession;
}
export interface ExistingPasswordResetRequest {
    email_address: string;
    existing_password: string;
    new_password: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    organization_id: string;
}
export interface ExistingPasswordResetResponse extends ResponseWithMember {
    session_token?: string;
    session_jwt?: string;
    member_session?: MemberSession;
}
export interface SessionResetRequest {
    password: string;
    organization_id: string;
    session_token?: string;
    session_jwt?: string;
}
export interface SessionResetResponse extends ResponseWithMember {
    member_session?: MemberSession;
}
export interface StrengthCheckRequest {
    email_address?: string;
    password: string;
}
export interface StrengthCheckResponse extends BaseResponse {
    valid_password: boolean;
    score: number;
    breached_password: boolean;
    strength_policy: string;
    breach_detection_on_create: boolean;
    zxcvbn_feedback: {
        suggestions: string[];
        warning: string;
    };
    luds_feedback: {
        has_lower_case: boolean;
        has_upper_case: boolean;
        has_digit: boolean;
        has_symbol: boolean;
        missing_complexity: number;
        missing_characters: number;
    };
}
interface MigrateRequestBase {
    organization_id: string;
    email_address: string;
    hash: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
}
export declare type MigrateRequest = (shared.MD5MigrateRequest & MigrateRequestBase) | (shared.BcryptMigrateRequest & MigrateRequestBase) | (shared.Argon2IMigrateRequest & MigrateRequestBase) | (shared.Argon2IDMigrateRequest & MigrateRequestBase) | (shared.SHA1MigrateRequest & MigrateRequestBase) | (shared.ScryptMigrateRequest & MigrateRequestBase) | (shared.PHPassMigrateRequest & MigrateRequestBase);
export interface MigrateResponse extends ResponseWithMember {
    organization_id: string;
    member_created: boolean;
}
export declare class Passwords {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(data?: AuthenticateRequest): Promise<AuthenticateResponse>;
    resetByEmailStart(data: EmailResetStartRequest): Promise<EmailResetStartResponse>;
    resetByEmail(data?: EmailResetRequest): Promise<EmailResetResponse>;
    resetByExistingPassword(data: ExistingPasswordResetRequest): Promise<ExistingPasswordResetResponse>;
    resetBySession(data: SessionResetRequest): Promise<SessionResetResponse>;
    strengthCheck(data: StrengthCheckRequest): Promise<StrengthCheckResponse>;
    migrate(data: MigrateRequest): Promise<MigrateResponse>;
}
export {};
