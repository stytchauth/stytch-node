// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { fetchConfig } from "../shared";
import {
  M2MClient,
  M2MClientWithClientSecret,
  M2MResultsMetadata,
  M2MSearchQuery,
} from "./m2m";
import { request } from "../shared";
import { Secrets } from "./m2m_clients_secrets";

// Request type for `m2m.clients.create`.
export interface M2MClientsCreateRequest {
  // An array of scopes assigned to the client.
  scopes: string[];
  /**
   * If provided, the ID of the client to create. If not provided, Stytch will generate this value for you.
   * The `client_id` must be unique within your project.
   */
  client_id?: string;
  /**
   * If provided, the stored secret of the client to create. If not provided, Stytch will generate this value
   * for you. If provided, the `client_secret` must be at least 8 characters long and pass entropy
   * requirements.
   */
  client_secret?: string;
  // A human-readable name for the client.
  client_name?: string;
  // A human-readable description for the client.
  client_description?: string;
  /**
   * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
   * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
   */
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Response type for `m2m.clients.create`.
export interface M2MClientsCreateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The M2M Client created by this API call.
  m2m_client: M2MClientWithClientSecret;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `m2m.clients.delete`.
export interface M2MClientsDeleteRequest {
  // The ID of the client.
  client_id: string;
}

// Response type for `m2m.clients.delete`.
export interface M2MClientsDeleteResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The ID of the client.
  client_id: string;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `m2m.clients.get`.
export interface M2MClientsGetRequest {
  // The ID of the client.
  client_id: string;
}

// Response type for `m2m.clients.get`.
export interface M2MClientsGetResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The M2M Client affected by this operation.
  m2m_client: M2MClient;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `m2m.clients.search`.
export interface M2MClientsSearchRequest {
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
  query?: M2MSearchQuery;
}

// Response type for `m2m.clients.search`.
export interface M2MClientsSearchResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // An array of M2M Clients that match your search query.
  m2m_clients: M2MClient[];
  /**
   * The search `results_metadata` object contains metadata relevant to your specific query like total and
   * `next_cursor`.
   */
  results_metadata: M2MResultsMetadata;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `m2m.clients.update`.
export interface M2MClientsUpdateRequest {
  // The ID of the client.
  client_id: string;
  // A human-readable name for the client.
  client_name?: string;
  // A human-readable description for the client.
  client_description?: string;
  // The status of the client - either `active` or `inactive`.
  status?: "active" | "inactive" | string;
  // An array of scopes assigned to the client.
  scopes?: string[];
  /**
   * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
   * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
   */
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Response type for `m2m.clients.update`.
export interface M2MClientsUpdateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The M2M Client affected by this operation.
  m2m_client: M2MClient;
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
   * Gets information about an existing M2M Client.
   * @param params {@link M2MClientsGetRequest}
   * @returns {@link M2MClientsGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  get(params: M2MClientsGetRequest): Promise<M2MClientsGetResponse> {
    const headers: Record<string, string> = {};
    return request<M2MClientsGetResponse>(this.fetchConfig, {
      method: "GET",
      url: `/v1/m2m/clients/${params.client_id}`,
      headers,
      params: {},
    });
  }

  /**
   * Search for M2M Clients within your Stytch Project. Submit an empty `query` in the request to return all
   * M2M Clients.
   *
   * The following search filters are supported today:
   * - `client_id`: Pass in a list of client IDs to get many clients in a single request
   * - `client_name`: Search for clients by exact match on client name
   * - `scopes`: Search for clients assigned a specific scope
   * @param data {@link M2MClientsSearchRequest}
   * @returns {@link M2MClientsSearchResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  search(data: M2MClientsSearchRequest): Promise<M2MClientsSearchResponse> {
    const headers: Record<string, string> = {};
    return request<M2MClientsSearchResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/m2m/clients/search`,
      headers,
      data,
    });
  }

  /**
   * Updates an existing M2M Client. You can use this endpoint to activate or deactivate a M2M Client by
   * changing its `status`. A deactivated M2M Client will not be allowed to perform future token exchange
   * flows until it is reactivated.
   *
   * **Important:** Deactivating a M2M Client will not invalidate any existing JWTs issued to the client,
   * only prevent it from receiving new ones.
   * To protect more-sensitive routes, pass a lower `max_token_age` value
   * when[authenticating the token](https://stytch.com/docs/b2b/api/authenticate-m2m-token)[authenticating the token](https://stytch.com/docs/api/authenticate-m2m-token).
   * @param data {@link M2MClientsUpdateRequest}
   * @returns {@link M2MClientsUpdateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  update(data: M2MClientsUpdateRequest): Promise<M2MClientsUpdateResponse> {
    const headers: Record<string, string> = {};
    return request<M2MClientsUpdateResponse>(this.fetchConfig, {
      method: "PUT",
      url: `/v1/m2m/clients/${data.client_id}`,
      headers,
      data: {
        client_name: data.client_name,
        client_description: data.client_description,
        status: data.status,
        scopes: data.scopes,
        trusted_metadata: data.trusted_metadata,
      },
    });
  }

  /**
   * Deletes the M2M Client.
   *
   * **Important:** Deleting a M2M Client will not invalidate any existing JWTs issued to the client, only
   * prevent it from receiving new ones.
   * To protect more-sensitive routes, pass a lower `max_token_age` value
   * when[authenticating the token](https://stytch.com/docs/b2b/api/authenticate-m2m-token)[authenticating the token](https://stytch.com/docs/api/authenticate-m2m-token).
   * @param data {@link M2MClientsDeleteRequest}
   * @returns {@link M2MClientsDeleteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  delete(data: M2MClientsDeleteRequest): Promise<M2MClientsDeleteResponse> {
    const headers: Record<string, string> = {};
    return request<M2MClientsDeleteResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/m2m/clients/${data.client_id}`,
      headers,
      data: {},
    });
  }

  /**
   * Creates a new M2M Client. On initial client creation, you may pass in a custom `client_id` or
   * `client_secret` to import an existing M2M client. If you do not pass in a custom `client_id` or
   * `client_secret`, one will be generated automatically. The `client_id` must be unique among all clients
   * in your project.
   *
   * **Important:** This is the only time you will be able to view the generated `client_secret` in the API
   * response. Stytch stores a hash of the `client_secret` and cannot recover the value if lost. Be sure to
   * persist the `client_secret` in a secure location. If the `client_secret` is lost, you will need to
   * trigger a secret rotation flow to receive another one.
   * @param data {@link M2MClientsCreateRequest}
   * @returns {@link M2MClientsCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  create(data: M2MClientsCreateRequest): Promise<M2MClientsCreateResponse> {
    const headers: Record<string, string> = {};
    return request<M2MClientsCreateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/m2m/clients`,
      headers,
      data,
    });
  }
}
