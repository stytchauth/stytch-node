import { SearchOperator, ResultsMetadata, Member } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { Members } from "./members";
export declare type OrganizationSearchOperand = {
    filter_name: "organization_ids";
    filter_value: string[];
} | {
    filter_name: "organization_slugs";
    filter_value: string[];
} | {
    filter_name: "organization_name_fuzzy";
    filter_value: string;
} | {
    filter_name: "organization_slug_fuzzy";
    filter_value: string;
} | {
    filter_name: "member_emails";
    filter_value: string[];
} | {
    filter_name: "member_email_fuzzy";
    filter_value: string;
} | {
    filter_name: "allowed_domains";
    filter_value: string[];
} | {
    filter_name: "allowed_domain_fuzzy";
    filter_value: string;
};
export interface Organization {
    organization_id: string;
    organization_name: string;
    organization_slug: string;
    organization_logo_url: string;
    trusted_metadata: Record<string, any>;
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
}
export interface DiscoveredOrganization {
    organization: Organization;
    membership: {
        type: "eligible_to_join_by_email_domain";
        details: {
            domain: string;
        };
        member: null;
    } | {
        type: "active_member" | "pending_member" | "invited_member";
        details: null;
        member: Member;
    };
}
export interface CreateOrganizationRequest {
    organization_name: string;
    organization_slug: string;
    organization_logo_url?: string;
    trusted_metadata?: Record<string, any>;
    sso_jit_provisioning?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
    email_allowed_domains?: string[];
    email_jit_provisioning?: "RESTRICTED" | "NOT_ALLOWED";
    email_invites?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
}
export interface CreateOrganizationResponse extends BaseResponse {
    organization: Organization;
}
export interface GetOrganizationRequest {
    organization_id: string;
}
export interface GetOrganizationResponse extends BaseResponse {
    organization: Organization;
}
export interface SearchOrganizationRequest {
    limit?: number;
    query?: {
        operator: SearchOperator;
        operands: OrganizationSearchOperand[];
    };
    cursor?: string | null;
}
export interface SearchOrganizationResponse extends BaseResponse {
    organizations: Organization[];
    results_metadata: ResultsMetadata;
}
export interface DeleteOrganizationRequest {
    organization_id: string;
}
export interface DeleteOrganizationResponse extends BaseResponse {
    organization_id: string;
}
export interface UpdateOrganizationRequest {
    organization_id: string;
    organization_name?: string;
    organization_slug?: string;
    organization_logo_url?: string;
    trusted_metadata?: Record<string, any>;
    sso_default_connection_id?: string;
    sso_jit_provisioning?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
    sso_jit_provisioning_allowed_connections?: string[];
    email_allowed_domains?: string[];
    email_jit_provisioning?: "RESTRICTED" | "NOT_ALLOWED";
    email_invites?: "ALL_ALLOWED" | "RESTRICTED" | "NOT_ALLOWED";
}
export interface UpdateOrganizationResponse extends BaseResponse {
    organization: Organization;
}
export declare class Organizations {
    private base_path;
    members: Members;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: CreateOrganizationRequest): Promise<CreateOrganizationResponse>;
    get({ organization_id, }: GetOrganizationRequest): Promise<GetOrganizationResponse>;
    search(data: SearchOrganizationRequest): Promise<SearchOrganizationResponse>;
    update(data: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse>;
    delete({ organization_id, }: DeleteOrganizationRequest): Promise<DeleteOrganizationResponse>;
}
