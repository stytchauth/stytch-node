import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, request, fetchConfig } from "../shared";
import { DiscoveredOrganization } from "./organizations";

export interface B2BDiscoveryOrganizationsRequest {
  intermediate_session_token?: string;
  session_token?: string;
  session_jwt?: string;
}

export interface B2BDiscoveryOrganizationsResponse extends BaseResponse {
  email_address: string;
  discovered_organizations: DiscoveredOrganization[];
}

export interface B2BDiscoveryDiscoveryOrganizationCreateRequest {
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

export interface B2BDiscoveryDiscoveryOrganizationCreateResponse
  extends ResponseWithMember {
  member_session: MemberSession;
  session_token: string;
  session_jwt: string;
}

export interface B2BDiscoveryIntermediateSessionExchangeRequest {
  intermediate_session_token: string;
  organization_id: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface B2BDiscoveryIntermediateSessionExchangeResponse
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

  list(
    data: B2BDiscoveryOrganizationsRequest
  ): Promise<B2BDiscoveryOrganizationsResponse> {
    return request<B2BDiscoveryOrganizationsResponse>(this.fetchConfig, {
      method: "POST",
      url: "discovery/organizations",
      data,
    });
  }

  create(
    data: B2BDiscoveryDiscoveryOrganizationCreateRequest
  ): Promise<B2BDiscoveryDiscoveryOrganizationCreateResponse> {
    return request<B2BDiscoveryDiscoveryOrganizationCreateResponse>(
      this.fetchConfig,
      {
        method: "POST",
        url: "discovery/organizations/create",
        data,
      }
    );
  }
}

class IntermediateSessions {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  exchange(
    data: B2BDiscoveryIntermediateSessionExchangeRequest
  ): Promise<B2BDiscoveryIntermediateSessionExchangeResponse> {
    return request<B2BDiscoveryIntermediateSessionExchangeResponse>(
      this.fetchConfig,
      {
        method: "POST",
        url: "discovery/intermediate_sessions/exchange",
        data,
      }
    );
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
