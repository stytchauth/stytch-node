import { Session, User } from "./shared_b2c";
import { BaseResponse, fetchConfig } from "../shared";
export interface TOTP {
    totp_id: string;
    verified: boolean;
    recovery_codes: string[];
}
export interface B2CTOTPsCreateRequest {
    user_id: string;
    expiration_minutes?: number;
}
export interface B2CTOTPsCreateResponse extends BaseResponse {
    totp_id: string;
    secret: string;
    qr_code: string;
    recovery_codes: string[];
    user: User;
    user_id: string;
}
export interface B2CTOTPsAuthenticateRequest {
    user_id: string;
    totp_code: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2CTOTPsAuthenticateResponse extends BaseResponse {
    user_id: string;
    user: User;
    totp_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface B2CTOTPsRecoveryCodesRequest {
    user_id: string;
}
export interface B2CTOTPsRecoveryCodesResponse extends BaseResponse {
    user_id: string;
    totps: TOTP[];
}
export interface B2CTOTPsRecoverRequest {
    user_id: string;
    recovery_code: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2CTOTPsRecoverResponse extends BaseResponse {
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
    create(data: B2CTOTPsCreateRequest): Promise<B2CTOTPsCreateResponse>;
    authenticate(data: B2CTOTPsAuthenticateRequest): Promise<B2CTOTPsAuthenticateResponse>;
    recoveryCodes(data: B2CTOTPsRecoveryCodesRequest): Promise<B2CTOTPsRecoveryCodesResponse>;
    recover(data: B2CTOTPsRecoverRequest): Promise<B2CTOTPsRecoverResponse>;
}
