import type { AxiosInstance } from "axios";
import type { BaseResponse, Session } from "./shared";
export interface AuthenticateRequest {
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    provider_subject: string;
    provider_type: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
    providerValues: ProvidersValues;
}
export interface ProvidersValues {
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
    expires_at?: number;
    scopes: string[];
}
export declare class OAuth {
    base_path: string;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    authenticate(token: string, data?: AuthenticateRequest): Promise<AuthenticateResponse>;
}
