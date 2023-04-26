import { SearchOperator, ResultsMetadata, Member } from "./shared_b2b";
import { BaseResponse, request, fetchConfig } from "../shared";
import { Members } from "./members";

export type OrganizationSearchOperand =
  | {
      filter_name: "organization_ids";
      filter_value: string[];
    }
  | {
      filter_name: "organization_slugs";
      filter_value: string[];
    }
  | {
      filter_name: "organization_name_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "organization_slug_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "member_emails";
      filter_value: string[];
    }
  | {
      filter_name: "member_email_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "allowed_domains";
      filter_value: string[];
    }
  | {
      filter_name: "allowed_domain_fuzzy";
      filter_value: string;
    };

export interface Organization {
  organization_id: string;
  organization_name: string;
  organization_slug: string;
  organization_logo_url: string;
  trusted_metadata: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  sso_default_connection_id: string | null;
  sso_jit_provisioning: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
  sso_jit_provisioning_allowed_connections: string[];
  sso_active_connections: Array<{
    connection_id: string;
    display_name: string;
  }>;

  email_allowed_domains: string[];
  email_jit_provisioning: "RESTRICTED" | "NOT_ALLOWED";
  email_invites: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

  auth_methods: "ALL_ALLOWED" | "RESTRICTED";
  allowed_auth_methods: string[];
}

export interface DiscoveredOrganization {
  organization: Organization;
  membership:
    | {
        type: "eligible_to_join_by_email_domain";
        details: { domain: string };
        member: null;
      }
    | {
        type: "active_member" | "pending_member" | "invited_member";
        details: null;
        member: Member;
      };
  member_authenticated: boolean;
}

export interface B2BOrganizationCreateRequest {
  organization_name: string;
  organization_slug: string;
  organization_logo_url?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  sso_jit_provisioning?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
  email_allowed_domains?: string[];
  email_jit_provisioning?: "RESTRICTED" | "NOT_ALLOWED";
  email_invites?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
  auth_methods?: "ALL_ALLOWED" | "RESTRICTED";
  allowed_auth_methods?: string[];
}

export interface B2BOrganizationCreateResponse extends BaseResponse {
  organization: Organization;
}

export interface B2BOrganizationGetRequest {
  organization_id: string;
}

export interface B2BOrganizationGetResponse extends BaseResponse {
  organization: Organization;
}

export interface B2BOrganizationSearchRequest {
  limit?: number;
  query?: {
    operator: SearchOperator;
    operands: OrganizationSearchOperand[];
  };
  cursor?: string | null;
}

export interface B2BOrganizationSearchResponse extends BaseResponse {
  organizations: Organization[];
  results_metadata: ResultsMetadata;
}

export interface B2BOrganizationDeleteRequest {
  organization_id: string;
}

export interface B2BOrganizationDeleteResponse extends BaseResponse {
  organization_id: string;
}

export interface B2BOrganizationUpdateRequest {
  organization_id: string;
  organization_name?: string;
  organization_slug?: string;
  organization_logo_url?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  sso_default_connection_id?: string;
  sso_jit_provisioning?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
  sso_jit_provisioning_allowed_connections?: string[];

  email_allowed_domains?: string[];
  email_jit_provisioning?: "RESTRICTED" | "NOT_ALLOWED";
  email_invites?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";

  auth_methods?: "ALL_ALLOWED" | "RESTRICTED";
  allowed_auth_methods?: string[];
}

export interface B2BOrganizationUpdateResponse extends BaseResponse {
  organization: Organization;
}

export class Organizations {
  private base_path = "organizations";
  members: Members;

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.members = new Members(fetchConfig, this.base_path);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(
    data: B2BOrganizationCreateRequest
  ): Promise<B2BOrganizationCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data,
    });
  }

  get({
    organization_id,
  }: B2BOrganizationGetRequest): Promise<B2BOrganizationGetResponse> {
    return request(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(organization_id),
    });
  }

  search(
    data: B2BOrganizationSearchRequest
  ): Promise<B2BOrganizationSearchResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("search"),
      data,
    });
  }

  update(
    data: B2BOrganizationUpdateRequest
  ): Promise<B2BOrganizationUpdateResponse> {
    return request(this.fetchConfig, {
      method: "PUT",
      url: this.endpoint(data.organization_id),
      data,
    });
  }

  delete({
    organization_id,
  }: B2BOrganizationDeleteRequest): Promise<B2BOrganizationDeleteResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(organization_id),
    });
  }
}
