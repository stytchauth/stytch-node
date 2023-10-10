import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
import { Name } from "./users";
export interface MagicLinksEmailInviteRequest {
    email: string;
    /**
     * Use a custom template for invite emails. By default, it will use your default email template. The
     * template must be a template using our built-in customizations or a custom HTML email for Magic links -
     * Invite.
     */
    invite_template_id?: string;
    attributes?: Attributes;
    name?: Name;
    /**
     * The URL the end user clicks from the Email Magic Link. This should be a URL that your app receives and
     * parses and subsequently sends an API request to authenticate the Magic Link and log in the User. If this
     * value is not passed, the default invite redirect URL that you set in your Dashboard is used. If you have
     * not set a default sign-up redirect URL, an error is returned.
     */
    invite_magic_link_url?: string;
    /**
     * Set the expiration for the email magic link, in minutes. By default, it expires in 1 hour. The minimum
     * expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    invite_expiration_minutes?: number;
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
export interface MagicLinksEmailInviteResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface MagicLinksEmailLoginOrCreateRequest {
    email: string;
    /**
     * The URL the end user clicks from the login Email Magic Link. This should be a URL that your app receives
     * and parses and subsequently send an API request to authenticate the Magic Link and log in the User. If
     * this value is not passed, the default login redirect URL that you set in your Dashboard is used. If you
     * have not set a default login redirect URL, an error is returned.
     */
    login_magic_link_url?: string;
    /**
     * The URL the end user clicks from the sign-up Email Magic Link. This should be a URL that your app
     * receives and parses and subsequently send an API request to authenticate the Magic Link and sign-up the
     * User. If this value is not passed, the default sign-up redirect URL that you set in your Dashboard is
     * used. If you have not set a default sign-up redirect URL, an error is returned.
     */
    signup_magic_link_url?: string;
    /**
     * Set the expiration for the login email magic link, in minutes. By default, it expires in 1 hour. The
     * minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    login_expiration_minutes?: number;
    /**
     * Set the expiration for the sign-up email magic link, in minutes. By default, it expires in 1 week. The
     * minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    signup_expiration_minutes?: number;
    /**
     * Use a custom template for login emails. By default, it will use your default email template. The
     * template must be a template using our built-in customizations or a custom HTML email for Magic links -
     * Login.
     */
    login_template_id?: string;
    /**
     * Use a custom template for sign-up emails. By default, it will use your default email template. The
     * template must be a template using our built-in customizations or a custom HTML email for Magic links -
     * Sign-up.
     */
    signup_template_id?: string;
    attributes?: Attributes;
    /**
     * Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.
     *         If true, users will be saved with status pending in Stytch's backend until authenticated.
     *         If false, users will be created as active. An example usage of
     *         a true flag would be to require users to verify their phone by entering the OTP code before
     * creating
     *         an account for them.
     */
    create_user_as_pending?: boolean;
    /**
     * A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends
     * on the same device.
     */
    code_challenge?: string;
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
export interface MagicLinksEmailLoginOrCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
    user_created: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface MagicLinksEmailRevokeInviteRequest {
    email: string;
}
export interface MagicLinksEmailRevokeInviteResponse {
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
export interface MagicLinksEmailSendRequest {
    email: string;
    /**
     * Use a custom template for login emails. By default, it will use your default email template. The
     * template must be a template using our built-in customizations or a custom HTML email for Magic links -
     * Login.
     */
    login_template_id?: string;
    attributes?: Attributes;
    /**
     * The URL the end user clicks from the login Email Magic Link. This should be a URL that your app receives
     * and parses and subsequently send an API request to authenticate the Magic Link and log in the User. If
     * this value is not passed, the default login redirect URL that you set in your Dashboard is used. If you
     * have not set a default login redirect URL, an error is returned.
     */
    login_magic_link_url?: string;
    /**
     * The URL the end user clicks from the sign-up Email Magic Link. This should be a URL that your app
     * receives and parses and subsequently send an API request to authenticate the Magic Link and sign-up the
     * User. If this value is not passed, the default sign-up redirect URL that you set in your Dashboard is
     * used. If you have not set a default sign-up redirect URL, an error is returned.
     */
    signup_magic_link_url?: string;
    /**
     * Set the expiration for the login email magic link, in minutes. By default, it expires in 1 hour. The
     * minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    login_expiration_minutes?: number;
    /**
     * Set the expiration for the sign-up email magic link, in minutes. By default, it expires in 1 week. The
     * minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    signup_expiration_minutes?: number;
    /**
     * A base64url encoded SHA256 hash of a one time secret used to validate that the request starts and ends
     * on the same device.
     */
    code_challenge?: string;
    user_id?: string;
    session_token?: string;
    session_jwt?: string;
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
    /**
     * Use a custom template for sign-up emails. By default, it will use your default email template. The
     * template must be a template using our built-in customizations or a custom HTML email for Magic links -
     * Sign-up.
     */
    signup_template_id?: string;
}
export interface MagicLinksEmailSendResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Email {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Send a magic link to an existing Stytch user using their email address. If you'd like to create a user
     * and send them a magic link by email with one request, use our
     * [log in or create endpoint](https://stytch.com/docs/api/log-in-or-create-user-by-email).
     *
     * ### Add an email to an existing user
     * This endpoint also allows you to add a new email address to an existing Stytch User. Including a
     * `user_id`, `session_token`, or `session_jwt` in your Send Magic Link by email request will add the new,
     * unverified email address to the existing Stytch User. If the user successfully authenticates within 5
     * minutes, the new email address will be marked as verified and remain permanently on the existing Stytch
     * User. Otherwise, it will be removed from the User object, and any subsequent login requests using that
     * email address will create a new User.
     *
     * ### Next steps
     * The user is emailed a magic link which redirects them to the provided
     * [redirect URL](https://stytch.com/docs/guides/magic-links/email-magic-links/redirect-routing). Collect
     * the `token` from the URL query parameters, and call
     * [Authenticate magic link](https://stytch.com/docs/api/authenticate-magic-link) to complete
     * authentication.
     * @param data {@link MagicLinksEmailSendRequest}
     * @returns {@link MagicLinksEmailSendResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    send(data: MagicLinksEmailSendRequest): Promise<MagicLinksEmailSendResponse>;
    /**
     * Send either a login or signup Magic Link to the User based on if the email is associated with a User
     * already. A new or pending User will receive a signup Magic Link. An active User will receive a login
     * Magic Link. For more information on how to control the status your Users are created in see the
     * `create_user_as_pending` flag.
     *
     * ### Next steps
     * The User is emailed a Magic Link which redirects them to the provided
     * [redirect URL](https://stytch.com/docs/guides/magic-links/email-magic-links/redirect-routing). Collect
     * the `token` from the URL query parameters and call
     * [Authenticate Magic Link](https://stytch.com/docs/api/authenticate-magic-link) to complete
     * authentication.
     * @param data {@link MagicLinksEmailLoginOrCreateRequest}
     * @returns {@link MagicLinksEmailLoginOrCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    loginOrCreate(data: MagicLinksEmailLoginOrCreateRequest): Promise<MagicLinksEmailLoginOrCreateResponse>;
    /**
     * Create a User and send an invite Magic Link to the provided `email`. The User will be created with a
     * `pending` status until they click the Magic Link in the invite email.
     *
     * ### Next steps
     * The User is emailed a Magic Link which redirects them to the provided
     * [redirect URL](https://stytch.com/docs/guides/magic-links/email-magic-links/redirect-routing). Collect
     * the `token` from the URL query parameters and call
     * [Authenticate Magic Link](https://stytch.com/docs/api/authenticate-magic-link) to complete
     * authentication.
     * @param data {@link MagicLinksEmailInviteRequest}
     * @returns {@link MagicLinksEmailInviteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    invite(data: MagicLinksEmailInviteRequest): Promise<MagicLinksEmailInviteResponse>;
    /**
     * Revoke a pending invite based on the `email` provided.
     * @param data {@link MagicLinksEmailRevokeInviteRequest}
     * @returns {@link MagicLinksEmailRevokeInviteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    revokeInvite(data: MagicLinksEmailRevokeInviteRequest): Promise<MagicLinksEmailRevokeInviteResponse>;
}
