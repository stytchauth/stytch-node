import { JwtConfig } from "../shared/sessions";
import { fetchConfig } from "../shared";
import { AuthorizationCheck } from "./sessions";
import { PolicyCache } from "./rbac_local";
interface OrganizationClaim {
    organization_id: string;
    slug: string;
}
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
    organization: OrganizationClaim;
}
export declare class IDP {
    private fetchConfig;
    private jwtConfig;
    private jwksClient;
    private policyCache;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig, policyCache: PolicyCache);
    introspectTokenNetwork(data: IntrospectTokenRequest, options?: {
        authorization_check?: AuthorizationCheck;
    }): Promise<IntrospectTokenClaims>;
    introspectTokenLocal(tokenJWT: string, options?: {
        clock_tolerance_seconds?: number;
        current_date?: Date;
        authorization_check?: AuthorizationCheck;
    }): Promise<IntrospectTokenClaims>;
}
export {};
