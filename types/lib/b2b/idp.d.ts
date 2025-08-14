import { fetchConfig } from "../shared";
import { OAuth } from "./idp_oauth";
import { PolicyCache } from "./rbac_local";
import { AuthorizationCheck } from "./sessions";
import { JwtConfig } from "../shared/sessions";
export interface B2BIDPScopeResult {
    scope: string;
    description: string;
    /**
     * Indicates whether the scope can be granted. Users can only grant scopes if they have the required
     * permissions.
     */
    is_grantable: boolean;
}
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
    private jwksClient;
    private jwtOptions;
    private policyCache;
    oauth: OAuth;
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
