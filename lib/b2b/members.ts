import { Member, SearchOperator, ResultsMetadata } from "./shared_b2b";
import { BaseResponse, request, fetchConfig } from "../shared";
import { Organization } from "./organizations";

export interface CreateMemberRequest {
  organization_id: string;
  email_address: string;
  name?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface UpdateMemberResponse extends BaseResponse {
  member_id: string;
  member: Member;
  organization: Organization;
}

export type MemberSearchOperand =
  | {
      filter_name: "member_ids";
      filter_value: string[];
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
      filter_name: "status";
      filter_value: "active" | "pending";
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

export class Members {
  private base_path: string;
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, parent_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
  }

  create(data: CreateMemberRequest): Promise<CreateMemberResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: `${this.base_path}/${data.organization_id}/members`,
      data,
    });
  }

  update(data: UpdateMemberRequest): Promise<UpdateMemberResponse> {
    return request(this.fetchConfig, {
      method: "PUT",
      url: `${this.base_path}/${data.organization_id}/members/${data.member_id}`,
      data,
    });
  }

  delete(data: DeleteMemberRequest): Promise<DeleteMemberResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: `${this.base_path}/${data.organization_id}/members/${data.member_id}`,
    });
  }

  search(
    data: SearchOrganizationMemberRequest
  ): Promise<SearchOrganizationMemberResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: `${this.base_path}/members/search`,
      data,
    });
  }
}
