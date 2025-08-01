// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import {
  ConnectedApp,
  ConnectedAppWithClientSecret,
  ConnectedAppsResultsMetadata,
} from "./connected_apps";
import { fetchConfig } from "../shared";
import { request } from "../shared";
import { Secrets } from "./connected_apps_clients_secrets";

// Request type for `connectedApp.clients.create`.
export interface ConnectedAppsClientsCreateRequest {
  /**
   * The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and
   * `third_party_public`.
   */
  client_type:
    | "first_party"
    | "first_party_public"
    | "third_party"
    | "third_party_public"
    | string;
  // Array of redirect URI values for use in OAuth Authorization flows.
  redirect_urls: string[];
  /**
   * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
   * exchanged for a full Stytch session.
   */
  full_access_allowed: boolean;
  // Array of redirect URI values for use in OIDC Logout flows.
  post_logout_redirect_urls: string[];
  // A human-readable name for the client.
  client_name?: string;
  // A human-readable description for the client.
  client_description?: string;
  // The number of minutes before the access token expires. The default is 60 minutes.
  access_token_expiry_minutes?: number;
  // The custom audience for the access token.
  access_token_custom_audience?: string;
  // The content of the access token custom claims template. The template must be a valid JSON object.
  access_token_template_content?: string;
  // The logo URL of the Connected App, if any.
  logo_url?: string;
  /**
   * Valid for first party clients only. If true, the client does not need to request explicit user consent
   * for the `offline_access` scope.
   */
  bypass_consent_for_offline_access?: boolean;
}

// Response type for `connectedApp.clients.create`.
export interface ConnectedAppsClientsCreateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The Connected App created by this API call.
  connected_app: ConnectedAppWithClientSecret;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `connectedApp.clients.delete`.
export interface ConnectedAppsClientsDeleteRequest {
  // The ID of the client.
  client_id: string;
}

// Response type for `connectedApp.clients.delete`.
export interface ConnectedAppsClientsDeleteResponse {
  request_id: string;
  // The ID of the client.
  client_id: string;
  status_code: number;
}

// Request type for `connectedApp.clients.get`.
export interface ConnectedAppsClientsGetRequest {
  // The ID of the Connected App client.
  client_id: string;
}

// Response type for `connectedApp.clients.get`.
export interface ConnectedAppsClientsGetResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The Connected App affected by this operation.
  connected_app: ConnectedApp;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `connectedApp.clients.search`.
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

// Response type for `connectedApp.clients.search`.
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

// Request type for `connectedApp.clients.update`.
export interface ConnectedAppsClientsUpdateRequest {
  // The ID of the client.
  client_id: string;
  // A human-readable name for the client.
  client_name?: string;
  // A human-readable description for the client.
  client_description?: string;
  // Array of redirect URI values for use in OAuth Authorization flows.
  redirect_urls?: string[];
  /**
   * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
   * exchanged for a full Stytch session.
   */
  full_access_allowed?: boolean;
  // The number of minutes before the access token expires. The default is 60 minutes.
  access_token_expiry_minutes?: number;
  // The custom audience for the access token.
  access_token_custom_audience?: string;
  // The content of the access token custom claims template. The template must be a valid JSON object.
  access_token_template_content?: string;
  // Array of redirect URI values for use in OIDC Logout flows.
  post_logout_redirect_urls?: string[];
  // The logo URL of the Connected App, if any.
  logo_url?: string;
  /**
   * Valid for first party clients only. If true, the client does not need to request explicit user consent
   * for the `offline_access` scope.
   */
  bypass_consent_for_offline_access?: boolean;
}

// Response type for `connectedApp.clients.update`.
export interface ConnectedAppsClientsUpdateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The Connected App affected by this operation.
  connected_app: ConnectedApp;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

export class Clients {
  private fetchConfig: fetchConfig;
  secrets: Secrets;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.secrets = new Secrets(this.fetchConfig);
  }

  /**
   * Retrieve details of a specific Connected App by `client_id`.
   * @param params {@link ConnectedAppsClientsGetRequest}
   * @returns {@link ConnectedAppsClientsGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  get(
    params: ConnectedAppsClientsGetRequest
  ): Promise<ConnectedAppsClientsGetResponse> {
    const headers: Record<string, string> = {};
    return request<ConnectedAppsClientsGetResponse>(this.fetchConfig, {
      method: "GET",
      url: `/v1/connected_apps/clients/${params.client_id}`,
      headers,
      params: {},
    });
  }

  /**
   * Updates mutable fields of a Connected App. Cannot update Client Type, Client ID, or Secrets.
   * @param data {@link ConnectedAppsClientsUpdateRequest}
   * @returns {@link ConnectedAppsClientsUpdateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  update(
    data: ConnectedAppsClientsUpdateRequest
  ): Promise<ConnectedAppsClientsUpdateResponse> {
    const headers: Record<string, string> = {};
    return request<ConnectedAppsClientsUpdateResponse>(this.fetchConfig, {
      method: "PUT",
      url: `/v1/connected_apps/clients/${data.client_id}`,
      headers,
      data: {
        client_name: data.client_name,
        client_description: data.client_description,
        redirect_urls: data.redirect_urls,
        full_access_allowed: data.full_access_allowed,
        access_token_expiry_minutes: data.access_token_expiry_minutes,
        access_token_custom_audience: data.access_token_custom_audience,
        access_token_template_content: data.access_token_template_content,
        post_logout_redirect_urls: data.post_logout_redirect_urls,
        logo_url: data.logo_url,
        bypass_consent_for_offline_access:
          data.bypass_consent_for_offline_access,
      },
    });
  }

  /**
   * Deletes a Connected App.
   * @param data {@link ConnectedAppsClientsDeleteRequest}
   * @returns {@link ConnectedAppsClientsDeleteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  delete(
    data: ConnectedAppsClientsDeleteRequest
  ): Promise<ConnectedAppsClientsDeleteResponse> {
    const headers: Record<string, string> = {};
    return request<ConnectedAppsClientsDeleteResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/connected_apps/clients/${data.client_id}`,
      headers,
      data: {},
    });
  }

  /**
   * Search for Connected Apps. Supports cursor-based pagination. Specific filters coming soon.
   * @param data {@link ConnectedAppsClientsSearchRequest}
   * @returns {@link ConnectedAppsClientsSearchResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  search(
    data: ConnectedAppsClientsSearchRequest
  ): Promise<ConnectedAppsClientsSearchResponse> {
    const headers: Record<string, string> = {};
    return request<ConnectedAppsClientsSearchResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/connected_apps/clients/search`,
      headers,
      data,
    });
  }

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
  create(
    data: ConnectedAppsClientsCreateRequest
  ): Promise<ConnectedAppsClientsCreateResponse> {
    const headers: Record<string, string> = {};
    return request<ConnectedAppsClientsCreateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/connected_apps/clients`,
      headers,
      data,
    });
  }
}
