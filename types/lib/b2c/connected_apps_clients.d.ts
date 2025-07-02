import { ConnectedApp, ConnectedAppWithClientSecret, ConnectedAppsResultsMetadata } from "./connected_apps";
import { fetchConfig } from "../shared";
import { Secrets } from "./connected_apps_clients_secrets";
export interface ConnectedAppsClientsCreateRequest {
    client_type: "first_party" | "first_party_public" | "third_party" | "third_party_public" | string;
    redirect_urls: string[];
    full_access_allowed: boolean;
    post_logout_redirect_urls: string[];
    client_name?: string;
    client_description?: string;
    access_token_expiry_minutes?: number;
    access_token_custom_audience?: string;
    access_token_template_content?: string;
    logo_url?: string;
    bypass_consent_for_offline_access?: boolean;
}
export interface ConnectedAppsClientsCreateResponse {
    request_id: string;
    connected_app: ConnectedAppWithClientSecret;
    status_code: number;
}
export interface ConnectedAppsClientsDeleteRequest {
    client_id: string;
}
export interface ConnectedAppsClientsDeleteResponse {
    request_id: string;
    client_id: string;
    status_code: number;
}
export interface ConnectedAppsClientsGetRequest {
    client_id: string;
}
export interface ConnectedAppsClientsGetResponse {
    request_id: string;
    connected_app: ConnectedApp;
    status_code: number;
}
export interface ConnectedAppsClientsSearchRequest {
    cursor?: string;
    limit?: number;
}
export interface ConnectedAppsClientsSearchResponse {
    request_id: string;
    connected_apps: ConnectedApp[];
    results_metadata: ConnectedAppsResultsMetadata;
    status_code: number;
}
export interface ConnectedAppsClientsUpdateRequest {
    client_id: string;
    client_name?: string;
    client_description?: string;
    redirect_urls?: string[];
    full_access_allowed?: boolean;
    access_token_expiry_minutes?: number;
    access_token_custom_audience?: string;
    access_token_template_content?: string;
    post_logout_redirect_urls?: string[];
    logo_url?: string;
    bypass_consent_for_offline_access?: boolean;
}
export interface ConnectedAppsClientsUpdateResponse {
    request_id: string;
    connected_app: ConnectedApp;
    status_code: number;
}
export declare class Clients {
    private fetchConfig;
    secrets: Secrets;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param params {@link ConnectedAppsClientsGetRequest}
     * @returns {@link ConnectedAppsClientsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: ConnectedAppsClientsGetRequest): Promise<ConnectedAppsClientsGetResponse>;
    /**
     * @param data {@link ConnectedAppsClientsUpdateRequest}
     * @returns {@link ConnectedAppsClientsUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: ConnectedAppsClientsUpdateRequest): Promise<ConnectedAppsClientsUpdateResponse>;
    /**
     * @param data {@link ConnectedAppsClientsDeleteRequest}
     * @returns {@link ConnectedAppsClientsDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: ConnectedAppsClientsDeleteRequest): Promise<ConnectedAppsClientsDeleteResponse>;
    /**
     * @param data {@link ConnectedAppsClientsSearchRequest}
     * @returns {@link ConnectedAppsClientsSearchResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    search(data: ConnectedAppsClientsSearchRequest): Promise<ConnectedAppsClientsSearchResponse>;
    /**
     * @param data {@link ConnectedAppsClientsCreateRequest}
     * @returns {@link ConnectedAppsClientsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: ConnectedAppsClientsCreateRequest): Promise<ConnectedAppsClientsCreateResponse>;
}
