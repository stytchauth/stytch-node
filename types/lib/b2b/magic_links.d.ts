import { Discovery } from "./magic_links_discovery";
import { Email } from "./magic_links_email";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BMagicLinksAuthenticateRequest {
    magic_links_token: string;
    pkce_code_verifier?: string;
    /**
     * Reuse an existing session instead of creating a new one. If you provide a `session_token`, Stytch will
     * update the session.
     *       If the `session_token` and `magic_links_token` belong to different Members, the `session_token`
     * will be ignored. This endpoint will error if
     *       both `session_token` and `session_jwt` are provided.
     */
    session_token?: string;
    /**
     * Reuse an existing session instead of creating a new one. If you provide a `session_jwt`, Stytch will
     * update the session. If the `session_jwt`
     *       and `magic_links_token` belong to different Members, the `session_jwt` will be ignored. This
     * endpoint will error if both `session_token` and `session_jwt`
     *       are provided.
     */
    session_jwt?: string;
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
export interface B2BMagicLinksAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    method_id: string;
    /**
     * Indicates if all Sessions linked to the Member need to be reset. You should check this field if you
     * aren't using
     *     Stytch's Session product. If you are using Stytch's Session product, we revoke the Member’s other
     * Sessions for you.
     */
    reset_sessions: boolean;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    member: Member;
    session_token: string;
    session_jwt: string;
    member_session: MemberSession;
    organization: Organization;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class MagicLinks {
    private fetchConfig;
    email: Email;
    discovery: Discovery;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate a Member with a Magic Link. This endpoint requires a Magic Link token that is not expired
     * or previously used. If the Member’s status is `pending` or `invited`, they will be updated to `active`.
     * Provide the `session_duration_minutes` parameter to set the lifetime of the session. If the
     * `session_duration_minutes` parameter is not specified, a Stytch session will be created with a 60 minute
     * duration.
     * @param data {@link B2BMagicLinksAuthenticateRequest}
     * @returns {@link B2BMagicLinksAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BMagicLinksAuthenticateRequest): Promise<B2BMagicLinksAuthenticateResponse>;
}
