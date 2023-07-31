import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BDiscoveryIntermediateSessionsExchangeRequest {
    /**
     * The Intermediate Session Token. This token does not belong to a specific instance of a member, but may
     * be exchanged for an existing Member Session or used to create a new organization.
     */
    intermediate_session_token: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Set the session lifetime to be this many minutes from now. This will start a new session if one doesn't
     * already exist,
     *   returning both an opaque `session_token` and `session_jwt` for this session. Remember that the
     * `session_jwt` will have a fixed lifetime of
     *   five minutes regardless of the underlying session duration, and will need to be refreshed over time.
     *
     *   This value must be a minimum of 5 and a maximum of 527040 minutes (366 days).
     *
     *   If a `session_token` or `session_jwt` is provided then a successful authentication will continue to
     * extend the session this many minutes.
     *
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will be created with a
     * 60 minute duration. If you don't want
     *   to use the Stytch session product, you can ignore the session fields in the response.
     */
    session_duration_minutes?: number;
    /**
     * Add a custom claims map to the Session being authenticated. Claims are only created if a Session is
     * initialized by providing a value in
     *   `session_duration_minutes`. Claims will be included on the Session object and in the JWT. To update a
     * key in an existing Session, supply a new value. To
     *   delete a key, supply a null value. Custom claims made with reserved claims (`iss`, `sub`, `aud`,
     * `exp`, `nbf`, `iat`, `jti`) will be ignored.
     *   Total custom claims size cannot exceed four kilobytes.
     */
    session_custom_claims?: Record<string, any>;
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BDiscoveryIntermediateSessionsExchangeResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    session_token: string;
    session_jwt: string;
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
}
export declare class IntermediateSessions {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Exchange an Intermediate Session for a fully realized
     * [Member Session](https://stytch.com/docs/b2b/api/session-object) in a desired
     * [Organization](https://stytch.com/docs/b2b/api/organization-object).
     * This operation consumes the Intermediate Session.
     *
     * This endpoint can be used to accept invites and create new members via domain matching.
     * @param data {@link B2BDiscoveryIntermediateSessionsExchangeRequest}
     * @returns {@link B2BDiscoveryIntermediateSessionsExchangeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    exchange(data: B2BDiscoveryIntermediateSessionsExchangeRequest): Promise<B2BDiscoveryIntermediateSessionsExchangeResponse>;
}
