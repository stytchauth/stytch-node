import { fetchConfig } from "../shared";
import { M2MClient, M2MClientWithNextClientSecret } from "./m2m";
export interface SecretsRotateCancelRequest {
    client_id: string;
}
export interface SecretsRotateCancelResponse {
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
    m2m_client?: M2MClient;
}
export interface SecretsRotateRequest {
    client_id: string;
}
export interface SecretsRotateResponse {
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
    m2m_client?: M2MClient;
}
export interface SecretsRotateStartRequest {
    client_id: string;
}
export interface SecretsRotateStartResponse {
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
    m2m_client?: M2MClientWithNextClientSecret;
}
export declare class Secrets {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiate the rotation of an M2M client secret. After this endpoint is called, both the client's
     * `client_secret` and `next_client_secret` will be valid. To complete the secret rotation flow, update all
     * usages of `client_secret` to `next_client_secret` and call
     * the[Rotate Secret Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret)[Rotate Secret Endpoint](https://stytch.com/docs/api/m2m-rotate-secret) to complete the flow.
     * Secret rotation can be cancelled using
     * the[Rotate Cancel Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret-cancel)[Rotate Cancel Endpoint](https://stytch.com/docs/api/m2m-rotate-secret-cancel).
     *
     * **Important:** This is the only time you will be able to view the generated `next_client_secret` in the
     * API response. Stytch stores a hash of the `next_client_secret` and cannot recover the value if lost. Be
     * sure to persist the `next_client_secret` in a secure location. If the `next_client_secret` is lost, you
     * will need to trigger a secret rotation flow to receive another one.
     */
    rotateStart(data: SecretsRotateStartRequest): Promise<SecretsRotateStartResponse>;
    /**
     * Cancel the rotation of an M2M client secret started with
     * the[Start Secret Rotation Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret-start)[Start Secret Rotation Endpoint](https://stytch.com/docs/api/m2m-rotate-secret-start).
     * After this endpoint is called, the client's `next_client_secret` is discarded and only the original
     * `client_secret` will be valid.
     */
    rotateCancel(data: SecretsRotateCancelRequest): Promise<SecretsRotateCancelResponse>;
    /**
     * Complete the rotation of an M2M client secret started with
     * the[Start Secret Rotation Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret-start)[Start Secret Rotation Endpoint](https://stytch.com/docs/api/m2m-rotate-secret-start).
     * After this endpoint is called, the client's `next_client_secret` becomes its `client_secret` and the
     * previous `client_secret` will no longer be valid.
     */
    rotate(data: SecretsRotateRequest): Promise<SecretsRotateResponse>;
}
