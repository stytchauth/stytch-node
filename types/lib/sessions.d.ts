import { Session } from "./shared";
import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
export interface GetRequest {
    user_id: string;
}
export interface GetResponse extends BaseResponse {
    sessions: Session[];
}
export interface AuthenticateRequest {
    session_token: string;
    session_duration?: string;
}
export interface AuthenticateResponse extends BaseResponse {
    session: Session;
    session_token: string;
}
export interface RevokeRequest {
    session_id?: string;
    session_token?: string;
}
export declare type RevokeResponse = BaseResponse;
export declare class Sessions {
    base_path: string;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    get(params: GetRequest): Promise<GetResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
    revoke(data: RevokeRequest): Promise<RevokeResponse>;
}
