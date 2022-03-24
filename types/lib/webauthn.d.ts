import { Session } from "./shared";
import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
import { UserID } from "./users";
export interface RegisterStartRequest {
    user_id: UserID;
    domain: string;
    user_agent?: string;
    authenticator_type?: string;
}
export interface RegisterStartResponse extends BaseResponse {
    user_id: UserID;
    public_key_credential_creation_options: string;
}
export interface RegisterRequest {
    user_id: UserID;
    public_key_credential: string;
}
export interface RegisterResponse extends BaseResponse {
    user_id: UserID;
    webauthn_registration_id: string;
}
export interface AuthenticateStartRequest {
    user_id: UserID;
    domain: string;
}
export interface AuthenticateStartResponse extends BaseResponse {
    user_id: UserID;
    public_key_credential_request_options: string;
}
export interface AuthenticateRequest {
    public_key_credential: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: UserID;
    webauthn_registration_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export declare class WebAuthn {
    base_path: string;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    registerStart(data: RegisterStartRequest): Promise<RegisterStartResponse>;
    register(data: RegisterRequest): Promise<RegisterResponse>;
    authenticateStart(data: AuthenticateStartRequest): Promise<AuthenticateStartResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
