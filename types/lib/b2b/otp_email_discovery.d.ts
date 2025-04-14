import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
export interface B2BOTPEmailDiscoveryAuthenticateRequest {
    email_address: string;
    code: string;
}
export interface B2BOTPEmailDiscoveryAuthenticateResponse {
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
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BOTPEmailDiscoverySendRequest {
    email_address: string;
    /**
     * Use a custom template for login emails. By default, it will use your default email template. The
     * template must be a template using our built-in customizations or a custom HTML email for OTP - Login.
     */
    login_template_id?: string;
    /**
     * Used to determine which language to use when sending the user this delivery method. Parameter is a
     * [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.
     *
     * Currently supported languages are English (`"en"`), Spanish (`"es"`), French (`"fr"`) and Brazilian
     * Portuguese (`"pt-br"`); if no value is provided, the copy defaults to English.
     *
     * Request support for additional languages
     * [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!
     *
     */
    locale?: "en" | "es" | "pt-br" | "fr" | string;
    /**
     * The expiration time, in minutes, for a discovery OTP email. If not accepted within this time frame, the
     * OTP will need to be resent. Defaults to 10 with a minimum of 2 and a maximum of 15.
     */
    discovery_expiration_minutes?: number;
}
export interface B2BOTPEmailDiscoverySendResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
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
     * Send a discovery OTP to an email address. The OTP is valid for 10 minutes. Only the most recently sent
     * OTP is valid: when an OTP is sent, all OTPs previously sent to the same email address are invalidated,
     * even if unused or unexpired.
     * @param data {@link B2BOTPEmailDiscoverySendRequest}
     * @returns {@link B2BOTPEmailDiscoverySendResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    send(data: B2BOTPEmailDiscoverySendRequest): Promise<B2BOTPEmailDiscoverySendResponse>;
    /**
     * Authenticates the OTP and returns an intermediate session token. Intermediate session tokens can be used
     * for various Discovery login flows and are valid for 10 minutes.
     * @param data {@link B2BOTPEmailDiscoveryAuthenticateRequest}
     * @returns {@link B2BOTPEmailDiscoveryAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BOTPEmailDiscoveryAuthenticateRequest): Promise<B2BOTPEmailDiscoveryAuthenticateResponse>;
}
