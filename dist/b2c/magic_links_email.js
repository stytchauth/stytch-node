"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Email = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

// Request type for `magicLinks.email.invite`.

// Response type for `magicLinks.email.invite`.

// Request type for `magicLinks.email.loginOrCreate`.

// Response type for `magicLinks.email.loginOrCreate`.

// Request type for `magicLinks.email.revokeInvite`.

// Response type for `magicLinks.email.revokeInvite`.

// Request type for `magicLinks.email.send`.

// Response type for `magicLinks.email.send`.

class Email {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Send a magic link to an existing Stytch user using their email address. If you'd like to create a user
   * and send them a magic link by email with one request, use our
   * [log in or create endpoint](https://stytch.com/docs/api/log-in-or-create-user-by-email).
   *
   * ### Add an email to an existing user
   * This endpoint also allows you to add a new email address to an existing Stytch User. Including a
   * `user_id`, `session_token`, or `session_jwt` in your Send Magic Link by email request will add the new,
   * unverified email address to the existing Stytch User. If the user successfully authenticates within 5
   * minutes, the new email address will be marked as verified and remain permanently on the existing Stytch
   * User. Otherwise, it will be removed from the User object, and any subsequent login requests using that
   * email address will create a new User.
   *
   * ### Next steps
   * The user is emailed a magic link which redirects them to the provided
   * [redirect URL](https://stytch.com/docs/guides/magic-links/email-magic-links/redirect-routing). Collect
   * the `token` from the URL query parameters, and call
   * [Authenticate magic link](https://stytch.com/docs/api/authenticate-magic-link) to complete
   * authentication.
   * @param data {@link MagicLinksEmailSendRequest}
   * @returns {@link MagicLinksEmailSendResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  send(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/magic_links/email/send`,
      headers,
      data
    });
  }

  /**
   * Send either a login or signup Magic Link to the User based on if the email is associated with a User
   * already. A new or pending User will receive a signup Magic Link. An active User will receive a login
   * Magic Link. For more information on how to control the status your Users are created in see the
   * `create_user_as_pending` flag.
   *
   * ### Next steps
   * The User is emailed a Magic Link which redirects them to the provided
   * [redirect URL](https://stytch.com/docs/guides/magic-links/email-magic-links/redirect-routing). Collect
   * the `token` from the URL query parameters and call
   * [Authenticate Magic Link](https://stytch.com/docs/api/authenticate-magic-link) to complete
   * authentication.
   * @param data {@link MagicLinksEmailLoginOrCreateRequest}
   * @returns {@link MagicLinksEmailLoginOrCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  loginOrCreate(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/magic_links/email/login_or_create`,
      headers,
      data
    });
  }

  /**
   * Create a User and send an invite Magic Link to the provided `email`. The User will be created with a
   * `pending` status until they click the Magic Link in the invite email.
   *
   * ### Next steps
   * The User is emailed a Magic Link which redirects them to the provided
   * [redirect URL](https://stytch.com/docs/guides/magic-links/email-magic-links/redirect-routing). Collect
   * the `token` from the URL query parameters and call
   * [Authenticate Magic Link](https://stytch.com/docs/api/authenticate-magic-link) to complete
   * authentication.
   * @param data {@link MagicLinksEmailInviteRequest}
   * @returns {@link MagicLinksEmailInviteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  invite(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/magic_links/email/invite`,
      headers,
      data
    });
  }

  /**
   * Revoke a pending invite based on the `email` provided.
   * @param data {@link MagicLinksEmailRevokeInviteRequest}
   * @returns {@link MagicLinksEmailRevokeInviteResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  revokeInvite(data) {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/magic_links/email/revoke_invite`,
      headers,
      data
    });
  }
}
exports.Email = Email;