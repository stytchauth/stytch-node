import { Session } from "./shared";
import type { AxiosInstance } from "axios";
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
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: UserID;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export declare class CryptoWallets {
    base_path: string;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    authenticateStart(data: AuthenticateStartRequest): Promise<AuthenticateStartResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
