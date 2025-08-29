import { ConnectedApp, ConnectedAppWithClientSecret, ConnectedAppsResultsMetadata } from "./connected_apps";
import { fetchConfig } from "../shared";
import { Secrets } from "./connected_apps_clients_secrets";
export interface ConnectedAppsClientsCreateRequest {
    /**
     * The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and
     * `third_party_public`.
     */
    client_type: "first_party" | "first_party_public" | "third_party" | "third_party_public" | string;
    client_name?: string;
    client_description?: string;
    redirect_urls?: string[];
    /**
     * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
     * exchanged for a full Stytch session.
     */
    full_access_allowed?: boolean;
    access_token_expiry_minutes?: number;
    access_token_custom_audience?: string;
    access_token_template_content?: string;
    post_logout_redirect_urls?: string[];
    logo_url?: string;
    /**
     * Valid for first party clients only. If true, the client does not need to request explicit user consent
     * for the `offline_access` scope.
     */
    bypass_consent_for_offline_access?: boolean;
}
export interface ConnectedAppsClientsCreateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connected_app: ConnectedAppWithClientSecret;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
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
export interface ConnectedAppsClientsSearchRequest {
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
}
export interface ConnectedAppsClientsSearchResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    connected_apps: ConnectedApp[];
    /**
     * The search `results_metadata` object contains metadata relevant to your specific query like total and
     * `next_cursor`.
     */
    results_metadata: ConnectedAppsResultsMetadata;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface ConnectedAppsClientsUpdateRequest {
    client_id: string;
    client_name?: string;
    client_description?: string;
    redirect_urls?: string[];
    /**
     * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
     * exchanged for a full Stytch session.
     */
    full_access_allowed?: boolean;
    access_token_expiry_minutes?: number;
    access_token_custom_audience?: string;
    access_token_template_content?: string;
    post_logout_redirect_urls?: string[];
    logo_url?: string;
    /**
     * Valid for first party clients only. If true, the client does not need to request explicit user consent
     * for the `offline_access` scope.
     */
    bypass_consent_for_offline_access?: boolean;
}
export interface ConnectedAppsClientsUpdateResponse {
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
export declare class Clients {
    private fetchConfig;
    secrets: Secrets;
    constructor(fetchConfig: fetchConfig);
    /**
     * Retrieve details of a specific Connected App by `client_id`.
     * @param params {@link ConnectedAppsClientsGetRequest}
     * @returns {@link ConnectedAppsClientsGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: ConnectedAppsClientsGetRequest): Promise<ConnectedAppsClientsGetResponse>;
    /**
     * Updates mutable fields of a Connected App. Cannot update Client Type, Client ID, or Secrets.
     * @param data {@link ConnectedAppsClientsUpdateRequest}
     * @returns {@link ConnectedAppsClientsUpdateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    update(data: ConnectedAppsClientsUpdateRequest): Promise<ConnectedAppsClientsUpdateResponse>;
    /**
     * Deletes a Connected App.
     * @param data {@link ConnectedAppsClientsDeleteRequest}
     * @returns {@link ConnectedAppsClientsDeleteResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    delete(data: ConnectedAppsClientsDeleteRequest): Promise<ConnectedAppsClientsDeleteResponse>;
    /**
     * Search for Connected Apps. Supports cursor-based pagination. Specific filters coming soon.
     * @param data {@link ConnectedAppsClientsSearchRequest}
     * @returns {@link ConnectedAppsClientsSearchResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    search(data: ConnectedAppsClientsSearchRequest): Promise<ConnectedAppsClientsSearchResponse>;
    /**
     * Creates a new Connected App. If the Connected App `client_type` is `first_party` or `third_party` a
     * `client_secret` is returned.
     *
     * **Important:** This is the only time you will be able to view the generated `client_secret` in the API
     * response. Stytch stores a hash of the `client_secret` and cannot recover the value if lost. Be sure to
     * persist the `client_secret` in a secure location. If the `client_secret` is lost, you will need to
     * trigger a secret rotation flow to receive another one.
     * @param data {@link ConnectedAppsClientsCreateRequest}
     * @returns {@link ConnectedAppsClientsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: ConnectedAppsClientsCreateRequest): Promise<ConnectedAppsClientsCreateResponse>;
}
