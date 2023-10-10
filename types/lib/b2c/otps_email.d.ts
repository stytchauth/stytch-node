import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
export interface OTPsEmailLoginOrCreateRequest {
    /**
     * The email address of the user to send the one-time passcode to. You may use sandbox@stytch.com to test
     * this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail.
     */
    email: string;
    /**
     * Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the
     * maximum is 10 minutes. The default expiration is 2 minutes.
     */
    expiration_minutes?: number;
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
}
export interface OTPsEmailLoginOrCreateResponse {
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
export interface OTPsEmailSendRequest {
    /**
     * The email address of the user to send the one-time passcode to. You may use sandbox@stytch.com to test
     * this endpoint, see [Testing](https://stytch.com/docs/home#resources_testing) for more detail.
     */
    email: string;
    /**
     * Set the expiration for the one-time passcode, in minutes. The minimum expiration is 1 minute and the
     * maximum is 10 minutes. The default expiration is 2 minutes.
     */
    expiration_minutes?: number;
    attributes?: Attributes;
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
    user_id?: string;
    session_token?: string;
    session_jwt?: string;
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
}
export interface OTPsEmailSendResponse {
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
     * Send a One-Time Passcode (OTP) to a User using their email. If you'd like to create a user and send them
     * a passcode with one request, use our
     * [log in or create endpoint](https://stytch.com/docs/api/log-in-or-create-user-by-email-otp).
     *
     * ### Add an email to an existing user
     * This endpoint also allows you to add a new email address to an existing Stytch User. Including a
     * `user_id`, `session_token`, or `session_jwt` in your Send one-time passcode by email request will add
     * the new, unverified email address to the existing Stytch User. If the user successfully authenticates
     * within 5 minutes, the new email address will be marked as verified and remain permanently on the
     * existing Stytch User. Otherwise, it will be removed from the User object, and any subsequent login
     * requests using that email address will create a new User.
     *
     * ### Next steps
     * Collect the OTP which was delivered to the user. Call
     * [Authenticate OTP](https://stytch.com/docs/api/authenticate-otp) using the OTP `code` along with the
     * `phone_id` found in the response as the `method_id`.
     * @param data {@link OTPsEmailSendRequest}
     * @returns {@link OTPsEmailSendResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    send(data: OTPsEmailSendRequest): Promise<OTPsEmailSendResponse>;
    /**
     * Send a one-time passcode (OTP) to a User using their email. If the email is not associated with a User
     * already, a User will be created.
     *
     * ### Next steps
     *
     * Collect the OTP which was delivered to the User. Call
     * [Authenticate OTP](https://stytch.com/docs/api/authenticate-otp) using the OTP `code` along with the
     * `phone_id` found in the response as the `method_id`.
     * @param data {@link OTPsEmailLoginOrCreateRequest}
     * @returns {@link OTPsEmailLoginOrCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    loginOrCreate(data: OTPsEmailLoginOrCreateRequest): Promise<OTPsEmailLoginOrCreateResponse>;
}
