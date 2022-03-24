import type { AxiosInstance } from "axios";
import type { BaseResponse, Session } from "./shared";
export interface AuthenticateRequest {
    session_management_type?: "stytch" | "idp" | "none";
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
}
export interface OAuthSession {
    idp?: {
        access_token?: string;
        refresh_token?: string;
    };
    stytch_session?: {
        session: Session;
        session_token: string;
        session_jwt: string;
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
