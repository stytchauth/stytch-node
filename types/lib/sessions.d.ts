/// <reference types="node" />
import { URL } from "url";
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
    session_duration_minutes?: number;
    session_token?: string;
    session_jwt?: string;
}
export interface AuthenticateResponse extends BaseResponse {
    session: Session;
    session_token: string;
    session_jwt: string;
}
export interface RevokeRequest {
    session_id?: string;
    session_token?: string;
    session_jwt?: string;
}
export declare type RevokeResponse = BaseResponse;
interface JwtConfig {
    projectID: string;
    jwksURL: URL;
}
export declare class Sessions {
    base_path: string;
    private client;
    private jwks;
    private jwtOptions;
    constructor(client: AxiosInstance, jwtConfig: JwtConfig);
    private endpoint;
    get(params: GetRequest): Promise<GetResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
    /** Parse a JWT and verify the signature, preferring local verification over remote.
     *
     * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
     * (based on the "iat" claim) more than that many seconds ago.
     *
     * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
     * authenticate method instead.
     */
    authenticateJwt(jwt: string, options?: {
        max_token_age_seconds?: number;
    }): Promise<AuthenticateResponse>;
    /** Parse a JWT and verify the signature locally (without making an /authenticate call).
     *
     * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
     * claim) more than maxTokenAge seconds ago.
     */
    authenticateJwtLocal(jwt: string, options?: {
        max_token_age_seconds?: number;
    }): Promise<Session>;
    revoke(data: RevokeRequest): Promise<RevokeResponse>;
}
export {};
