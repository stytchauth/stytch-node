import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization } from "./organizations";
import { MfaRequired } from "./mfa";
export interface B2BDiscoveryOrganizationsRequest {
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface B2BDiscoveryOrganizationsResponse extends BaseResponse {
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
    organization_id_hint: string | null;
}
export interface B2BDiscoveryOrganizationCreateRequest {
    intermediate_session_token: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    organization_name?: string;
    organization_slug?: string;
    organization_logo_url?: string;
    trusted_metadata?: Record<string, any>;
    sso_jit_provisioning?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
    email_allowed_domains?: string[];
    email_jit_provisioning?: "RESTRICTED" | "NOT_ALLOWED";
    email_invites?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
    auth_methods?: "ALL_ALLOWED" | "RESTRICTED";
    allowed_auth_methods?: string[];
    mfa_policy?: "OPTIONAL" | "REQUIRED_FOR_ALL";
}
export interface B2BDiscoveryOrganizationCreateResponse extends ResponseWithMember {
    member_session: MemberSession | null;
    session_token: string;
    session_jwt: string;
    member_authenticated: boolean;
    intermediate_session_token: string;
    mfa_required: MfaRequired | null;
}
export interface B2BDiscoveryIntermediateSessionExchangeRequest {
    intermediate_session_token: string;
    organization_id: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    locale?: "en" | "es" | "pt-br";
}
export interface B2BDiscoveryIntermediateSessionExchangeResponse extends ResponseWithMember {
    member_session: MemberSession | null;
    session_token: string;
    session_jwt: string;
    member_authenticated: boolean;
    intermediate_session_token: string;
    mfa_required: MfaRequired | null;
}
declare class Organizations {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    list(data: B2BDiscoveryOrganizationsRequest): Promise<B2BDiscoveryOrganizationsResponse>;
    create(data: B2BDiscoveryOrganizationCreateRequest): Promise<B2BDiscoveryOrganizationCreateResponse>;
}
declare class IntermediateSessions {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    exchange(data: B2BDiscoveryIntermediateSessionExchangeRequest): Promise<B2BDiscoveryIntermediateSessionExchangeResponse>;
}
export declare class Discovery {
    private fetchConfig;
    organizations: Organizations;
    intermediateSessions: IntermediateSessions;
    constructor(fetchConfig: fetchConfig);
}
export {};
