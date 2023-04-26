import { Session, User } from "./shared_b2c";
import { fetchConfig, BaseResponse } from "../shared";
import { UserID } from "./users";
export interface CryptoWalletsAuthenticateStartRequest {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    user_id?: UserID;
    session_token?: string;
    session_jwt?: string;
}
export interface CryptoWalletsAuthenticateStartResponse extends BaseResponse {
    user_id: UserID;
    challenge: string;
    user_created: boolean;
}
export interface CryptoWalletsAuthenticateRequest {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    signature: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface CryptoWalletsAuthenticateResponse extends BaseResponse {
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
    authenticateStart(data: CryptoWalletsAuthenticateStartRequest): Promise<CryptoWalletsAuthenticateStartResponse>;
    authenticate(data: CryptoWalletsAuthenticateRequest): Promise<CryptoWalletsAuthenticateResponse>;
}
