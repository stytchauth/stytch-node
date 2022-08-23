import { User } from "./shared";
import type { BaseResponse, Session, fetchConfig } from "./shared";
export interface TOTP {
    totp_id: string;
    verified: boolean;
    recovery_codes: string[];
}
export interface CreateRequest {
    user_id: string;
    expiration_minutes?: number;
}
export interface CreateResponse extends BaseResponse {
    totp_id: string;
    secret: string;
    qr_code: string;
    recovery_codes: string[];
    user: User;
    user_id: string;
}
export interface AuthenticateRequest {
    user_id: string;
    totp_code: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    user: User;
    totp_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface RecoveryCodesRequest {
    user_id: string;
}
export interface RecoveryCodesResponse extends BaseResponse {
    user_id: string;
    totps: TOTP[];
}
export interface RecoverRequest {
    user_id: string;
    recovery_code: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface RecoverResponse extends BaseResponse {
    user_id: string;
    user: User;
    totp_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export declare class TOTPs {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: CreateRequest): Promise<CreateResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
    recoveryCodes(data: RecoveryCodesRequest): Promise<RecoveryCodesResponse>;
    recover(data: RecoverRequest): Promise<RecoverResponse>;
}
