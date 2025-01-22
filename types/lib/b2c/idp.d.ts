import { JwtConfig } from "../shared/sessions";
import { fetchConfig } from "../shared";
export interface IntrospectTokenRequest {
    token: string;
    client_id: string;
    client_secret?: string;
    token_type_hint?: string;
}
export interface IntrospectTokenResponse {
    active: boolean;
    sub?: string;
    scope?: string;
    aud?: string[];
    exp?: number;
    iat?: number;
    iss?: string;
    nbf?: number;
    client_id?: string;
    request_id: string;
    status_code: number;
    token_type?: string;
}
export interface IntrospectTokenClaims {
    subject?: string;
    scope?: string;
    custom_claims?: Record<string, any>;
    audience?: string | string[];
    expires_at?: number;
    issued_at?: number;
    issuer?: string;
    not_before?: number;
    token_type?: string;
}
export declare class IDP {
    private fetchConfig;
    private jwtConfig;
    private jwksClient;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
    introspectTokenNetwork(data: IntrospectTokenRequest): Promise<IntrospectTokenClaims>;
    introspectTokenLocal(data: IntrospectTokenRequest, options?: {
        clock_tolerance_seconds?: number;
        max_token_age_seconds?: number;
        current_date?: Date;
    }): Promise<IntrospectTokenClaims>;
}
