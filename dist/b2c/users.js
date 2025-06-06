"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = exports.UserSearchIterator = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
// Request type for `users.connectedApps`.
// Response type for `users.connectedApps`.
// Request type for `users.create`.
// Response type for `users.create`.
// Request type for `users.deleteBiometricRegistration`.
// Response type for `users.deleteBiometricRegistration`.
// Request type for `users.deleteCryptoWallet`.
// Response type for `users.deleteCryptoWallet`.
// Request type for `users.deleteEmail`.
// Response type for `users.deleteEmail`.
// Request type for `users.deleteOAuthRegistration`.
// Response type for `users.deleteOAuthRegistration`.
// Request type for `users.deletePassword`.
// Response type for `users.deletePassword`.
// Request type for `users.deletePhoneNumber`.
// Response type for `users.deletePhoneNumber`.
// Request type for `users.delete`.
// Response type for `users.delete`.
// Request type for `users.deleteTOTP`.
// Response type for `users.deleteTOTP`.
// Request type for `users.deleteWebAuthnRegistration`.
// Response type for `users.deleteWebAuthnRegistration`.
// Request type for `users.exchangePrimaryFactor`.
// Response type for `users.exchangePrimaryFactor`.
// Request type for `users.get`.
// Response type for `users.get`.
// Request type for `users.revoke`.
// Response type for `users.revoke`.
// Request type for `users.search`.
// Response type for `users.search`.
// Request type for `users.update`.
// Response type for `users.update`.
// MANUAL(SearchUsersQueryOperand)(TYPES)
// ENDMANUAL(SearchUsersQueryOperand)
// MANUAL(UserSearchIterator)(FREE_FUNCTION)
var mode = /*#__PURE__*/function (mode) {
  mode[mode["pending"] = 0] = "pending";
  mode[mode["inProgress"] = 1] = "inProgress";
  mode[mode["complete"] = 2] = "complete";
  return mode;
}(mode || {});
class UserSearchIterator {
  constructor(client, data) {
    this.client = client;
    this.data = data;
    this.mode = mode.pending;
  }
  async next() {
    const res = await this.client.search(this.data);
    this.data = {
      ...this.data,
      cursor: res.results_metadata.next_cursor
    };
    if (!this.data.cursor) {
      this.mode = mode.complete;
    } else {
      this.mode = mode.inProgress;
    }
    return res.results;
  }
  hasNext() {
    return this.mode !== mode.complete;
  }
  async *[Symbol.asyncIterator]() {
    while (this.hasNext()) {
      yield this.next();
    }
  }
}
// ENDMANUAL(UserSearchIterator)
exports.UserSearchIterator = UserSearchIterator;
class Users {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Add a User to Stytch. A `user_id` is returned in the response that can then be used to perform other
   * operations within Stytch. An `email` or a `phone_number` is required.
   * @param data {@link UsersCreateRequest}
   * @returns {@link UsersCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  create(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/users`,
      headers,
      data
    });
  }

  /**
   * Get information about a specific User.
   * @param params {@link UsersGetRequest}
   * @returns {@link UsersGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  get(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/users/${params.user_id}`,
      headers,
      params: {}
    });
  }

  /**
   * Search for Users within your Stytch Project.
   *
   * Use the `query` object to filter by different fields. See the `query.operands.filter_value`
   * documentation below for a list of available filters.
   *
   * ### Export all User data
   *
   * Submit an empty `query` in your Search Users request to return all of your Stytch Project's Users.
   *
   * [This Github repository](https://github.com/stytchauth/stytch-node-export-users) contains a utility that
   * leverages the Search Users endpoint to export all of your User data to a CSV or JSON file.
   * @param data {@link UsersSearchRequest}
   * @returns {@link UsersSearchResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  search(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/users/search`,
      headers,
      data
    });
  }

  /**
   * Update a User's attributes.
   *
   * **Note:** In order to add a new email address or phone number to an existing User object, pass the new
   * email address or phone number into the respective `/send` endpoint for the authentication method of your
   * choice. If you specify the existing User's `user_id` while calling the `/send` endpoint, the new,
   * unverified email address or phone number will be added to the existing User object. If the user
   * successfully authenticates within 5 minutes of the `/send` request, the new email address or phone
   * number will be marked as verified and remain permanently on the existing Stytch User. Otherwise, it will
   * be removed from the User object, and any subsequent login requests using that phone number will create a
   * new User. We require this process to guard against an account takeover vulnerability.
   * @param data {@link UsersUpdateRequest}
   * @returns {@link UsersUpdateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  update(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/users/${data.user_id}`,
      headers,
      data: {
        name: data.name,
        attributes: data.attributes,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
        external_id: data.external_id
      }
    });
  }

  /**
   * Exchange a user's email address or phone number for another.
   *
   * Must pass either an `email_address` or a `phone_number`.
   *
   * This endpoint only works if the user has exactly one factor. You are able to exchange the type of factor
   * for another as well, i.e. exchange an `email_address` for a `phone_number`.
   *
   * Use this endpoint with caution as it performs an admin level action.
   * @param data {@link UsersExchangePrimaryFactorRequest}
   * @returns {@link UsersExchangePrimaryFactorResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  exchangePrimaryFactor(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/users/${data.user_id}/exchange_primary_factor`,
      headers,
      data: {
        email_address: data.email_address,
        phone_number: data.phone_number
      }
    });
  }

  /**
   * Delete a User from Stytch.
   * @param data {@link UsersDeleteRequest}
   * @returns {@link UsersDeleteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  delete(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/${data.user_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete an email from a User.
   * @param data {@link UsersDeleteEmailRequest}
   * @returns {@link UsersDeleteEmailResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteEmail(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/emails/${data.email_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a phone number from a User.
   * @param data {@link UsersDeletePhoneNumberRequest}
   * @returns {@link UsersDeletePhoneNumberResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deletePhoneNumber(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/phone_numbers/${data.phone_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a WebAuthn registration from a User.
   * @param data {@link UsersDeleteWebAuthnRegistrationRequest}
   * @returns {@link UsersDeleteWebAuthnRegistrationResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteWebAuthnRegistration(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/webauthn_registrations/${data.webauthn_registration_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a biometric registration from a User.
   * @param data {@link UsersDeleteBiometricRegistrationRequest}
   * @returns {@link UsersDeleteBiometricRegistrationResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteBiometricRegistration(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/biometric_registrations/${data.biometric_registration_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a TOTP from a User.
   * @param data {@link UsersDeleteTOTPRequest}
   * @returns {@link UsersDeleteTOTPResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteTOTP(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/totps/${data.totp_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a crypto wallet from a User.
   * @param data {@link UsersDeleteCryptoWalletRequest}
   * @returns {@link UsersDeleteCryptoWalletResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteCryptoWallet(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/crypto_wallets/${data.crypto_wallet_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete a password from a User.
   * @param data {@link UsersDeletePasswordRequest}
   * @returns {@link UsersDeletePasswordResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deletePassword(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/passwords/${data.password_id}`,
      headers,
      data: {}
    });
  }

  /**
   * Delete an OAuth registration from a User.
   * @param data {@link UsersDeleteOAuthRegistrationRequest}
   * @returns {@link UsersDeleteOAuthRegistrationResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  deleteOAuthRegistration(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/oauth/${data.oauth_user_registration_id}`,
      headers,
      data: {}
    });
  }

  /**
   * User Get Connected Apps retrieves a list of Connected Apps with which the User has successfully
   * completed an
   * authorization flow.
   * If the User revokes a Connected App's access (e.g. via the Revoke Connected App endpoint) then the
   * Connected App will
   * no longer be returned in the response.
   * @param params {@link UsersConnectedAppsRequest}
   * @returns {@link UsersConnectedAppsResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  connectedApps(params) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/users/${params.user_id}/connected_apps`,
      headers,
      params: {}
    });
  }

  /**
   * Revoke Connected App revokes a Connected App's access to a User and revokes all active tokens that have
   * been created
   * on the User's behalf. New tokens cannot be created until the User completes a new authorization flow
   * with the
   * Connected App.
   * @param data {@link UsersRevokeRequest}
   * @returns {@link UsersRevokeResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  revoke(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/users/${data.user_id}/connected_apps/${data.connected_app_id}/revoke`,
      headers,
      data: {}
    });
  }

  // MANUAL(searchAll)(SERVICE_METHOD)
  // Return an iterator over all search results.  Submit an empty `query` in the request to return all Users.
  searchAll(data) {
    return new UserSearchIterator(this, data);
  }
  // ENDMANUAL(searchAll)
}
exports.Users = Users;