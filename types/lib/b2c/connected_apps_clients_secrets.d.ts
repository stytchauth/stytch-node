import { ConnectedApp, ConnectedAppWithNextClientSecret } from "./connected_apps";
import { fetchConfig } from "../shared";
export interface ConnectedAppsClientsSecretsRotateCancelRequest {
    client_id: string;
}
export interface ConnectedAppsClientsSecretsRotateCancelResponse {
    request_id: string;
    connected_app: ConnectedApp;
    status_code: number;
}
export interface ConnectedAppsClientsSecretsRotateRequest {
    client_id: string;
}
export interface ConnectedAppsClientsSecretsRotateResponse {
    request_id: string;
    connected_app: ConnectedApp;
    status_code: number;
}
export interface ConnectedAppsClientsSecretsRotateStartRequest {
    client_id: string;
}
export interface ConnectedAppsClientsSecretsRotateStartResponse {
    request_id: string;
    connected_app: ConnectedAppWithNextClientSecret;
    status_code: number;
}
export declare class Secrets {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link ConnectedAppsClientsSecretsRotateStartRequest}
     * @returns {@link ConnectedAppsClientsSecretsRotateStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateStart(data: ConnectedAppsClientsSecretsRotateStartRequest): Promise<ConnectedAppsClientsSecretsRotateStartResponse>;
    /**
     * @param data {@link ConnectedAppsClientsSecretsRotateCancelRequest}
     * @returns {@link ConnectedAppsClientsSecretsRotateCancelResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotateCancel(data: ConnectedAppsClientsSecretsRotateCancelRequest): Promise<ConnectedAppsClientsSecretsRotateCancelResponse>;
    /**
     * @param data {@link ConnectedAppsClientsSecretsRotateRequest}
     * @returns {@link ConnectedAppsClientsSecretsRotateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotate(data: ConnectedAppsClientsSecretsRotateRequest): Promise<ConnectedAppsClientsSecretsRotateResponse>;
}
