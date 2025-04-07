import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
export interface B2BOAuthDiscoveryAuthenticateRequest {
    discovery_oauth_token: string;
    session_token?: string;
    session_duration_minutes?: number;
    session_jwt?: string;
    session_custom_claims?: Record<string, any>;
    pkce_code_verifier?: string;
}
export interface B2BOAuthDiscoveryAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The Intermediate Session Token. This token does not necessarily belong to a specific instance of a
     * Member, but represents a bag of factors that may be converted to a member session. The token can be used
     * with the [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
     * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
     * MFA flow and log in to the Organization. It can also be used with the
     * [Exchange Intermediate Session endpoint](https://stytch.com/docs/b2b/api/exchange-intermediate-session)
     * to join a specific Organization that allows the factors represented by the intermediate session token;
     * or the
     * [Create Organization via Discovery endpoint](https://stytch.com/docs/b2b/api/create-organization-via-discovery) to create a new Organization and Member.
     */
    intermediate_session_token: string;
    email_address: string;
    /**
     * An array of `discovered_organization` objects tied to the `intermediate_session_token`, `session_token`,
     * or `session_jwt`. See the
     * [Discovered Organization Object](https://stytch.com/docs/b2b/api/discovered-organization-object) for
     * complete details.
     *
     *   Note that Organizations will only appear here under any of the following conditions:
     *   1. The end user is already a Member of the Organization.
     *   2. The end user is invited to the Organization.
     *   3. The end user can join the Organization because:
     *
     *       a) The Organization allows JIT provisioning.
     *
     *       b) The Organizations' allowed domains list contains the Member's email domain.
     *
     *       c) The Organization has at least one other Member with a verified email address with the same
     * domain as the end user (to prevent phishing attacks).
     */
    discovered_organizations: DiscoveredOrganization[];
    /**
     * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub
     * etc.
     */
    provider_type: string;
    /**
     * The tenant ID returned by the OAuth provider. This is typically used to identify an organization or
     * group within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the
     * Workspace ID, and in GitHub this is an organization ID. This field will only be populated if exactly one
     * tenant ID is returned from a successful OAuth authentication and developers should prefer
     * `provider_tenant_ids` over this since it accounts for the possibility of an OAuth provider yielding
     * multiple tenant IDs.
     */
    provider_tenant_id: string;
    /**
     * All tenant IDs returned by the OAuth provider. These is typically used to identify organizations or
     * groups within the provider's domain. For example, in HubSpot this is a Hub ID, in Slack this is the
     * Workspace ID, and in GitHub this is an organization ID. Some OAuth providers do not return tenant IDs,
     * some providers are guaranteed to return one, and some may return multiple. This field will always be
     * populated if at least one tenant ID was returned from the OAuth provider and developers should prefer
     * this field over `provider_tenant_id`.
     */
    provider_tenant_ids: string[];
    full_name: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Discovery {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticates the Discovery token and exchanges it for an Intermediate
     * Session Token. Intermediate Session Tokens can be used for various Discovery login flows and are valid
     * for 10 minutes.
     * @param data {@link B2BOAuthDiscoveryAuthenticateRequest}
     * @returns {@link B2BOAuthDiscoveryAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BOAuthDiscoveryAuthenticateRequest): Promise<B2BOAuthDiscoveryAuthenticateResponse>;
}
