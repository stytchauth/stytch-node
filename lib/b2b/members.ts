import {
  Member,
  SearchOperator,
  ResultsMetadata,
  ResponseWithMember,
} from "./shared_b2b";
import { BaseResponse, request, fetchConfig } from "../shared";
import { Organization } from "./organizations";

export interface B2BMemberCreateRequest {
  organization_id: string;
  email_address: string;
  name?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  create_member_as_pending?: boolean;
  is_breakglass?: boolean;
  mfa_phone_number?: string;
  mfa_enrolled?: boolean;
}

export type B2BMemberCreateResponse = ResponseWithMember;

export interface B2BMemberGetRequest {
  organization_id: string;
  member_id?: string;
  email_address?: string;
}

export type B2BMemberGetResponse = ResponseWithMember;

export interface B2BMemberUpdateRequest {
  organization_id: string;
  member_id: string;
  name?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  is_breakglass?: boolean;
  mfa_phone_number?: string;
  mfa_enrolled?: boolean;
}

export type B2BMemberUpdateResponse = ResponseWithMember;

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
      filter_name: "member_is_breakglass";
      filter_value: boolean;
    }
  | {
      filter_name: "statuses";
      filter_value: string[];
    }
  | {
      filter_name: "member_mfa_phone_numbers";
      filter_value: string[];
    }
  | {
      filter_name: "member_mfa_phone_number_fuzzy";
      filter_value: string;
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

export interface B2BMemberDeletePhoneNumberRequest {
  organization_id: string;
  member_id: string;
}

export type B2BMemberDeletePhoneNumberResponse = ResponseWithMember;

export class Members {
  private base_path: string;
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig, parent_path: string) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
  }

  create(data: B2BMemberCreateRequest): Promise<B2BMemberCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: `${this.base_path}/${data.organization_id}/members`,
      data,
    });
  }

  get(params: B2BMemberGetRequest): Promise<B2BMemberGetResponse> {
    return request(this.fetchConfig, {
      method: "GET",
      url: `${this.base_path}/${params.organization_id}/member`,
      params: { ...params },
    });
  }

  update(data: B2BMemberUpdateRequest): Promise<B2BMemberUpdateResponse> {
    return request(this.fetchConfig, {
      method: "PUT",
      url: `${this.base_path}/${data.organization_id}/members/${data.member_id}`,
      data,
    });
  }

  delete(data: B2BMemberDeleteRequest): Promise<B2BMemberDeleteResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: `${this.base_path}/${data.organization_id}/members/${data.member_id}`,
    });
  }

  search(data: B2BMemberSearchRequest): Promise<B2BMemberSearchResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: `${this.base_path}/members/search`,
      data,
    });
  }

  deletePhoneNumber(
    data: B2BMemberDeletePhoneNumberRequest
  ): Promise<B2BMemberDeletePhoneNumberResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: `${this.base_path}/${data.organization_id}/members/mfa_phone_numbers/${data.member_id}`,
    });
  }
}
