import { BaseResponse, fetchConfig } from "../shared";
import { Member, MemberSession } from "./shared_b2b";
import { JwtConfig } from "../shared/sessions";
export interface GetRequest {
    organization_id: string;
    member_id: string;
}
export interface GetResponse extends BaseResponse {
    member_sessions: MemberSession[];
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
    session_custom_claims?: Record<string, any>;
}
export interface AuthenticateResponse extends BaseResponse {
    member_session: MemberSession;
    member: Member;
    session_token: string;
    session_jwt: string;
}
export declare type RevokeRequest = {
    member_session_id: string;
} | {
    session_token: string;
} | {
    session_jwt: string;
} | {
    member_id: string;
};
export declare type RevokeResponse = BaseResponse;
export declare class Sessions {
    private base_path;
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
    private endpoint;
    get({ organization_id, member_id }: GetRequest): Promise<GetResponse>;
    jwks(project_id: string): Promise<JwksResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
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
    }): Promise<MemberSession>;
    revoke(data: RevokeRequest): Promise<RevokeResponse>;
}
