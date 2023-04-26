import { BaseResponse, fetchConfig } from "../shared";
import { Member, MemberSession } from "./shared_b2b";
import { SAML } from "./saml";
import { Organization } from "./organizations";
import { OIDC } from "./oidc";
export interface X509Certificate {
    certificate_id: string;
    certificate: string;
    issuer: string;
    created_at: string;
    expires_at: string;
}
export interface OIDCConnection {
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    redirect_url: string;
    client_id: string;
    client_secret: string;
    issuer: string;
    authorization_url: string;
    token_url: string;
    userinfo_url: string;
    jwks_url: string;
}
export interface SAMLConnection {
    organization_id: string;
    connection_id: string;
    status: string;
    attribute_mapping: Record<string, string>;
    idp_entity_id: string;
    display_name: string;
    idp_sso_url: string;
    acs_url: string;
    audience_uri: string;
    signing_certificates: X509Certificate[];
    verification_certificates: X509Certificate[];
}
export interface B2BSSOGetConnectionsRequest {
    organization_id: string;
}
export interface B2BSSOGetConnectionsResponse extends BaseResponse {
    saml_connections: SAMLConnection[];
    oidc_connections: OIDCConnection[];
}
export interface B2BSSODeleteConnectionRequest {
    organization_id: string;
    connection_id: string;
}
export interface B2BSSODeleteConnectionResponse extends BaseResponse {
    connection_id: string;
}
export interface B2BSSOAuthenticateRequest {
    sso_token: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    pkce_code_verifier?: string;
}
export interface B2BSSOAuthenticateResponse extends BaseResponse {
    member_id: string;
    member: Member;
    organization_id: string;
    method_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: MemberSession;
    reset_session: boolean;
    organization: Organization;
}
export declare class SSO {
    private readonly fetchConfig;
    saml: SAML;
    oidc: OIDC;
    constructor(fetchConfig: fetchConfig);
    get({ organization_id, }: B2BSSOGetConnectionsRequest): Promise<B2BSSOGetConnectionsResponse>;
    delete({ organization_id, connection_id, }: B2BSSODeleteConnectionRequest): Promise<B2BSSODeleteConnectionResponse>;
    authenticate(data: B2BSSOAuthenticateRequest): Promise<B2BSSOAuthenticateResponse>;
}
