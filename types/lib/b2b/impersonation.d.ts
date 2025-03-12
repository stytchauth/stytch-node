import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
export interface B2BImpersonationAuthenticateRequest {
    impersonation_token: string;
}
export interface B2BImpersonationAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    member: Member;
    session_token: string;
    session_jwt: string;
    organization: Organization;
    /**
     * Successfully authenticating an impersonation token will never result in an intermediate session. If the
     * token is valid, a full session will be created.
     */
    intermediate_session_token: string;
    member_authenticated: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
    mfa_required?: MfaRequired;
}
export declare class Impersonation {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate an impersonation token to impersonate a. This endpoint requires an impersonation token that
     * is not expired or previously used.
     * A Stytch session will be created for the impersonated member with a 60 minute duration. Impersonated
     * sessions cannot be extended.
     *
     * Prior to this step, you can generate an impersonation token by visiting the Stytch dashboard, viewing a
     * member, and clicking the `Impersonate Member` button.
     * @param data {@link B2BImpersonationAuthenticateRequest}
     * @returns {@link B2BImpersonationAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BImpersonationAuthenticateRequest): Promise<B2BImpersonationAuthenticateResponse>;
}
