// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
import { request } from "../shared";

// Request type for `impersonation.authenticate`.
export interface B2BImpersonationAuthenticateRequest {
  // The User Impersonation token to authenticate.
  impersonation_token: string;
}

// Response type for `impersonation.authenticate`.
export interface B2BImpersonationAuthenticateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object)
  member: Member;
  // A secret token for a given Stytch Session.
  session_token: string;
  // The JSON Web Token (JWT) for a given Stytch Session.
  session_jwt: string;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * Successfully authenticating an impersonation token will never result in an intermediate session. If the
   * token is valid, a full session will be created.
   */
  intermediate_session_token: string;
  // The member will always be fully authenticated if an impersonation token is successfully authenticated.
  member_authenticated: boolean;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
  // The [Session object](https://stytch.com/docs/b2b/api/session-object) for the impersonated Member.
  member_session?: MemberSession;
  // MFA will not be required when authenticating impersonation tokens.
  mfa_required?: MfaRequired;
}

export class Impersonation {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Authenticate an impersonation token to impersonate a. This endpoint requires an impersonation token that
   * is not expired or previously used.
   * A Stytch session will be created for the impersonated member with a 60 minute duration. Impersonated
   * sessions cannot be extended.
   * @param data {@link B2BImpersonationAuthenticateRequest}
   * @returns {@link B2BImpersonationAuthenticateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  authenticate(
    data: B2BImpersonationAuthenticateRequest
  ): Promise<B2BImpersonationAuthenticateResponse> {
    const headers: Record<string, string> = {};
    return request<B2BImpersonationAuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/impersonation/authenticate`,
      headers,
      data,
    });
  }
}