import { MemberSession, Member } from "./shared_b2b";
import { request, BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization, Organization } from "./organizations";

export interface B2BOAuthAuthenticateRequest {
  oauth_token: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface DiscoveryB2BOAuthAuthenticateRequest {
  discovery_oauth_token: string;
  pkce_code_verifier?: string;
}

export interface DiscoveryB2BOAuthAuthenticateResponse extends BaseResponse {
  intermediate_session_token: string;
  email_address: string;
  discovered_organizations: DiscoveredOrganization[];
}

export interface B2BOAuthAuthenticateResponse extends BaseResponse {
  member_id: string;
  member: Member;
  organization_id: string;
  organization: Organization;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
  provider_values: ProvidersValues;
}

export interface ProvidersValues {
  access_token?: string;
  refresh_token?: string;
  id_token?: string;
  expires_at?: number;
  scopes: string[];
}

class Discovery {
  private base_path = "oauth/discovery";
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(
    data: DiscoveryB2BOAuthAuthenticateRequest
  ): Promise<DiscoveryB2BOAuthAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}

export class OAuth {
  private base_path = "oauth";
  discovery: Discovery;

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.discovery = new Discovery(fetchConfig);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(
    data: B2BOAuthAuthenticateRequest
  ): Promise<B2BOAuthAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
