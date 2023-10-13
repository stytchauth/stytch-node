import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
export interface BiometricRegistration {
    biometric_registration_id: string;
    /**
     * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
     * has been successfully authenticated by the User.
     */
    verified: boolean;
}
export interface CryptoWallet {
    crypto_wallet_id: string;
    crypto_wallet_address: string;
    crypto_wallet_type: string;
    /**
     * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
     * has been successfully authenticated by the User.
     */
    verified: boolean;
}
export interface Email {
    email_id: string;
    email: string;
    /**
     * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
     * has been successfully authenticated by the User.
     */
    verified: boolean;
}
export interface Name {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
}
export interface OAuthProvider {
    /**
     * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Facebook, GitHub
     * etc.
     */
    provider_type: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the "sub" or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * If available, the `profile_picture_url` is a url of the User's profile picture set in OAuth identity the
     * provider that the User has authenticated with, e.g. Facebook profile picture.
     */
    profile_picture_url: string;
    /**
     * If available, the `locale` is the User's locale set in the OAuth identity provider that the user has
     * authenticated with.
     */
    locale: string;
    oauth_user_registration_id: string;
}
export interface Password {
    password_id: string;
    requires_reset: boolean;
}
export interface PhoneNumber {
    phone_id: string;
    phone_number: string;
    /**
     * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
     * has been successfully authenticated by the User.
     */
    verified: boolean;
}
export interface SearchUsersQuery {
    /**
     * The action to perform on the operands. The accepted value are:
     *
     *   `AND` – all the operand values provided must match.
     *
     *   `OR` – the operator will return any matches to at least one of the operand values you supply.
     */
    operator: "OR" | "AND" | string;
    /**
     * An array of operand objects that contains all of the filters and values to apply to your search search
     * query.
     */
    operands: SearchUsersQueryOperand[];
}
export interface TOTP {
    totp_id: string;
    /**
     * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
     * has been successfully authenticated by the User.
     */
    verified: boolean;
}
export interface User {
    user_id: string;
    emails: Email[];
    status: string;
    phone_numbers: PhoneNumber[];
    webauthn_registrations: WebAuthnRegistration[];
    providers: OAuthProvider[];
    totps: TOTP[];
    crypto_wallets: CryptoWallet[];
    biometric_registrations: BiometricRegistration[];
    name?: Name;
    /**
     * The timestamp of the User's creation. Values conform to the RFC 3339 standard and are expressed in UTC,
     * e.g. `2021-12-29T12:33:09Z`.
     */
    created_at?: string;
    password?: Password;
    /**
     * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
     * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
     * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
     * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
     * behavior details.
     */
    untrusted_metadata?: Record<string, any>;
}
export interface UsersResultsMetadata {
    total: number;
    /**
     * The `next_cursor` string is returned when your search result contains more than one page of results.
     * This value is passed into your next search call in the `cursor` field.
     */
    next_cursor?: string;
}
export interface WebAuthnRegistration {
    webauthn_registration_id: string;
    domain: string;
    user_agent: string;
    /**
     * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
     * has been successfully authenticated by the User.
     */
    verified: boolean;
    /**
     * The `authenticator_type` string displays the requested authenticator type of the WebAuthn device. The
     * two valid types are "platform" and "cross-platform". If no value is present, the WebAuthn device was
     * created without an authenticator type preference.
     */
    authenticator_type: string;
    name: string;
}
export interface UsersCreateRequest {
    email?: string;
    name?: Name;
    attributes?: Attributes;
    /**
     * The phone number to use for one-time passcodes. The phone number should be in E.164 format (i.e.
     * +1XXXXXXXXXX). You may use +10000000000 to test this endpoint, see
     * [Testing](https://stytch.com/docs/home#resources_testing) for more detail.
     */
    phone_number?: string;
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
     * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
     * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
     * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
     * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
     * behavior details.
     */
    untrusted_metadata?: Record<string, any>;
}
export interface UsersCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    email_id: string;
    status: string;
    phone_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteBiometricRegistrationRequest {
    biometric_registration_id: string;
}
export interface UsersDeleteBiometricRegistrationResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteCryptoWalletRequest {
    crypto_wallet_id: string;
}
export interface UsersDeleteCryptoWalletResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteEmailRequest {
    email_id: string;
}
export interface UsersDeleteEmailResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteOAuthRegistrationRequest {
    oauth_user_registration_id: string;
}
export interface UsersDeleteOAuthRegistrationResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeletePasswordRequest {
    password_id: string;
}
export interface UsersDeletePasswordResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeletePhoneNumberRequest {
    phone_id: string;
}
export interface UsersDeletePhoneNumberResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteRequest {
    user_id: string;
}
export interface UsersDeleteResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteTOTPRequest {
    totp_id: string;
}
export interface UsersDeleteTOTPResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersDeleteWebAuthnRegistrationRequest {
    webauthn_registration_id: string;
}
export interface UsersDeleteWebAuthnRegistrationResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersExchangePrimaryFactorRequest {
    user_id: string;
    email_address?: string;
    phone_number?: string;
}
export interface UsersExchangePrimaryFactorResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersGetRequest {
    user_id: string;
}
export interface UsersGetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    emails: Email[];
    status: string;
    phone_numbers: PhoneNumber[];
    webauthn_registrations: WebAuthnRegistration[];
    providers: OAuthProvider[];
    totps: TOTP[];
    crypto_wallets: CryptoWallet[];
    biometric_registrations: BiometricRegistration[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    name?: Name;
    /**
     * The timestamp of the User's creation. Values conform to the RFC 3339 standard and are expressed in UTC,
     * e.g. `2021-12-29T12:33:09Z`.
     */
    created_at?: string;
    password?: Password;
    /**
     * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
     * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
     * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
     * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
     * behavior details.
     */
    untrusted_metadata?: Record<string, any>;
}
export interface UsersSearchRequest {
    /**
     * The `cursor` field allows you to paginate through your results. Each result array is limited to 1000
     * results. If your query returns more than 1000 results, you will need to paginate the responses using the
     * `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata`
     * object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the
     * next page of results. Continue to make search calls until the `next_cursor` in the response is null.
     */
    cursor?: string;
    /**
     * The number of search results to return per page. The default limit is 100. A maximum of 1000 results can
     * be returned by a single search request. If the total size of your result set is greater than one page
     * size, you must paginate the response. See the `cursor` field.
     */
    limit?: number;
    /**
     * The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter
     * your results. Only an operator is required. If you include no operands, no filtering will be applied. If
     * you include no query object, it will return all results with no filtering applied.
     */
    query?: SearchUsersQuery;
}
export interface UsersSearchResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    results: User[];
    /**
     * The search `results_metadata` object contains metadata relevant to your specific query like total and
     * `next_cursor`.
     */
    results_metadata: UsersResultsMetadata;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface UsersUpdateRequest {
    user_id: string;
    name?: Name;
    attributes?: Attributes;
    /**
     * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
     * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
     */
    trusted_metadata?: Record<string, any>;
    /**
     * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
     * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
     * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
     * behavior details.
     */
    untrusted_metadata?: Record<string, any>;
}
export interface UsersUpdateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    emails: Email[];
    phone_numbers: PhoneNumber[];
    crypto_wallets: CryptoWallet[];
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare type SearchUsersQueryOperand = {
    filter_name: "created_at_greater_than";
    filter_value: string;
} | {
    filter_name: "created_at_less_than";
    filter_value: string;
} | {
    filter_name: "created_at_between";
    filter_value: {
        greater_than: string;
        less_than: string;
    };
} | {
    filter_name: "status";
    filter_value: "active" | "pending";
} | {
    filter_name: "oauth_provider";
    filter_value: string[];
} | {
    filter_name: "user_id";
    filter_value: string[];
} | {
    filter_name: "full_name_fuzzy";
    filter_value: string;
} | {
    filter_name: "phone_number";
    filter_value: string[];
} | {
    filter_name: "phone_id";
    filter_value: string[];
} | {
    filter_name: "phone_verified";
    filter_value: boolean;
} | {
    filter_name: "phone_number_fuzzy";
    filter_value: string;
} | {
    filter_name: "email_address";
    filter_value: string[];
} | {
    filter_name: "email_id";
    filter_value: string[];
} | {
    filter_name: "email_verified";
    filter_value: boolean;
} | {
    filter_name: "email_address_fuzzy";
    filter_value: string;
} | {
    filter_name: "webauthn_registration_verified";
    filter_value: boolean;
} | {
    filter_name: "webauthn_registration_id";
    filter_value: string[];
} | {
    filter_name: "crypto_wallet_id";
    filter_value: string[];
} | {
    filter_name: "crypto_wallet_address";
    filter_value: string[];
} | {
    filter_name: "crypto_wallet_verified";
    filter_value: boolean;
} | {
    filter_name: "totp_id";
    filter_value: string[];
} | {
    filter_name: "totp_verified";
    filter_value: boolean;
} | {
    filter_name: "password_exists";
    filter_value: boolean;
} | {
    filter_name: string;
    [key: string]: unknown;
};
export declare class UserSearchIterator {
    private client;
    private data;
    private mode;
    constructor(client: Users, data: UsersSearchRequest);
    next(): Promise<User[]>;
    hasNext(): boolean;
    [Symbol.asyncIterator](): AsyncIterator<User[]>;
}
export declare class Users {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Add a User to Stytch. A `user_id` is returned in the response that can then be used to perform other
     * operations within Stytch. An `email` or a `phone_number` is required.
     * @param data {@link UsersCreateRequest}
     * @returns {@link UsersCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: UsersCreateRequest): Promise<UsersCreateResponse>;
    /**
     * Get information about a specific User.
     * @param data {@link UsersGetRequest}
     * @returns {@link UsersGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: UsersGetRequest): Promise<UsersGetResponse>;
    /**
     * Search for Users within your Stytch Project. Submit an empty `query` in the request to return all Users.
     * @param data {@link UsersSearchRequest}
     * @returns {@link UsersSearchResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    search(data: UsersSearchRequest): Promise<UsersSearchResponse>;
    /**
     * Update a User's attributes.
     *
     * **Note:** In order to add a new email address or phone number to an existing User object, pass the new
     * email address or phone number into the respective `/send` endpoint for the authentication method of your
     * choice. If you specify the existing User's `user_id` while calling the `/send` endpoint, the new,
     * unverified email address or phone number will be added to the existing User object. If the user
     * successfully authenticates within 5 minutes of the `/send` request, the new email address or phone
     * number will be marked as verified and remain permanently on the existing Stytch User. Otherwise, it will
     * be removed from the User object, and any subsequent login requests using that phone number will create a
     * new User. We require this process to guard against an account takeover vulnerability.
     * @param data {@link UsersUpdateRequest}
     * @returns {@link UsersUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: UsersUpdateRequest): Promise<UsersUpdateResponse>;
    /**
     * Exchange a user's email address or phone number for another.
     *
     * Must pass either an `email_address` or a `phone_number`.
     *
     * This endpoint only works if the user has exactly one factor. You are able to exchange the type of factor
     * for another as well, i.e. exchange an `email_address` for a `phone_number`.
     *
     * Use this endpoint with caution as it performs an admin level action.
     * @param data {@link UsersExchangePrimaryFactorRequest}
     * @returns {@link UsersExchangePrimaryFactorResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    exchangePrimaryFactor(data: UsersExchangePrimaryFactorRequest): Promise<UsersExchangePrimaryFactorResponse>;
    /**
     * Delete a User from Stytch.
     * @param data {@link UsersDeleteRequest}
     * @returns {@link UsersDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: UsersDeleteRequest): Promise<UsersDeleteResponse>;
    /**
     * Delete an email from a User.
     * @param data {@link UsersDeleteEmailRequest}
     * @returns {@link UsersDeleteEmailResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteEmail(data: UsersDeleteEmailRequest): Promise<UsersDeleteEmailResponse>;
    /**
     * Delete a phone number from a User.
     * @param data {@link UsersDeletePhoneNumberRequest}
     * @returns {@link UsersDeletePhoneNumberResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deletePhoneNumber(data: UsersDeletePhoneNumberRequest): Promise<UsersDeletePhoneNumberResponse>;
    /**
     * Delete a WebAuthn registration from a User.
     * @param data {@link UsersDeleteWebAuthnRegistrationRequest}
     * @returns {@link UsersDeleteWebAuthnRegistrationResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteWebAuthnRegistration(data: UsersDeleteWebAuthnRegistrationRequest): Promise<UsersDeleteWebAuthnRegistrationResponse>;
    /**
     * Delete a biometric registration from a User.
     * @param data {@link UsersDeleteBiometricRegistrationRequest}
     * @returns {@link UsersDeleteBiometricRegistrationResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteBiometricRegistration(data: UsersDeleteBiometricRegistrationRequest): Promise<UsersDeleteBiometricRegistrationResponse>;
    /**
     * Delete a TOTP from a User.
     * @param data {@link UsersDeleteTOTPRequest}
     * @returns {@link UsersDeleteTOTPResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteTOTP(data: UsersDeleteTOTPRequest): Promise<UsersDeleteTOTPResponse>;
    /**
     * Delete a crypto wallet from a User.
     * @param data {@link UsersDeleteCryptoWalletRequest}
     * @returns {@link UsersDeleteCryptoWalletResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteCryptoWallet(data: UsersDeleteCryptoWalletRequest): Promise<UsersDeleteCryptoWalletResponse>;
    /**
     * Delete a password from a User.
     * @param data {@link UsersDeletePasswordRequest}
     * @returns {@link UsersDeletePasswordResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deletePassword(data: UsersDeletePasswordRequest): Promise<UsersDeletePasswordResponse>;
    /**
     * Delete an OAuth registration from a User.
     * @param data {@link UsersDeleteOAuthRegistrationRequest}
     * @returns {@link UsersDeleteOAuthRegistrationResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteOAuthRegistration(data: UsersDeleteOAuthRegistrationRequest): Promise<UsersDeleteOAuthRegistrationResponse>;
    searchAll(data: UsersSearchRequest): UserSearchIterator;
}
