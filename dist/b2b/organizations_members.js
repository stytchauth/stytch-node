"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Members = void 0;

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class Members {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  } // Updates a Member specified by `organization_id` and `member_id`.


  update(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}`,
      data: {
        name: data.name,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
        is_breakglass: data.is_breakglass,
        phone_number: data.phone_number,
        mfa_enrolled: data.mfa_enrolled
      }
    });
  } // Deletes a Member specified by `organization_id` and `member_id`.


  delete(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/${data.member_id}`,
      data: {}
    });
  }

  deletePhoneNumber(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/phone_numbers/${data.member_id}`,
      data: {}
    });
  }
  /**
   * Search for Members within specified Organizations. An array with at least one `organization_id` is
   * required. Submitting an empty `query` returns all Members within the specified Organizations.
   *
   * *All fuzzy search filters require a minimum of three characters.
   */


  search(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/members/search`,
      data
    });
  } // Delete a Member's password.


  deletePassword(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}/members/passwords/${data.member_password_id}`,
      data: {}
    });
  } // Creates a Member. An `organization_id` and `email_address` are required.


  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
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
        mfa_enrolled: data.mfa_enrolled
      }
    });
  } // Get a Member by `member_id` or `email_address`.


  get(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/${params.organization_id}/member`,
      params: { ...params
      }
    });
  }

}

exports.Members = Members;