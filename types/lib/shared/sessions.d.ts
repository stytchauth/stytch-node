import * as jose from "jose";
export interface JwtConfig {
    projectID: string;
    jwks: jose.JWTVerifyGetKey;
}
declare type IntermediateSession = {
    sub: string;
    session_id: string;
    attributes: unknown;
    authentication_factors: unknown;
    started_at: Date;
    last_accessed_at: Date;
    expires_at: Date;
    custom_claims: Record<string, any>;
};
export declare function authenticateJwtLocal(jwksClient: jose.JWTVerifyGetKey, jwtOptions: jose.JWTVerifyOptions, jwt: string, options?: {
    clock_tolerance_seconds?: number;
    max_token_age_seconds?: number;
    current_date?: Date;
}): Promise<IntermediateSession>;
export {};