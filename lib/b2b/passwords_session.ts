// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { request } from "../shared";

// Request type for `passwords.sessions.reset`.
export interface B2BPasswordsSessionResetRequest {
  /**
   * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
   * perform operations on an Organization, so be sure to preserve this value.
   */
  organization_id: string;
  // The password to authenticate.
  password: string;
  // A secret token for a given Stytch Session.
  session_token?: string;
  // The JSON Web Token (JWT) for a given Stytch Session.
  session_jwt?: string;
}

// Response type for `passwords.sessions.reset`.
export interface B2BPasswordsSessionResetResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // Globally unique UUID that identifies a specific Member.
  member_id: string;
  // The [Member object](https://stytch.com/docs/b2b/api/member-object)
  member: Member;
  // The [Organization object](https://stytch.com/docs/b2b/api/organization-object).
  organization: Organization;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
  // The [Session object](https://stytch.com/docs/b2b/api/session-object).
  member_session?: MemberSession;
}

export class Sessions {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Reset the Member's password using their existing session. The endpoint will error if the session does
   * not contain an authentication factor that has been issued within the last 5 minutes. Either
   * `session_token` or `session_jwt` should be provided.
   * @param data {@link B2BPasswordsSessionResetRequest}
   * @returns {@link B2BPasswordsSessionResetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  reset(
    data: B2BPasswordsSessionResetRequest
  ): Promise<B2BPasswordsSessionResetResponse> {
    return request<B2BPasswordsSessionResetResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/b2b/passwords/session/reset`,
      data,
    });
  }
}