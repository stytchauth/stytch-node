import { fetchConfig } from "../shared";
export interface B2BMagicLinksEmailDiscoverySendRequest {
    email_address: string;
    /**
     * The URL that the end user clicks from the discovery Magic Link. This URL should be an endpoint in the
     * backend server that
     *   verifies the request by querying Stytch's discovery authenticate endpoint and continues the flow. If
     * this value is not passed, the default
     *   discovery redirect URL that you set in your Dashboard is used. If you have not set a default discovery
     * redirect URL, an error is returned.
     */
    discovery_redirect_url?: string;
    /**
     * A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends
     * on the same device.
     */
    pkce_code_challenge?: string;
    /**
     * Use a custom template for discovery emails. By default, it will use your default email template. The
     * template must be from Stytch's
     * built-in customizations or a custom HTML email for Magic Links - Login.
     */
    login_template_id?: string;
    /**
     * Used to determine which language to use when sending the user this delivery method. Parameter is a
     * [IETF BCP 47 language tag](https://www.w3.org/International/articles/language-tags/), e.g. `"en"`.
     *
     * Currently supported languages are English (`"en"`), Spanish (`"es"`), and Brazilian Portuguese
     * (`"pt-br"`); if no value is provided, the copy defaults to English.
     *
     * Request support for additional languages
     * [here](https://docs.google.com/forms/d/e/1FAIpQLScZSpAu_m2AmLXRT3F3kap-s_mcV6UTBitYn6CdyWP0-o7YjQ/viewform?usp=sf_link")!
     *
     */
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BMagicLinksEmailDiscoverySendResponse {
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
     * Send a discovery magic link to an email address.
     * @param data {@link B2BMagicLinksEmailDiscoverySendRequest}
     * @returns {@link B2BMagicLinksEmailDiscoverySendResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    send(data: B2BMagicLinksEmailDiscoverySendRequest): Promise<B2BMagicLinksEmailDiscoverySendResponse>;
}
