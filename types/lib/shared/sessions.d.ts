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
    started_at: string;
    last_accessed_at: string;
    expires_at: string;
    custom_claims: Record<string, any>;
};
export declare function authenticateJwtLocal(jwksClient: jose.JWTVerifyGetKey, jwtOptions: jose.JWTVerifyOptions, jwt: string, options?: {
    clock_tolerance_seconds?: number;
    max_token_age_seconds?: number;
    current_date?: Date;
}): Promise<{
    payload: jose.JWTPayload;
    customClaims: Record<string, unknown>;
}>;
export declare function authenticateM2MJwtLocal(jwksClient: jose.JWTVerifyGetKey, jwtOptions: jose.JWTVerifyOptions, jwt: string, options?: {
    clock_tolerance_seconds?: number;
    max_token_age_seconds?: number;
    current_date?: Date;
}): Promise<{
    sub: string;
    scope: string;
    custom_claims: Record<string, unknown>;
}>;
export declare function authenticateSessionJwtLocal(jwksClient: jose.JWTVerifyGetKey, jwtOptions: jose.JWTVerifyOptions, jwt: string, options?: {
    clock_tolerance_seconds?: number;
    max_token_age_seconds?: number;
    current_date?: Date;
}): Promise<IntermediateSession>;
export {};
