import { ConnectedApp, ConnectedAppWithNextClientSecret } from "./connected_apps";
import { fetchConfig } from "../shared";
export interface ConnectedAppsClientsSecretsRotateCancelRequest {
    client_id: string;
}
export interface ConnectedAppsClientsSecretsRotateCancelResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connected_app: ConnectedApp;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface ConnectedAppsClientsSecretsRotateRequest {
    client_id: string;
}
export interface ConnectedAppsClientsSecretsRotateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connected_app: ConnectedApp;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface ConnectedAppsClientsSecretsRotateStartRequest {
    client_id: string;
}
export interface ConnectedAppsClientsSecretsRotateStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connected_app: ConnectedAppWithNextClientSecret;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Secrets {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiate the rotation of a Connected App client secret. After this endpoint is called, both the client's
     * `client_secret` and `next_client_secret` will be valid. To complete the secret rotation flow, update all
     * usages of `client_secret` to `next_client_secret` and call the Rotate Secret Endpoint to complete the
     * flow.
     * Secret rotation can be cancelled using the Cancel Secret Rotation endpoint.
     *
     * **Important:** This is the only time you will be able to view the generated `next_client_secret` in the
     * API response. Stytch stores a hash of the `next_client_secret` and cannot recover the value if lost. Be
     * sure to persist the `next_client_secret` in a secure location. If the `next_client_secret` is lost, you
     * will need to trigger a secret rotation flow to receive another one.
     * @param data {@link ConnectedAppsClientsSecretsRotateStartRequest}
     * @returns {@link ConnectedAppsClientsSecretsRotateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateStart(data: ConnectedAppsClientsSecretsRotateStartRequest): Promise<ConnectedAppsClientsSecretsRotateStartResponse>;
    /**
     * Cancel the rotation of a Connected App client secret started with the Start Secret Rotation Endpoint.
     * After this endpoint is called, the client's `next_client_secret` is discarded and only the original
     * `client_secret` will be valid.
     * @param data {@link ConnectedAppsClientsSecretsRotateCancelRequest}
     * @returns {@link ConnectedAppsClientsSecretsRotateCancelResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateCancel(data: ConnectedAppsClientsSecretsRotateCancelRequest): Promise<ConnectedAppsClientsSecretsRotateCancelResponse>;
    /**
     * Complete the rotation of a Connected App client secret started with the Rotate Secret Start Endpoint.
     * After this endpoint is called, the client's `next_client_secret` becomes its `client_secret` and the
     * previous `client_secret` will no longer be valid.
     * @param data {@link ConnectedAppsClientsSecretsRotateRequest}
     * @returns {@link ConnectedAppsClientsSecretsRotateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotate(data: ConnectedAppsClientsSecretsRotateRequest): Promise<ConnectedAppsClientsSecretsRotateResponse>;
}
