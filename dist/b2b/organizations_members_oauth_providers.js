"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OAuthProviders = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Response type for `organizations.members.oauthProviders.google`.

// Response type for `organizations.members.oauthProviders.microsoft`.

/**
 * Request type for `organizations.members.oauthProviders.google`,
 * `organizations.members.oauthProviders.microsoft`.
 */

// MANUAL(ProviderInformationRequest)(TYPES)
/**
 * @deprecated Since version 10.11.0. Please use {@link B2BOrganizationsMembersOAuthProvidersProviderInformationRequest} instead.
 */

// ENDMANUAL(ProviderInformationRequest)

class OAuthProviders {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Retrieve the saved Google access token and ID token for a member. After a successful OAuth login, Stytch
   * will save the
   * issued access token and ID token from the identity provider. If a refresh token has been issued, Stytch
   * will refresh the
   * access token automatically.
   *
   * Google One Tap does not return access tokens. If the member has only authenticated through Google One
   * Tap and not through a regular Google OAuth flow, this endpoint will not return any tokens.
   *
   * __Note:__ Google does not issue a refresh token on every login, and refresh tokens may expire if unused.
   * To force a refresh token to be issued, pass the `?provider_prompt=consent` query param into the
   * [Start Google OAuth flow](https://stytch.com/docs/b2b/api/oauth-google-start) endpoint.
   * @param params {@link B2BOrganizationsMembersOAuthProvidersProviderInformationRequest}
   * @returns {@link B2BOrganizationsMembersOAuthProvidersGoogleResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  google(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/${params.organization_id}/members/${params.member_id}/oauth_providers/google`,
      headers,
      params: {
        include_refresh_token: params.include_refresh_token
      }
    });
  }

  /**
   * Retrieve the saved Microsoft access token and ID token for a member. After a successful OAuth login,
   * Stytch will save the
   * issued access token and ID token from the identity provider. If a refresh token has been issued, Stytch
   * will refresh the
   * access token automatically.
   * @param params {@link B2BOrganizationsMembersOAuthProvidersProviderInformationRequest}
   * @returns {@link B2BOrganizationsMembersOAuthProvidersMicrosoftResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  microsoft(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/b2b/organizations/${params.organization_id}/members/${params.member_id}/oauth_providers/microsoft`,
      headers,
      params: {
        include_refresh_token: params.include_refresh_token
      }
    });
  }
}
exports.OAuthProviders = OAuthProviders;