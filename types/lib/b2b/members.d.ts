import { Member, SearchOperator, ResultsMetadata, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
export interface CreateMemberRequest {
    organization_id: string;
    email_address: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    create_member_as_pending?: boolean;
    is_breakglass?: boolean;
}
export declare type CreateMemberResponse = ResponseWithMember;
export interface GetMemberRequest {
    organization_id: string;
    member_id?: string;
    email_address?: string;
}
export declare type GetMemberResponse = ResponseWithMember;
export interface UpdateMemberRequest {
    organization_id: string;
    member_id: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    is_breakglass?: boolean;
}
export declare type UpdateMemberResponse = ResponseWithMember;
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
    filter_name: "member_is_breakglass";
    filter_value: boolean;
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
    get(params: GetMemberRequest): Promise<GetMemberResponse>;
    update(data: UpdateMemberRequest): Promise<UpdateMemberResponse>;
    delete(data: DeleteMemberRequest): Promise<DeleteMemberResponse>;
    search(data: SearchOrganizationMemberRequest): Promise<SearchOrganizationMemberResponse>;
}
