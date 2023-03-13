import { Member, SearchOperator, ResultsMetadata } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { Organization } from "./organizations";
export interface CreateMemberRequest {
    organization_id: string;
    email_address: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    create_member_as_pending?: boolean;
}
export interface CreateMemberResponse extends BaseResponse {
    member_id: string;
    member: Member;
    organization: Organization;
}
export interface UpdateMemberRequest {
    organization_id: string;
    member_id: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
}
export interface UpdateMemberResponse extends BaseResponse {
    member_id: string;
    member: Member;
    organization: Organization;
}
export declare type MemberSearchOperand = {
    filter_name: "member_ids";
    filter_value: string[];
} | {
    filter_name: "member_emails";
    filter_value: string[];
} | {
    filter_name: "member_email_fuzzy";
    filter_value: string;
} | {
    filter_name: "statuses";
    filter_value: string[];
};
export interface SearchOrganizationMemberRequest {
    organization_ids: string[];
    limit?: number;
    query?: {
        operator: SearchOperator;
        operands: MemberSearchOperand[];
    };
    cursor?: string | null;
}
export interface SearchOrganizationMemberResponse extends BaseResponse {
    members: Member[];
    results_metadata: ResultsMetadata;
}
export interface DeleteMemberRequest {
    member_id: string;
    organization_id: string;
}
export interface DeleteMemberResponse extends BaseResponse {
    member_id: string;
}
export declare class Members {
    private base_path;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, parent_path: string);
    create(data: CreateMemberRequest): Promise<CreateMemberResponse>;
    update(data: UpdateMemberRequest): Promise<UpdateMemberResponse>;
    delete(data: DeleteMemberRequest): Promise<DeleteMemberResponse>;
    search(data: SearchOrganizationMemberRequest): Promise<SearchOrganizationMemberResponse>;
}
