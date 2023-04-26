import { Session, User } from "./shared_b2c";
import { BaseResponse, fetchConfig } from "../shared";
export interface TOTP {
    totp_id: string;
    verified: boolean;
    recovery_codes: string[];
}
export interface TOTPsCreateRequest {
    user_id: string;
    expiration_minutes?: number;
}
export interface TOTPsCreateResponse extends BaseResponse {
    totp_id: string;
    secret: string;
    qr_code: string;
    recovery_codes: string[];
    user: User;
    user_id: string;
}
export interface TOTPsAuthenticateRequest {
    user_id: string;
    totp_code: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface TOTPsAuthenticateResponse extends BaseResponse {
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
    create(data: TOTPsCreateRequest): Promise<TOTPsCreateResponse>;
    authenticate(data: TOTPsAuthenticateRequest): Promise<TOTPsAuthenticateResponse>;
    recoveryCodes(data: RecoveryCodesRequest): Promise<RecoveryCodesResponse>;
    recover(data: RecoverRequest): Promise<RecoverResponse>;
}
