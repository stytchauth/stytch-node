import * as jose from "jose";
import { Session } from "./shared";
import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
export interface GetRequest {
    user_id: string;
}
export interface GetResponse extends BaseResponse {
    sessions: Session[];
}
export interface JwksResponse extends BaseResponse {
    keys: JWK[];
}
export interface JWK {
    alg: string;
    key_ops: string[];
    kid: string;
    kty: string;
    use: string;
    x5c: string[];
    "x5t#S256": string;
    n: string;
    e: string;
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
    jwks: jose.JWTVerifyGetKey;
}
export declare class Sessions {
    base_path: string;
    private client;
    private jwksClient;
    private jwtOptions;
    constructor(client: AxiosInstance, jwtConfig: JwtConfig);
    private endpoint;
    get(params: GetRequest): Promise<GetResponse>;
    jwks(project_id: string): Promise<JwksResponse>;
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
    }): Promise<{
        session: Session;
        session_jwt: string;
    }>;
    /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
     *
     * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
     * claim) more than maxTokenAge seconds ago.
     *
     * If max_token_age_seconds is explicitly set to zero, all tokens will be considered too old,
     * even if they are otherwise valid.
     *
     * The value for current_date is used to compare timestamp claims ("exp", "nbf", "iat"). It
     * defaults to the current date (new Date()).
     *
     * The value for clock_tolerance_seconds is the maximum allowable difference when comparing
     * timestamps. It defaults to zero.
     */
    authenticateJwtLocal(jwt: string, options?: {
        clock_tolerance_seconds?: number;
        max_token_age_seconds?: number;
        current_date?: Date;
    }): Promise<Session>;
    revoke(data: RevokeRequest): Promise<RevokeResponse>;
}
export {};
