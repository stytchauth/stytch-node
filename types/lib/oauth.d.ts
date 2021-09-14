import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
export interface AuthenticateRequest {
    token?: string;
}
export interface OAuthSession {
    idp?: {
        access_token?: string;
        refresh_token?: string;
    };
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    provider_subject: string;
    provider_type: string;
    session?: OAuthSession;
}
export declare class OAuth {
    base_path: string;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    authenticate(token: string, data?: AuthenticateRequest): Promise<AuthenticateResponse>;
}
