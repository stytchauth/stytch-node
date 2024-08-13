import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User } from "./users";
export interface SIWEParams {
    /**
     * Only required if `siwe_params` is passed. The domain that is requesting the crypto wallet signature.
     * Must be an RFC 3986 authority.
     */
    domain: string;
    /**
     * Only required if `siwe_params` is passed. An RFC 3986 URI referring to the resource that is the subject
     * of the signing.
     */
    uri: string;
    /**
     *  A list of information or references to information the user wishes to have resolved as part of
     * authentication. Every resource must be an RFC 3986 URI.
     */
    resources: string[];
    /**
     * The EIP-155 Chain ID to which the session is bound. Defaults to 1. Must be the string representation of
     * an integer between 1 and 9,223,372,036,854,775,771, inclusive.
     */
    chain_id?: string;
    /**
     * A human-readable ASCII assertion that the user will sign. The statement may only include reserved,
     * unreserved, or space characters according to RFC 3986 definitions, and must not contain other forms of
     * whitespace such as newlines, tabs, and carriage returns.
     */
    statement?: string;
    /**
     * The time when the message was generated. Defaults to the current time. All timestamps in our API conform
     * to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    issued_at?: string;
    /**
     * The time when the signed authentication message will become valid. Defaults to the current time. All
     * timestamps in our API conform to the RFC 3339 standard and are expressed in UTC, e.g.
     * `2021-12-29T12:33:09Z`.
     */
    not_before?: string;
    /**
     * A system-specific identifier that may be used to uniquely refer to the sign-in request. The
     * `message_request_id` must be a valid pchar according to RFC 3986 definitions.
     */
    message_request_id?: string;
}
export interface CryptoWalletsAuthenticateRequest {
    /**
     * The type of wallet to authenticate. Currently `ethereum` and `solana` are supported. Wallets for any
     * EVM-compatible chains (such as Polygon or BSC) are also supported and are grouped under the `ethereum`
     * type.
     */
    crypto_wallet_type: string;
    crypto_wallet_address: string;
    signature: string;
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
export interface CryptoWalletsAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
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
    siwe_params?: CryptoWalletsSIWEParamsResponse;
}
export interface CryptoWalletsAuthenticateStartRequest {
    /**
     * The type of wallet to authenticate. Currently `ethereum` and `solana` are supported. Wallets for any
     * EVM-compatible chains (such as Polygon or BSC) are also supported and are grouped under the `ethereum`
     * type.
     */
    crypto_wallet_type: string;
    crypto_wallet_address: string;
    user_id?: string;
    session_token?: string;
    session_jwt?: string;
    /**
     * The parameters for a Sign In With Ethereum (SIWE) message. May only be passed if the
     * `crypto_wallet_type` is `ethereum`.
     */
    siwe_params?: SIWEParams;
}
export interface CryptoWalletsAuthenticateStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    challenge: string;
    user_created: boolean;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface CryptoWalletsSIWEParamsResponse {
    domain: string;
    uri: string;
    chain_id: string;
    /**
     *  A list of information or references to information the user wishes to have resolved as part of
     * authentication. Every resource must be an RFC 3986 URI.
     */
    resources: string[];
    status_code: number;
    /**
     * The time when the message was generated. All timestamps in our API conform to the RFC 3339 standard and
     * are expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    issued_at?: string;
    message_request_id?: string;
}
export declare class CryptoWallets {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiate the authentication of a crypto wallet. After calling this endpoint, the user will need to sign
     * a message containing the returned `challenge` field.
     *
     * For Ethereum crypto wallets, you can optionally use the Sign In With Ethereum (SIWE) protocol for the
     * message by passing in the `siwe_params`. The only required fields are `domain` and `uri`.
     * If the crypto wallet detects that the domain in the message does not match the website's domain, it will
     * display a warning to the user.
     *
     * If not using the SIWE protocol, the message will simply consist of the project name and a random string.
     * @param data {@link CryptoWalletsAuthenticateStartRequest}
     * @returns {@link CryptoWalletsAuthenticateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticateStart(data: CryptoWalletsAuthenticateStartRequest): Promise<CryptoWalletsAuthenticateStartResponse>;
    /**
     * Complete the authentication of a crypto wallet by passing the signature.
     * @param data {@link CryptoWalletsAuthenticateRequest}
     * @returns {@link CryptoWalletsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: CryptoWalletsAuthenticateRequest): Promise<CryptoWalletsAuthenticateResponse>;
}
