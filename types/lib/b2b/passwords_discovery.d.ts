import { DiscoveredOrganization } from "./discovery";
import { Email } from "./passwords_discovery_email";
import { fetchConfig } from "../shared";
export interface B2BPasswordsDiscoveryAuthenticateRequest {
    email_address: string;
    /**
     * The password to authenticate, reset, or set for the first time. Any UTF8 character is allowed, e.g.
     * spaces, emojis, non-English characers, etc.
     */
    password: string;
}
export interface B2BPasswordsDiscoveryAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    email_address: string;
    /**
     * The returned Intermediate Session Token contains a password factor associated with the Member. If this
     * value is non-empty, the member must complete an MFA step to finish logging in to the Organization. The
     * token can be used with the
     * [OTP SMS Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-otp-sms),
     * [TOTP Authenticate endpoint](https://stytch.com/docs/b2b/api/authenticate-totp), or
     * [Recovery Codes Recover endpoint](https://stytch.com/docs/b2b/api/recovery-codes-recover) to complete an
     * MFA flow and log in to the Organization. Password factors are not transferable between Organizations, so
     * the intermediate session token is not valid for use with discovery endpoints.
     */
    intermediate_session_token: string;
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
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Discovery {
    private fetchConfig;
    email: Email;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate an email/password combination in the discovery flow. This authenticate flow is only valid
     * for cross-org passwords use cases, and is not tied to a specific organization.
     *
     * If you have breach detection during authentication enabled in your
     * [password strength policy](https://stytch.com/docs/b2b/guides/passwords/strength-policies) and the
     * member's credentials have appeared in the HaveIBeenPwned dataset, this endpoint will return a
     * `member_reset_password` error even if the member enters a correct password. We force a password reset in
     * this case to ensure that the member is the legitimate owner of the email address and not a malicious
     * actor abusing the compromised credentials.
     *
     * If successful, this endpoint will create a new intermediate session and return a list of discovered
     * organizations that can be session exchanged into.
     * @param data {@link B2BPasswordsDiscoveryAuthenticateRequest}
     * @returns {@link B2BPasswordsDiscoveryAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BPasswordsDiscoveryAuthenticateRequest): Promise<B2BPasswordsDiscoveryAuthenticateResponse>;
}
