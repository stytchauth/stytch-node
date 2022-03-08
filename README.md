# Stytch Node.js Library

The Stytch Node library makes it easy to use the Stytch user infrastructure API in server-side JavaScript applications.

It pairs well with the Stytch [Web SDK](https://www.npmjs.com/package/@stytch/stytch-js) or your own custom authentication flow.

## Install

```
npm install stytch
# or
yarn add stytch
```

## Usage

You can find your API credentials in the [Stytch Dashboard](https://stytch.com/dashboard/api-keys).

This client library supports all of Stytch's live products:
  - [x] [Email Magic Links](https://stytch.com/docs/api/send-by-email)
  - [x] [Embeddable Magic Links](https://stytch.com/docs/api/create-magic-link-overview)
  - [x] [OAuth logins](https://stytch.com/docs/api/oauth-overview)
  - [x] [SMS passcodes](https://stytch.com/docs/api/send-otp-by-sms)
  - [x] [WhatsApp passcodes](https://stytch.com/docs/api/whatsapp-send)
  - [x] [Email passcodes](https://stytch.com/docs/api/send-otp-by-email)
  - [x] [Session Management](https://stytch.com/docs/api/sessions-overview)
  - [x] [WebAuthn (Beta)](https://stytch.com/docs/api/webauthn-overview)
  - [x] [User Management (Beta)](https://stytch.com/docs/api/users)
  - [x] [Time-based one-time passcodes (TOTPs) (Beta)](https://stytch.com/docs/api/totps-overview)
  - [x] [Crypto wallets (Beta)](https://stytch.com/docs/api/crypto-wallet-overview)

### Example usage
Create an API client:
```javascript
const stytch = require("stytch");
// Or as an ES6 module:
// import * as stytch from "stytch";

const client = new stytch.Client({
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
  env: stytch.envs.test,
});
```

Send a magic link by email:
```javascript
client.magicLinks.email
  .loginOrCreate({
    email: "sandbox@stytch.com",
    login_magic_link_url: "https://example.com/authenticate",
    signup_magic_link_url: "https://example.com/authenticate",
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

Authenticate the token from the magic link:
```javascript
client.magicLinks
  .authenticate("DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=")
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

## Handling Errors

Stytch errors always include an `error_type` field you can use to identify them:
```javascript
client.magicLinks
  .authenticate("not-a-token!")
  .then((res) => console.log(res))
  .catch((err) => {
    if (err.error_type === "invalid_token") {
      console.log("Whoops! Try again?");
    }
  });
```
Learn more about errors in the [docs](https://stytch.com/docs/api/errors).

## Documentation

See example requests and responses for all the endpoints in the [Stytch API Reference](https://stytch.com/docs/api).

Follow one of the [integration guides](https://stytch.com/docs/guides) or start with one of our [example apps](https://stytch.com/docs/example-apps).

## Support

If you've found a bug, [open an issue](https://github.com/stytchauth/stytch-node/issues/new)!

If you have questions or want help troubleshooting, join us in [Slack](https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg) or email support@stytch.com.

If you've found a security vulnerability, please follow our [responsible disclosure instructions](https://stytch.com/docs/security).

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md)

## Code of Conduct

Everyone interacting in the Stytch project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).
