"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Organizations = void 0;

var _organizations_members = require("./organizations_members");

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
// ENDMANUAL(SearchQueryOperand)
class Organizations {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.members = new _organizations_members.Members(this.fetchConfig);
  }
  /**
   * Creates an Organization. An `organization_name` and a unique `organization_slug` are required.
   *
   * By default, `email_invites` and `sso_jit_provisioning` will be set to `ALL_ALLOWED` if no Organization
   * authentication settings are explicitly defined in the request.
   *
   * *See the [Organization authentication settings](https://stytch.com/docs/b2b/api/org-auth-settings)
   * resource to learn more about fields like `email_jit_provisioning`, `email_invites`,
   * `sso_jit_provisioning`, etc., and their behaviors.
   */


  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations`,
      data
    });
  } // Returns an Organization specified by `organization_id`.


  get(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/${params.organization_id}`,
      params: {}
    });
  }
  /**
   * Updates an Organization specified by `organization_id`. An Organization must always have at least one
   * auth setting set to either `RESTRICTED` or `ALL_ALLOWED` in order to provision new Members. test
   *
   * *See the [Organization authentication settings](https://stytch.com/docs/b2b/api/org-auth-settings)
   * resource to learn more about fields like `email_jit_provisioning`, `email_invites`,
   * `sso_jit_provisioning`, etc., and their behaviors.
   */


  update(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/b2b/organizations/${data.organization_id}`,
      data: {
        organization_name: data.organization_name,
        organization_slug: data.organization_slug,
        organization_logo_url: data.organization_logo_url,
        trusted_metadata: data.trusted_metadata,
        sso_default_connection_id: data.sso_default_connection_id,
        sso_jit_provisioning: data.sso_jit_provisioning,
        sso_jit_provisioning_allowed_connections: data.sso_jit_provisioning_allowed_connections,
        email_allowed_domains: data.email_allowed_domains,
        email_jit_provisioning: data.email_jit_provisioning,
        email_invites: data.email_invites,
        auth_methods: data.auth_methods,
        allowed_auth_methods: data.allowed_auth_methods,
        mfa_policy: data.mfa_policy
      }
    });
  }
  /**
   * Deletes an Organization specified by `organization_id`. All Members of the Organization will also be
   * deleted.
   */


  delete(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/b2b/organizations/${data.organization_id}`,
      data: {}
    });
  }
  /**
   * Search for Organizations. If you send a request with no body params, no filtering will be applied and
   * the endpoint will return all Organizations. All fuzzy search filters require a minimum of three
   * characters.
   */


  search(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/organizations/search`,
      data
    });
  }

}

exports.Organizations = Organizations;