import { Session, User } from "./shared_b2c";
import { fetchConfig, BaseResponse } from "../shared";
import { UserID } from "./users";
export interface B2CCryptoWalletsAuthenticateStartRequest {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    user_id?: UserID;
    session_token?: string;
    session_jwt?: string;
}
export interface B2CCryptoWalletsAuthenticateStartResponse extends BaseResponse {
    user_id: UserID;
    challenge: string;
    user_created: boolean;
}
export interface B2CCryptoWalletsAuthenticateRequest {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    signature: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2CCryptoWalletsAuthenticateResponse extends BaseResponse {
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
    authenticateStart(data: B2CCryptoWalletsAuthenticateStartRequest): Promise<B2CCryptoWalletsAuthenticateStartResponse>;
    authenticate(data: B2CCryptoWalletsAuthenticateRequest): Promise<B2CCryptoWalletsAuthenticateResponse>;
}
