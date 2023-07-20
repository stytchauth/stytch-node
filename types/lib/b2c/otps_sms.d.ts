import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
export interface SmsLoginOrCreateRequest {
    /**
     * The phone number to use for one-time passcodes. The phone number should be in E.164 format. The phone
     * number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint,
     * see [Testing](https://stytch.com/docs/home#resources_testing) for more detail.
     */
    phone_number: string;
    /**
     * Set the expiration for the Magic Link `token` in minutes. By default, it expires in 1 hour. The minimum
     * expiration is 5 minutes and the maximum is 7 days (10080 mins).
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
}
export interface SmsLoginOrCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    phone_id: string;
    user_created: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface SmsSendRequest {
    /**
     * The phone number to use for one-time passcodes. The phone number should be in E.164 format. The phone
     * number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint,
     * see [Testing](https://stytch.com/docs/home#resources_testing) for more detail.
     */
    phone_number: string;
    /**
     * Set the expiration for the Magic Link `token` in minutes. By default, it expires in 1 hour. The minimum
     * expiration is 5 minutes and the maximum is 7 days (10080 mins).
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
}
export interface SmsSendResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    phone_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Sms {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Send a one-time passcode (OTP) to a user's phone number. If you'd like to create a user and send them a
     * passcode with one request, use our
     * [log in or create](https://stytch.com/docs/api/log-in-or-create-user-by-sms) endpoint.
     *
     * Note that sending another OTP code before the first has expired will invalidate the first code.
     *
     * ### Add a phone number to an existing user
     *
     * This endpoint also allows you to add a new phone number to an existing Stytch User. Including a
     * `user_id`, `session_token`, or `session_jwt` in the request will add the phone number to the
     * pre-existing Stytch User upon successful authentication.
     *
     * Adding a new phone number to an existing Stytch User requires the user to be present and validate the
     * phone number via OTP. This requirement is in place to prevent account takeover attacks.
     *
     * ### Next steps
     *
     * Collect the OTP which was delivered to the user. Call
     * [Authenticate OTP](https://stytch.com/docs/api/authenticate-otp) using the OTP `code` along with the
     * `phone_id` found in the response as the `method_id`.
     */
    send(data: SmsSendRequest): Promise<SmsSendResponse>;
    /**
     * Send a one-time passcode (OTP) to a User using their phone number. If the phone number is not associated
     * with a user already, a user will be created.
     *
     * ### Next steps
     *
     * Collect the OTP which was delivered to the User. Call
     * [Authenticate OTP](https://stytch.com/docs/api/authenticate-otp) using the OTP `code` along with the
     * `phone_id` found in the response as the `method_id`.
     */
    loginOrCreate(data: SmsLoginOrCreateRequest): Promise<SmsLoginOrCreateResponse>;
}
