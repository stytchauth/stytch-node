import { Member, SearchOperator, ResultsMetadata, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { Organization } from "./organizations";
export interface B2BMemberCreateRequest {
    organization_id: string;
    email_address: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    create_member_as_pending?: boolean;
    is_breakglass?: boolean;
}
export declare type B2BMemberCreateResponse = ResponseWithMember;
export interface B2BMemberGetRequest {
    organization_id: string;
    member_id?: string;
    email_address?: string;
}
export declare type B2BMemberGetResponse = ResponseWithMember;
export interface B2BMemberUpdateRequest {
    organization_id: string;
    member_id: string;
    name?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    is_breakglass?: boolean;
}
export declare type B2BMemberUpdateResponse = ResponseWithMember;
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
export interface B2BMemberSearchRequest {
    organization_ids: string[];
    limit?: number;
    query?: {
        operator: SearchOperator;
        operands: MemberSearchOperand[];
    };
    cursor?: string | null;
}
export interface B2BMemberSearchResponse extends BaseResponse {
    members: Member[];
    results_metadata: ResultsMetadata;
    organizations: Record<string, Organization>;
}
export interface B2BMemberDeleteRequest {
    member_id: string;
    organization_id: string;
}
export interface B2BMemberDeleteResponse extends BaseResponse {
    member_id: string;
}
export declare class Members {
    private base_path;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, parent_path: string);
    create(data: B2BMemberCreateRequest): Promise<B2BMemberCreateResponse>;
    get(params: B2BMemberGetRequest): Promise<B2BMemberGetResponse>;
    update(data: B2BMemberUpdateRequest): Promise<B2BMemberUpdateResponse>;
    delete(data: B2BMemberDeleteRequest): Promise<B2BMemberDeleteResponse>;
    search(data: B2BMemberSearchRequest): Promise<B2BMemberSearchResponse>;
}
