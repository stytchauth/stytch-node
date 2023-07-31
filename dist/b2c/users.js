"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = exports.UserSearchIterator = void 0;

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
// ENDMANUAL(SearchUsersQueryOperand)
// MANUAL(UserSearchIterator)(FREE_FUNCTION)
var mode;

(function (mode) {
  mode[mode["pending"] = 0] = "pending";
  mode[mode["inProgress"] = 1] = "inProgress";
  mode[mode["complete"] = 2] = "complete";
})(mode || (mode = {}));

class UserSearchIterator {
  constructor(client, data) {
    this.client = client;
    this.data = data;
    this.mode = mode.pending;
  }

  async next() {
    const res = await this.client.search(this.data);
    this.data = { ...this.data,
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

} // ENDMANUAL(UserSearchIterator)


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
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/users`,
      data
    });
  }
  /**
   * Get information about a specific User.
   * @param data {@link UsersGetRequest}
   * @returns {@link UsersGetResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  get(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/users/${params.user_id}`,
      params: {}
    });
  }
  /**
   * Search for Users within your Stytch Project. Submit an empty `query` in the request to return all Users.
   * @param data {@link UsersSearchRequest}
   * @returns {@link UsersSearchResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  search(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/users/search`,
      data
    });
  }
  /**
   * Update a User's attributes.
   *
   * **Note:** In order to add a new email address or phone number to an existing User object, pass the new
   * email address or phone number into the respective `/send` endpoint for the authentication method of your
   * choice. If you specify the existing User's `user_id` while calling the `/send` endpoint, the new email
   * address or phone number will be added to the existing User object upon successful authentication. We
   * require this process to guard against an account takeover vulnerability.
   * @param data {@link UsersUpdateRequest}
   * @returns {@link UsersUpdateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  update(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `/v1/users/${data.user_id}`,
      data: {
        name: data.name,
        attributes: data.attributes,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/${data.user_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/emails/${data.email_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/phone_numbers/${data.phone_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/webauthn_registrations/${data.webauthn_registration_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/biometric_registrations/${data.biometric_registration_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/totps/${data.totp_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/crypto_wallets/${data.crypto_wallet_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/passwords/${data.password_id}`,
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
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/oauth/${data.oauth_user_registration_id}`,
      data: {}
    });
  } // MANUAL(searchAll)(SERVICE_METHOD)
  // Return an iterator over all search results.  Submit an empty `query` in the request to return all Users.


  searchAll(data) {
    return new UserSearchIterator(this, data);
  } // ENDMANUAL(searchAll)


}

exports.Users = Users;