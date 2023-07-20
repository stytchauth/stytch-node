// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {
  B2BOrganizationsResultsMetadata,
  Member,
  Organization,
  SearchQuery,
} from "./organizations";
import { fetchConfig } from "../shared";
import { request } from "../shared";

// Request type for `Members.create`.
export interface B2BMembersCreateRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // The email address of the Member.
  email_address: string;
  // The name of the Member.
  name?: string;
  // An arbitrary JSON object for storing application-specific data or identity-provider-specific data.
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
   *   frontend SDK, and should not be used to store critical information. See the
   * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
   *   for complete field behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Flag for whether or not to save a Member as `pending` or `active` in Stytch. It defaults to false. If
   * true, new Members will be created with status `pending` in Stytch's backend. Their status will remain
   * `pending` and they will continue to receive signup email templates for every Email Magic Link until that
   * Member authenticates and becomes `active`. If false, new Members will be created with status `active`.
   */
  create_member_as_pending?: boolean;
  /**
   * Identifies the Member as a break glass user - someone who has permissions to authenticate into an
   * Organization by bypassing the Organization's settings. A break glass account is typically used for
   * emergency purposes to gain access outside of normal authentication procedures. Refer to the
   * [Organization object](organization-object) and its `auth_methods` and `allowed_auth_methods` fields for
   * more details.
   */
  is_breakglass?: boolean;
  phone_number?: string;
  mfa_enrolled?: boolean;
}

// Response type for `Members.create`.
export interface B2BMembersCreateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object).
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Members.deletePassword`.
export interface B2BMembersDeletePasswordRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // Globally unique UUID that identifies a Member's password.
  member_password_id: string;
}

// Response type for `Members.deletePassword`.
export interface B2BMembersDeletePasswordResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object).
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

export interface B2BMembersDeletePhoneNumberRequest {
  organization_id: string;
  member_phone_id: string;
}

export interface B2BMembersDeletePhoneNumberResponse {
  request_id: string;
  member_id: string;
  member: Member;
  organization: Organization;
  status_code: number;
}

// Request type for `Members.delete`.
export interface B2BMembersDeleteRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  /**
   * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
   * operations on a Member, so be sure to preserve this value.
   */
  member_id: string;
}

// Response type for `Members.delete`.
export interface B2BMembersDeleteResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Members.get`.
export interface B2BMembersGetRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  /**
   * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
   * operations on a Member, so be sure to preserve this value.
   */
  member_id?: string;
  // The email address of the Member.
  email_address?: string;
}

// Response type for `Members.get`.
export interface B2BMembersGetResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object).
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Members.search`.
export interface B2BMembersSearchRequest {
  // An array of organization_ids. At least one value is required.
  organization_ids: string[];
  /**
   * The `cursor` field allows you to paginate through your results. Each result array is limited to 1000
   * results. If your query returns more than 1000 results, you will need to paginate the responses using the
   * `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata`
   * object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the
   * next page of results. Continue to make search calls until the `next_cursor` in the response is null.
   */
  cursor?: string;
  /**
   * The number of search results to return per page. The default limit is 100. A maximum of 1000 results can
   * be returned by a single search request. If the total size of your result set is greater than one page
   * size, you must paginate the response. See the `cursor` field.
   */
  limit?: number;
  /**
   * The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter
   * your results. Only an operator is required. If you include no operands, no filtering will be applied. If
   * you include no query object, it will return all Organizations with no filtering applied.
   */
  query?: SearchQuery;
}

// Response type for `Members.search`.
export interface B2BMembersSearchResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // An array of [Member objects](member-object).
  members: Member[];
  /**
   * The search `results_metadata` object contains metadata relevant to your specific query like `total` and
   * `next_cursor`.
   */
  results_metadata: B2BOrganizationsResultsMetadata;
  /**
   * A map from `organization_id` to
   * [Organization object](https://stytch.com/docs/b2b/api/organization-object). The map only contains the
   * Organizations that the Members belongs to.
   */
  organizations: Record<string, Organization>;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Members.update`.
export interface B2BMembersUpdateRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  /**
   * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
   * operations on a Member, so be sure to preserve this value.
   */
  member_id: string;
  // The name of the Member.
  name?: string;
  // An arbitrary JSON object for storing application-specific data or identity-provider-specific data.
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * An arbitrary JSON object of application-specific data. These fields can be edited directly by the
   *   frontend SDK, and should not be used to store critical information. See the
   * [Metadata resource](https://stytch.com/docs/b2b/api/metadata)
   *   for complete field behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Identifies the Member as a break glass user - someone who has permissions to authenticate into an
   * Organization by bypassing the Organization's settings. A break glass account is typically used for
   * emergency purposes to gain access outside of normal authentication procedures. Refer to the
   * [Organization object](organization-object) and its `auth_methods` and `allowed_auth_methods` fields for
   * more details.
   */
  is_breakglass?: boolean;
  phone_number?: string;
  mfa_enrolled?: boolean;
}

// Response type for `Members.update`.
export interface B2BMembersUpdateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object).
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

export class Members {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  // Updates a Member specified by `organization_id` and `member_id`.
  update(data: B2BMembersUpdateRequest): Promise<B2BMembersUpdateResponse> {
    return request<B2BMembersUpdateResponse>(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}`,
      data: {
        name: data.name,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
        is_breakglass: data.is_breakglass,
        phone_number: data.phone_number,
        mfa_enrolled: data.mfa_enrolled,
      },
    });
  }

  // Deletes a Member specified by `organization_id` and `member_id`.
  delete(data: B2BMembersDeleteRequest): Promise<B2BMembersDeleteResponse> {
    return request<B2BMembersDeleteResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}`,
      data: {},
    });
  }

  deletePhoneNumber(
    data: B2BMembersDeletePhoneNumberRequest
  ): Promise<B2BMembersDeletePhoneNumberResponse> {
    return request<B2BMembersDeletePhoneNumberResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/phone_numbers/${data.member_phone_id}`,
      data: {},
    });
  }

  /**
   * Search for Members within specified Organizations. An array with at least one `organization_id` is
   * required. Submitting an empty `query` returns all Members within the specified Organizations.
   *
   * *All fuzzy search filters require a minimum of three characters.
   */
  search(data: B2BMembersSearchRequest): Promise<B2BMembersSearchResponse> {
    return request<B2BMembersSearchResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/members/search`,
      data,
    });
  }

  // Delete a Member's password.
  deletePassword(
    data: B2BMembersDeletePasswordRequest
  ): Promise<B2BMembersDeletePasswordResponse> {
    return request<B2BMembersDeletePasswordResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/passwords/${data.member_password_id}`,
      data: {},
    });
  }

  // Creates a Member. An `organization_id` and `email_address` are required.
  create(data: B2BMembersCreateRequest): Promise<B2BMembersCreateResponse> {
    return request<B2BMembersCreateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/${data.organization_id}/members`,
      data: {
        email_address: data.email_address,
        name: data.name,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
        create_member_as_pending: data.create_member_as_pending,
        is_breakglass: data.is_breakglass,
        phone_number: data.phone_number,
        mfa_enrolled: data.mfa_enrolled,
      },
    });
  }

  // Get a Member by `member_id` or `email_address`.
  get(params: B2BMembersGetRequest): Promise<B2BMembersGetResponse> {
    return request<B2BMembersGetResponse>(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/${params.organization_id}/member`,
      params: { ...params },
    });
  }
}
