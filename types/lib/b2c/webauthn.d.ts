import { Session, User } from "./shared_b2c";
import { BaseResponse, fetchConfig } from "../shared";
import { UserID } from "./users";
export interface B2CWebAuthnRegisterStartRequest {
    user_id: UserID;
    domain: string;
    user_agent?: string;
    authenticator_type?: string;
}
export interface B2CWebAuthnRegisterStartResponse extends BaseResponse {
    user_id: UserID;
    public_key_credential_creation_options: string;
}
export interface B2CWebAuthnRegisterRequest {
    user_id: UserID;
    public_key_credential: string;
}
export interface B2CWebAuthnRegisterResponse extends BaseResponse {
    user_id: UserID;
    webauthn_registration_id: string;
}
export interface B2CWebAuthnAuthenticateStartRequest {
    user_id: UserID;
    domain: string;
}
export interface B2CWebAuthnAuthenticateStartResponse extends BaseResponse {
    user_id: UserID;
    public_key_credential_request_options: string;
}
export interface B2CWebAuthnAuthenticateRequest {
    public_key_credential: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2CWebAuthnAuthenticateResponse extends BaseResponse {
    user_id: UserID;
    user: User;
    webauthn_registration_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export declare class WebAuthn {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    registerStart(data: B2CWebAuthnRegisterStartRequest): Promise<B2CWebAuthnRegisterStartResponse>;
    register(data: B2CWebAuthnRegisterRequest): Promise<B2CWebAuthnRegisterResponse>;
    authenticateStart(data: B2CWebAuthnAuthenticateStartRequest): Promise<B2CWebAuthnAuthenticateStartResponse>;
    authenticate(data: B2CWebAuthnAuthenticateRequest): Promise<B2CWebAuthnAuthenticateResponse>;
}
