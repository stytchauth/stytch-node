import { Session, fetchConfig, User } from "./shared";
import type { BaseResponse } from "./shared";
import { UserID } from "./users";
export interface AuthenticateStartRequest {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    user_id?: UserID;
}
export interface AuthenticateStartResponse extends BaseResponse {
    user_id: UserID;
    challenge: string;
    user_created: boolean;
}
export interface AuthenticateRequest {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    signature: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: UserID;
    user: User;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export declare class CryptoWallets {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticateStart(data: AuthenticateStartRequest): Promise<AuthenticateStartResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
