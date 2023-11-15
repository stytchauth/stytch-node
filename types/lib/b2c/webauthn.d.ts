import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User, WebAuthnRegistration } from "./users";
export interface WebAuthnAuthenticateRequest {
    /**
     * The response of the
     * [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential).
     */
    public_key_credential: string;
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
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created.
     */
    session_duration_minutes?: number;
    session_jwt?: string;
    /**
     * Add a custom claims map to the Session being authenticated. Claims are only created if a Session is
     * initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session
     * object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key,
     * supply a null value.
     *
     *   Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be
     * ignored. Total custom claims size cannot exceed four kilobytes.
     */
    session_custom_claims?: Record<string, any>;
}
export interface WebAuthnAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    webauthn_registration_id: string;
    session_token: string;
    session_jwt: string;
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
    /**
     * If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll
     * receive a full Session object in the response.
     *
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    session?: Session;
}
export interface WebAuthnAuthenticateStartRequest {
    domain: string;
    user_id?: string;
    /**
     * If true, the `public_key_credential_creation_options` returned will be optimized for Passkeys. This
     * includes making `userVerification` preferred.
     */
    return_passkey_credential_options?: boolean;
}
export interface WebAuthnAuthenticateStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    public_key_credential_request_options: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface WebAuthnRegisterRequest {
    user_id: string;
    /**
     * The response of the
     * [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential).
     */
    public_key_credential: string;
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
     *   If the `session_duration_minutes` parameter is not specified, a Stytch session will not be created.
     */
    session_duration_minutes?: number;
    session_jwt?: string;
    /**
     * Add a custom claims map to the Session being authenticated. Claims are only created if a Session is
     * initialized by providing a value in `session_duration_minutes`. Claims will be included on the Session
     * object and in the JWT. To update a key in an existing Session, supply a new value. To delete a key,
     * supply a null value.
     *
     *   Custom claims made with reserved claims ("iss", "sub", "aud", "exp", "nbf", "iat", "jti") will be
     * ignored. Total custom claims size cannot exceed four kilobytes.
     */
    session_custom_claims?: Record<string, any>;
}
export interface WebAuthnRegisterResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    webauthn_registration_id: string;
    session_token: string;
    session_jwt: string;
    user: User;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll
     * receive a full Session object in the response.
     *
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    session?: Session;
}
export interface WebAuthnRegisterStartRequest {
    user_id: string;
    domain: string;
    user_agent?: string;
    /**
     * The requested authenticator type of the WebAuthn device. The two valid values are platform and
     * cross-platform. If no value passed, we assume both values are allowed.
     */
    authenticator_type?: string;
    /**
     * If true, the `public_key_credential_creation_options` returned will be optimized for Passkeys. This
     * includes making `residentKey` required, `userVerification` preferred, and ignoring the
     * `authenticator_type` passed.
     */
    return_passkey_credential_options?: boolean;
}
export interface WebAuthnRegisterStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    public_key_credential_creation_options: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface WebAuthnUpdateRequest {
    /**
     * Globally unique UUID that identifies a WebAuthn registration in the Stytch API. The
     * `webautn_registration_id` is used when you need to operate on a specific User's WebAuthn registartion.
     */
    webauthn_registration_id: string;
    name: string;
}
export interface WebAuthnUpdateResponse {
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
    webauthn_registration?: WebAuthnRegistration;
}
export declare class WebAuthn {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiate the process of creating a new WebAuthn registration. After calling this endpoint, the browser
     * will need to call
     * [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential) with the data
     * from
     * [public_key_credential_creation_options](https://w3c.github.io/webauthn/#dictionary-makecredentialoptions)
     * passed to the [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential)
     * request via the public key argument. We recommend using the `create()` wrapper provided by the
     * webauthn-json library.
     *
     * If you are not using the [webauthn-json](https://github.com/github/webauthn-json) library, the
     * `public_key_credential_creation_options` will need to be converted to a suitable public key by
     * unmarshalling the JSON, base64 decoding the user ID field, and converting user ID and the challenge
     * fields into an array buffer.
     * @param data {@link WebAuthnRegisterStartRequest}
     * @returns {@link WebAuthnRegisterStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    registerStart(data: WebAuthnRegisterStartRequest): Promise<WebAuthnRegisterStartResponse>;
    /**
     * Complete the creation of a WebAuthn registration by passing the response from the
     * [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential) request to
     * this endpoint as the `public_key_credential` parameter.
     *
     * If the [webauthn-json](https://github.com/github/webauthn-json) library's `create()` method was used,
     * the response can be passed directly to the
     * [register endpoint](https://stytch.com/docs/api/webauthn-register). If not, some fields (the client data
     * and the attestation object) from the
     * [navigator.credentials.create()](https://www.w3.org/TR/webauthn-2/#sctn-createCredential) response will
     * need to be converted from array buffers to strings and marshalled into JSON.
     * @param data {@link WebAuthnRegisterRequest}
     * @returns {@link WebAuthnRegisterResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    register(data: WebAuthnRegisterRequest): Promise<WebAuthnRegisterResponse>;
    /**
     * Initiate the authentication of a WebAuthn registration. After calling this endpoint, the browser will
     * need to call [navigator.credentials.get()](https://www.w3.org/TR/webauthn-2/#sctn-getAssertion) with the
     * data from `public_key_credential_request_options` passed to the
     * [navigator.credentials.get()](https://www.w3.org/TR/webauthn-2/#sctn-getAssertion) request via the
     * public key argument. We recommend using the `get()` wrapper provided by the webauthn-json library.
     *
     * If you are not using the [webauthn-json](https://github.com/github/webauthn-json) library, `the
     * public_key_credential_request_options` will need to be converted to a suitable public key by
     * unmarshalling the JSON and converting some the fields to array buffers.
     * @param data {@link WebAuthnAuthenticateStartRequest}
     * @returns {@link WebAuthnAuthenticateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticateStart(data: WebAuthnAuthenticateStartRequest): Promise<WebAuthnAuthenticateStartResponse>;
    /**
     * Complete the authentication of a WebAuthn registration by passing the response from the
     * [navigator.credentials.get()](https://www.w3.org/TR/webauthn-2/#sctn-getAssertion) request to the
     * authenticate endpoint.
     *
     * If the [webauthn-json](https://github.com/github/webauthn-json) library's `get()` method was used, the
     * response can be passed directly to the
     * [authenticate endpoint](https://stytch.com/docs/api/webauthn-authenticate). If not some fields from the
     * [navigator.credentials.get()](https://www.w3.org/TR/webauthn-2/#sctn-getAssertion) response will need to
     * be converted from array buffers to strings and marshalled into JSON.
     * @param data {@link WebAuthnAuthenticateRequest}
     * @returns {@link WebAuthnAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: WebAuthnAuthenticateRequest): Promise<WebAuthnAuthenticateResponse>;
    /**
     * Updates a WebAuthn registration.
     * @param data {@link WebAuthnUpdateRequest}
     * @returns {@link WebAuthnUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: WebAuthnUpdateRequest): Promise<WebAuthnUpdateResponse>;
}
