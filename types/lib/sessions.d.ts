import { Session } from "./shared";
import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
import type { Experiments } from "./experiments";
export interface GetRequest {
    user_id: string;
}
export interface GetResponse extends BaseResponse {
    sessions: Session[];
}
export interface AuthenticateRequest {
    session_token: string;
    session_duration_minutes?: number;
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
    private experiments;
    constructor(client: AxiosInstance, experiments: Experiments);
    private endpoint;
    private enabled;
    get(params: GetRequest): Promise<GetResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
    revoke(data: RevokeRequest): Promise<RevokeResponse>;
}
