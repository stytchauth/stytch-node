import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BPasswordsSessionResetRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
}
export interface B2BPasswordsSessionResetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    /**
     * The [Member object](https://stytch.com/docs/b2b/api/member-object) if one already exists, or null if one
     * does not.
     */
    member: Member;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
}
export declare class Sessions {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
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
    reset(data: B2BPasswordsSessionResetRequest): Promise<B2BPasswordsSessionResetResponse>;
}
