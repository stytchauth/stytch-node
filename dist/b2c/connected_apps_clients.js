"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clients = void 0;
require("../shared/method_options");
var _shared = require("../shared");
var _connected_apps_clients_secrets = require("./connected_apps_clients_secrets");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `connectedApp.clients.create`.

// Response type for `connectedApp.clients.create`.

// Request type for `connectedApp.clients.delete`.

// Response type for `connectedApp.clients.delete`.

// Request type for `connectedApp.clients.get`.

// Response type for `connectedApp.clients.get`.

// Request type for `connectedApp.clients.search`.

// Response type for `connectedApp.clients.search`.

// Request type for `connectedApp.clients.update`.

// Response type for `connectedApp.clients.update`.

class Clients {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.secrets = new _connected_apps_clients_secrets.Secrets(this.fetchConfig);
  }

  /**
   * Retrieve details of a specific Connected App by `client_id`.
   * @param params {@link ConnectedAppsClientsGetRequest}
   * @returns {@link ConnectedAppsClientsGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  get(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/connected_apps/clients/${params.client_id}`,
      headers,
      params: {}
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
  update(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
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
        bypass_consent_for_offline_access: data.bypass_consent_for_offline_access
      }
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
  delete(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/connected_apps/clients/${data.client_id}`,
      headers,
      data: {}
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
  search(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/connected_apps/clients/search`,
      headers,
      data
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
  create(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/connected_apps/clients`,
      headers,
      data
    });
  }
}
exports.Clients = Clients;