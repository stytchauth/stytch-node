import { Discovery } from "./oauth_discovery";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BOAuthProviderValues {
    access_token: string;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    refresh_token?: string;
    expires_at?: Date;
    /**
     * The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information
     * about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are
     * returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/)
     * specification, which is based on OAuth.
     */
    id_token?: string;
}
export interface B2BOAuthAuthenticateRequest {
    oauth_token: string;
    session_token?: string;
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
    session_jwt?: string;
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
    pkce_code_verifier?: string;
    locale?: "en" | "es" | "pt-br";
}
export interface B2BOAuthAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    provider_subject: string;
    provider_type: string;
    session_token: string;
    session_jwt: string;
    member: Member;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    organization: Organization;
    reset_sessions: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    member_session?: MemberSession;
    /**
     * The `provider_values` object lists relevant identifiers, values, and scopes for a given OAuth provider.
     * For example this object will include a provider's `access_token` that you can use to access the
     * provider's API for a given user.
     *
     *   Note that these values will vary based on the OAuth provider in question, e.g. `id_token` is only
     * returned by Microsoft.
     */
    provider_values?: B2BOAuthProviderValues;
}
export declare class OAuth {
    private fetchConfig;
    discovery: Discovery;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate a Member given a `token`. This endpoint verifies that the member completed the OAuth flow
     * by verifying that the token is valid and hasn't expired.  Provide the `session_duration_minutes`
     * parameter to set the lifetime of the session. If the `session_duration_minutes` parameter is not
     * specified, a Stytch session will be created with a 60 minute duration.
     */
    authenticate(data: B2BOAuthAuthenticateRequest): Promise<B2BOAuthAuthenticateResponse>;
}
