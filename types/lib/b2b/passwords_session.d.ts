import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BSessionResetRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    password: string;
    session_token?: string;
    session_jwt?: string;
}
export interface B2BSessionResetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
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
     */
    reset(data: B2BSessionResetRequest): Promise<B2BSessionResetResponse>;
}
