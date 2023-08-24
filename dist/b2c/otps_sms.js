"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sms = void 0;

var _shared = require("../shared");

// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!
class Sms {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }
  /**
   * Send a one-time passcode (OTP) to a user's phone number. If you'd like to create a user and send them a
   * passcode with one request, use our
   * [log in or create](https://stytch.com/docs/api/log-in-or-create-user-by-sms) endpoint.
   *
   * Note that sending another OTP code before the first has expired will invalidate the first code.
   *
   * ### Cost to send SMS OTP
   * Before configuring SMS or WhatsApp OTPs, please review how Stytch
   * [bills the costs of international OTPs](https://stytch.com/pricing) and understand how to protect your
   * app against [toll fraud](https://stytch.com/docs/guides/passcodes/toll-fraud/overview).
   *
   * ### Add a phone number to an existing user
   *
   * This endpoint also allows you to add a new phone number to an existing Stytch User. Including a
   * `user_id`, `session_token`, or `session_jwt` in the request will add the phone number to the
   * pre-existing Stytch User upon successful authentication.
   *
   * Adding a new phone number to an existing Stytch User requires the user to be present and validate the
   * phone number via OTP. This requirement is in place to prevent account takeover attacks.
   *
   * ### Next steps
   *
   * Collect the OTP which was delivered to the user. Call
   * [Authenticate OTP](https://stytch.com/docs/api/authenticate-otp) using the OTP `code` along with the
   * `phone_id` found in the response as the `method_id`.
   * @param data {@link OTPsSmsSendRequest}
   * @returns {@link OTPsSmsSendResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  send(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/otps/sms/send`,
      data
    });
  }
  /**
   * Send a One-Time Passcode (OTP) to a User using their phone number. If the phone number is not associated
   * with a user already, a user will be created.
   *
   * ### Cost to send SMS OTP
   * Before configuring SMS or WhatsApp OTPs, please review how Stytch
   * [bills the costs of international OTPs](https://stytch.com/pricing) and understand how to protect your
   * app against [toll fraud](https://stytch.com/docs/guides/passcodes/toll-fraud/overview).
   * ### Next steps
   *
   * Collect the OTP which was delivered to the User. Call
   * [Authenticate OTP](https://stytch.com/docs/api/authenticate-otp) using the OTP `code` along with the
   * `phone_id` found in the response as the `method_id`.
   * @param data {@link OTPsSmsLoginOrCreateRequest}
   * @returns {@link OTPsSmsLoginOrCreateResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */


  loginOrCreate(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `/v1/otps/sms/login_or_create`,
      data
    });
  }

}

exports.Sms = Sms;