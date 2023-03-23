import { Member, MemberSession } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization, Organization, CreateOrganizationRequest } from "./organizations";
export interface OrganizationsRequest {
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
}
export interface OrganizationsResponse extends BaseResponse {
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
}
export interface DiscoveryOrganizationCreateRequest extends CreateOrganizationRequest {
    intermediate_session_token: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface DiscoveryOrganizationCreateResponse extends BaseResponse {
    member_id: string;
    member_session: MemberSession;
    session_token: string;
    session_jwt: string;
    member: Member;
    organization: Organization;
}
export interface IntermediateSessionExchangeRequest {
    intermediate_session_token: string;
    organization_id: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface IntermediateSessionExchangeResponse extends BaseResponse {
    member_id: string;
    member_session: MemberSession;
    session_token: string;
    session_jwt: string;
    member: Member;
    organization: Organization;
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
