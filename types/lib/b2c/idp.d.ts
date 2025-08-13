import { fetchConfig } from "../shared";
import { PolicyCache } from "./rbac_local";
import { JwtConfig } from "../shared/sessions";
import { SessionsAuthorizationCheck } from "./sessions";
export interface IntrospectTokenRequest {
    token: string;
    client_id: string;
    client_secret?: string;
    token_type_hint?: string;
}
export interface IntrospectTokenClaims {
    subject: string;
    scope: string;
    custom_claims: Record<string, any>;
    audience: string | string[];
    expires_at: number;
    issued_at: number;
    issuer: string;
    not_before: number;
    token_type: string;
}
export declare class IDP {
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    private policyCache;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig, policyCache: PolicyCache);
    introspectTokenNetwork(data: IntrospectTokenRequest, options?: {
        authorization_check?: SessionsAuthorizationCheck;
    }): Promise<IntrospectTokenClaims>;
    introspectTokenLocal(tokenJWT: string, options?: {
        clock_tolerance_seconds?: number;
        current_date?: Date;
        authorization_check?: SessionsAuthorizationCheck;
    }): Promise<IntrospectTokenClaims>;
}
