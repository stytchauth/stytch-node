import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, request, fetchConfig } from "../shared";
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
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  organization_name?: string;
  organization_slug?: string;
  organization_logo_url?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  sso_jit_provisioning?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
  email_allowed_domains?: string[];
  email_jit_provisioning?: "RESTRICTED" | "NOT_ALLOWED";
  email_invites?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
  auth_methods?: "ALL_ALLOWED" | "RESTRICTED";
  allowed_auth_methods?: string[];
}

export interface DiscoveryOrganizationCreateResponse
  extends ResponseWithMember {
  member_session: MemberSession;
  session_token: string;
  session_jwt: string;
}

export interface IntermediateSessionExchangeRequest {
  intermediate_session_token: string;
  organization_id: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IntermediateSessionExchangeResponse
  extends ResponseWithMember {
  member_session: MemberSession;
  session_token: string;
  session_jwt: string;
}

class Organizations {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  list(data: OrganizationsRequest): Promise<OrganizationsResponse> {
    return request<OrganizationsResponse>(this.fetchConfig, {
      method: "POST",
      url: "discovery/organizations",
      data,
    });
  }

  create(
    data: DiscoveryOrganizationCreateRequest
  ): Promise<DiscoveryOrganizationCreateResponse> {
    return request<DiscoveryOrganizationCreateResponse>(this.fetchConfig, {
      method: "POST",
      url: "discovery/organizations/create",
      data,
    });
  }
}

class IntermediateSessions {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  exchange(
    data: IntermediateSessionExchangeRequest
  ): Promise<IntermediateSessionExchangeResponse> {
    return request<IntermediateSessionExchangeResponse>(this.fetchConfig, {
      method: "POST",
      url: "discovery/intermediate_sessions/exchange",
      data,
    });
  }
}

export class Discovery {
  private fetchConfig: fetchConfig;
  organizations: Organizations;
  intermediateSessions: IntermediateSessions;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.organizations = new Organizations(this.fetchConfig);
    this.intermediateSessions = new IntermediateSessions(this.fetchConfig);
  }
}
