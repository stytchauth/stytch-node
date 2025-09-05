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
export interface B2BIntrospectTokenRequest {
    token: string;
    client_id: string;
    client_secret?: string;
    token_type_hint?: string;
}
interface IntrospectTokenInactiveResponse {
    active: false;
    request_id: string;
    status_code: number;
}
interface IntrospectTokenActiveResponse {
    active: true;
    request_id: string;
    status_code: number;
    sub?: string;
    scope?: string;
    aud?: string[];
    exp?: number;
    iat?: number;
    iss?: string;
    nbf?: number;
    client_id?: string;
    token_type?: string;
    "https://stytch.com/organization"?: Record<string, string>;
}
export type B2BIntrospectTokenResponse = IntrospectTokenActiveResponse | IntrospectTokenInactiveResponse;
export interface B2BIntrospectTokenClaims {
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
    introspectTokenNetwork(data: B2BIntrospectTokenRequest, options?: {
        authorization_check?: AuthorizationCheck;
    }): Promise<B2BIntrospectTokenClaims>;
    introspectTokenLocal(tokenJWT: string, options?: {
        clock_tolerance_seconds?: number;
        current_date?: Date;
        authorization_check?: AuthorizationCheck;
    }): Promise<B2BIntrospectTokenClaims>;
}
export {};
