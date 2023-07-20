import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User } from "./users";
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
export declare class CryptoWallets {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiate the authentication of a crypto wallet. After calling this endpoint, the user will need to sign
     * a message containing only the returned `challenge` field.
     */
    authenticateStart(data: CryptoWalletsAuthenticateStartRequest): Promise<CryptoWalletsAuthenticateStartResponse>;
    authenticate(data: CryptoWalletsAuthenticateRequest): Promise<CryptoWalletsAuthenticateResponse>;
}
