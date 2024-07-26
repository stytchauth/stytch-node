"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Members = void 0;
var _method_options = require("../shared/method_options");
var _organizations_members_oauth_providers = require("./organizations_members_oauth_providers");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `organizations.members.create`.

// Response type for `organizations.members.create`.

// Request type for `organizations.members.dangerouslyGet`.

// Request type for `organizations.members.deleteMFAPhoneNumber`.

// Response type for `organizations.members.deleteMFAPhoneNumber`.

// Request type for `organizations.members.deletePassword`.

// Response type for `organizations.members.deletePassword`.

// Request type for `organizations.members.delete`.

// Response type for `organizations.members.delete`.

// Request type for `organizations.members.deleteTOTP`.

// Response type for `organizations.members.deleteTOTP`.

// Request type for `organizations.members.get`.

// Response type for `organizations.members.dangerouslyGet`, `organizations.members.get`.

// Request type for `organizations.members.reactivate`.

// Response type for `organizations.members.reactivate`.

// Request type for `organizations.members.search`.

// Response type for `organizations.members.search`.

// Request type for `organizations.members.update`.

// Response type for `organizations.members.update`.

class Members {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.oauthProviders = new _organizations_members_oauth_providers.OAuthProviders(this.fetchConfig);
  }

  /**
   * Updates a Member specified by `organization_id` and `member_id`.
   * @param data {@link B2BOrganizationsMembersUpdateRequest}
   * @param options {@link B2BOrganizationsMembersUpdateRequestOptions}
   * @returns {@link B2BOrganizationsMembersUpdateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  update(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}`,
      headers,
      data: {
        name: data.name,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
        is_breakglass: data.is_breakglass,
        mfa_phone_number: data.mfa_phone_number,
        mfa_enrolled: data.mfa_enrolled,
        roles: data.roles,
        preserve_existing_sessions: data.preserve_existing_sessions,
        default_mfa_method: data.default_mfa_method,
        email_address: data.email_address
      }
    });
  }

  /**
   * Deletes a Member specified by `organization_id` and `member_id`.
   * @param data {@link B2BOrganizationsMembersDeleteRequest}
   * @param options {@link B2BOrganizationsMembersDeleteRequestOptions}
   * @returns {@link B2BOrganizationsMembersDeleteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  delete(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Reactivates a deleted Member's status and its associated email status (if applicable) to active,
   * specified by `organization_id` and `member_id`.
   * @param data {@link B2BOrganizationsMembersReactivateRequest}
   * @param options {@link B2BOrganizationsMembersReactivateRequestOptions}
   * @returns {@link B2BOrganizationsMembersReactivateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  reactivate(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}/reactivate`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a Member's MFA phone number.
   *
   * To change a Member's phone number, you must first call this endpoint to delete the existing phone number.
   *
   * Existing Member Sessions that include a phone number authentication factor will not be revoked if the
   * phone number is deleted, and MFA will not be enforced until the Member logs in again.
   * If you wish to enforce MFA immediately after a phone number is deleted, you can do so by prompting the
   * Member to enter a new phone number
   * and calling the [OTP SMS send](https://stytch.com/docs/b2b/api/otp-sms-send) endpoint, then calling the
   * [OTP SMS Authenticate](https://stytch.com/docs/b2b/api/authenticate-otp-sms) endpoint.
   * @param data {@link B2BOrganizationsMembersDeleteMFAPhoneNumberRequest}
   * @param options {@link B2BOrganizationsMembersDeleteMFAPhoneNumberRequestOptions}
   * @returns {@link B2BOrganizationsMembersDeleteMFAPhoneNumberResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteMFAPhoneNumber(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/mfa_phone_numbers/${data.member_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a Member's MFA TOTP registration.
   *
   * To mint a new registration for a Member, you must first call this endpoint to delete the existing
   * registration.
   *
   * Existing Member Sessions that include the TOTP authentication factor will not be revoked if the
   * registration is deleted, and MFA will not be enforced until the Member logs in again.
   * @param data {@link B2BOrganizationsMembersDeleteTOTPRequest}
   * @param options {@link B2BOrganizationsMembersDeleteTOTPRequestOptions}
   * @returns {@link B2BOrganizationsMembersDeleteTOTPResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteTOTP(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}/totp`,
      headers,
      data: {}
    });
  }

  /**
   * Search for Members within specified Organizations. An array with at least one `organization_id` is
   * required. Submitting an empty `query` returns all non-deleted Members within the specified Organizations.
   *
   * *All fuzzy search filters require a minimum of three characters.
   * @param data {@link B2BOrganizationsMembersSearchRequest}
   * @param options {@link B2BOrganizationsMembersSearchRequestOptions}
   * @returns {@link B2BOrganizationsMembersSearchResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  search(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/members/search`,
      headers,
      data
    });
  }

  /**
   * Delete a Member's password.
   * @param data {@link B2BOrganizationsMembersDeletePasswordRequest}
   * @param options {@link B2BOrganizationsMembersDeletePasswordRequestOptions}
   * @returns {@link B2BOrganizationsMembersDeletePasswordResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deletePassword(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/passwords/${data.member_password_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Get a Member by `member_id`. This endpoint does not require an `organization_id`, enabling you to get
   * members across organizations. This is a dangerous operation. Incorrect use may open you up to indirect
   * object reference (IDOR) attacks. We recommend using the
   * [Get Member](https://stytch.com/docs/b2b/api/get-member) API instead.
   * @param params {@link B2BOrganizationsMembersDangerouslyGetRequest}
   * @returns {@link B2BOrganizationsMembersGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  dangerouslyGet(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/members/dangerously_get/${params.member_id}`,
      headers,
      params: {}
    });
  }

  /**
   * @param data {@link B2BOrganizationsMembersUnlinkRetiredEmailRequest}
   * @param options {@link B2BOrganizationsMembersUnlinkRetiredEmailRequestOptions}
   * @returns {@link B2BOrganizationsMembersUnlinkRetiredEmailResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  unlinkRetiredEmail(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}/unlink_retired_email`,
      headers,
      data: {
        email_id: data.email_id,
        email_address: data.email_address
      }
    });
  }

  /**
   * Creates a Member. An `organization_id` and `email_address` are required.
   * @param data {@link B2BOrganizationsMembersCreateRequest}
   * @param options {@link B2BOrganizationsMembersCreateRequestOptions}
   * @returns {@link B2BOrganizationsMembersCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  create(data, options) {
    const headers = {};
    if (options?.authorization) {
      (0, _method_options.addAuthorizationHeaders)(headers, options.authorization);
    }
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/${data.organization_id}/members`,
      headers,
      data: {
        email_address: data.email_address,
        name: data.name,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
        create_member_as_pending: data.create_member_as_pending,
        is_breakglass: data.is_breakglass,
        mfa_phone_number: data.mfa_phone_number,
        mfa_enrolled: data.mfa_enrolled,
        roles: data.roles
      }
    });
  }

  /**
   * Get a Member by `member_id` or `email_address`.
   * @param params {@link B2BOrganizationsMembersGetRequest}
   * @returns {@link B2BOrganizationsMembersGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  get(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/${params.organization_id}/member`,
      headers,
      params: {
        ...params
      }
    });
  }
}
exports.Members = Members;