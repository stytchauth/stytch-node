"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Secrets = void 0;

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class Secrets {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }
  /**
   * Initiate the rotation of an M2M client secret. After this endpoint is called, both the client's
   * `client_secret` and `next_client_secret` will be valid. To complete the secret rotation flow, update all
   * usages of `client_secret` to `next_client_secret` and call the
   * [Rotate Secret Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret)[Rotate Secret Endpoint](https://stytch.com/docs/api/m2m-rotate-secret) to complete the flow.
   * Secret rotation can be cancelled using the
   * [Rotate Cancel Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret-cancel)[Rotate Cancel Endpoint](https://stytch.com/docs/api/m2m-rotate-secret-cancel).
   *
   * **Important:** This is the only time you will be able to view the generated `next_client_secret` in the
   * API response. Stytch stores a hash of the `next_client_secret` and cannot recover the value if lost. Be
   * sure to persist the `next_client_secret` in a secure location. If the `next_client_secret` is lost, you
   * will need to trigger a secret rotation flow to receive another one.
   * @param data {@link M2MClientsSecretsRotateStartRequest}
   * @returns {@link M2MClientsSecretsRotateStartResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  rotateStart(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/m2m/clients/${data.client_id}/secrets/rotate/start`,
      data: {}
    });
  }
  /**
   * Cancel the rotation of an M2M client secret started with the
   * [Start Secret Rotation Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret-start)
   * [Start Secret Rotation Endpoint](https://stytch.com/docs/api/m2m-rotate-secret-start).
   * After this endpoint is called, the client's `next_client_secret` is discarded and only the original
   * `client_secret` will be valid.
   * @param data {@link M2MClientsSecretsRotateCancelRequest}
   * @returns {@link M2MClientsSecretsRotateCancelResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  rotateCancel(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/m2m/clients/${data.client_id}/secrets/rotate/cancel`,
      data: {}
    });
  }
  /**
   * Complete the rotation of an M2M client secret started with the
   * [Start Secret Rotation Endpoint](https://stytch.com/docs/b2b/api/m2m-rotate-secret-start)
   * [Start Secret Rotation Endpoint](https://stytch.com/docs/api/m2m-rotate-secret-start).
   * After this endpoint is called, the client's `next_client_secret` becomes its `client_secret` and the
   * previous `client_secret` will no longer be valid.
   * @param data {@link M2MClientsSecretsRotateRequest}
   * @returns {@link M2MClientsSecretsRotateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  rotate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/m2m/clients/${data.client_id}/secrets/rotate`,
      data: {}
    });
  }

}

exports.Secrets = Secrets;