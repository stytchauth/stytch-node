import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization } from "./organizations";
export interface OrganizationsRequest {
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface OrganizationsResponse extends BaseResponse {
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
}
export interface DiscoveryOrganizationCreateRequest {
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
}
export interface DiscoveryOrganizationCreateResponse extends ResponseWithMember {
    member_session: MemberSession;
    session_token: string;
    session_jwt: string;
}
export interface IntermediateSessionExchangeRequest {
    intermediate_session_token: string;
    organization_id: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface IntermediateSessionExchangeResponse extends ResponseWithMember {
    member_session: MemberSession;
    session_token: string;
    session_jwt: string;
}
declare class Organizations {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    list(data: OrganizationsRequest): Promise<OrganizationsResponse>;
    create(data: DiscoveryOrganizationCreateRequest): Promise<DiscoveryOrganizationCreateResponse>;
}
declare class IntermediateSessions {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    exchange(data: IntermediateSessionExchangeRequest): Promise<IntermediateSessionExchangeResponse>;
}
export declare class Discovery {
    private fetchConfig;
    organizations: Organizations;
    intermediateSessions: IntermediateSessions;
    constructor(fetchConfig: fetchConfig);
}
export {};
