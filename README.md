# Stytch Node.js Library

The Stytch Node library makes it easy to use the Stytch user infrastructure API in server-side JavaScript applications.

It pairs well with the Stytch [Web SDK](https://www.npmjs.com/package/@stytch/stytch-js) or your own custom authentication flow.

This library is tested with all current LTS versions of Node - **18**, and **20**.

## Install

```
npm install stytch
# or
yarn add stytch
```

## Usage

You can find your API credentials in the [Stytch Dashboard](https://stytch.com/dashboard/api-keys).

This client library supports all of Stytch's live products:

**B2C**

- [x] [Email Magic Links](https://stytch.com/docs/api/send-by-email)
- [x] [Embeddable Magic Links](https://stytch.com/docs/api/create-magic-link)
- [x] [OAuth logins](https://stytch.com/docs/api/oauth-google-start)
- [x] [SMS passcodes](https://stytch.com/docs/api/send-otp-by-sms)
- [x] [WhatsApp passcodes](https://stytch.com/docs/api/whatsapp-send)
- [x] [Email passcodes](https://stytch.com/docs/api/send-otp-by-email)
- [x] [Session Management](https://stytch.com/docs/api/session-auth)
- [x] [WebAuthn](https://stytch.com/docs/api/webauthn-register-start)
- [x] [User Management](https://stytch.com/docs/api/create-user)
- [x] [Time-based one-time passcodes (TOTPs)](https://stytch.com/docs/api/totp-create)
- [x] [Crypto wallets](https://stytch.com/docs/api/crypto-wallet-authenticate-start)
- [x] [Passwords](https://stytch.com/docs/api/password-create)

**B2B**

- [x] [Organizations](https://stytch.com/docs/b2b/api/organization-object)
- [x] [Members](https://stytch.com/docs/b2b/api/member-object)
- [x] [Email Magic Links](https://stytch.com/docs/b2b/api/send-login-signup-email)
- [x] [OAuth logins](https://stytch.com/docs/b2b/api/oauth-google-start)
- [x] [Session Management](https://stytch.com/docs/b2b/api/session-object)
- [x] [Single-Sign On](https://stytch.com/docs/b2b/api/sso-authenticate-start)
- [x] [Discovery](https://stytch.com/docs/b2b/api/discovered-organization-object)
- [x] [Passwords](https://stytch.com/docs/b2b/api/passwords-authenticate)

**Shared**

- [x] [M2M](https://stytch.com/docs/api/m2m-client)

### Example B2C usage

Create an API client:

```javascript
const stytch = require("stytch");
// Or as an ES6 module:
// import * as stytch from "stytch";

const client = new stytch.Client({
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
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
  .authenticate({ token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=" })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

### Example B2B usage

Create an API client:

```javascript
const stytch = require("stytch");
// Or as an ES6 module:
// import * as stytch from "stytch";

const client = new stytch.B2BClient({
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
});
```

Create an organization

```javascript
client.organizations
  .create({
    organization_name: "Acme Co",
    organization_slug: "acme-co",
    email_allowed_domains: ["acme.co"],
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

Log the first user into the organization

```javascript
client.magicLinks.loginOrSignup({
  organization_id: "organization-id-from-create-response-..."
  email_address: "admin@acme.co"
})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

## TypeScript support

This package includes TypeScript declarations for the Stytch API.

Request and response types will always follow the format `$Vertical$Product$Method(Request|Response)` -
for example the `B2BMagicLinksAuthenticateRequest` maps to the B2B
[Authenticate Magic Link](https://stytch.com/docs/b2b/api/authenticate-magic-link) endpoint, while the
`B2CMagicLinksAuthenticateRequest` maps to the B2C [Authenticate Magic Link](https://stytch.com/docs/api/authenticate-magic-link) endpoint.

## Handling Errors

Stytch errors always include an `error_type` field you can use to identify them:

```javascript
client.magicLinks
  .authenticate({ token: "not-a-token!" })
  .then((res) => console.log(res))
  .catch((err) => {
    if (err.error_type === "invalid_token") {
      console.log("Whoops! Try again?");
    }
  });
```

Learn more about errors in the [docs](https://stytch.com/docs/api/errors).

## Customizing the HTTPS Agent

The Stytch client uses [undici](https://github.com/nodejs/undici), the Node fetch implementation. You can pass a custom undici `Dispatcher` to the client for use in requests.
For example, you can enable HTTPS Keep-Alive to avoid the cost of establishing a new connection with the Stytch servers on every request.

```javascript
const dispatcher = new undici.Agent({
  keepAliveTimeout: 6e6, // 10 minutes in MS
  keepAliveMaxTimeout: 6e6, // 10 minutes in MS
});

const client = new stytch.Client({
  project_id: "project-live-c60c0abe-c25a-4472-a9ed-320c6667d317",
  secret: "secret-live-80JASucyk7z_G8Z-7dVwZVGXL5NT_qGAQ2I=",
  dispatcher,
});
```

## Documentation

See example requests and responses for all the endpoints in the [Stytch API Reference](https://stytch.com/docs/api).

Follow one of the [integration guides](https://stytch.com/docs/guides) or start with one of our [example apps](https://stytch.com/docs/example-apps).

## Support

If you've found a bug, [open an issue](https://github.com/stytchauth/stytch-node/issues/new)!

If you have questions or want help troubleshooting, join us in [Slack](https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg) or email support@stytch.com.

If you've found a security vulnerability, please follow our [responsible disclosure instructions](https://stytch.com/docs/resources/security-and-trust/security#:~:text=Responsible%20disclosure%20program).

## Development

See [DEVELOPMENT.md](DEVELOPMENT.md)

## Code of Conduct

Everyone interacting in the Stytch project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](CODE_OF_CONDUCT.md).
