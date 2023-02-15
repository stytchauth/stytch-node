import { BaseResponse, fetchConfig } from "../shared";
import { Member, MemberSession } from "./shared_b2b";
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
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    get({ organization_id, member_id }: GetRequest): Promise<GetResponse>;
    jwks(project_id: string): Promise<JwksResponse>;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
    revoke(data: RevokeRequest): Promise<RevokeResponse>;
}
