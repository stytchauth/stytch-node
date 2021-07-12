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

Create an API client:
```javascript
import * as stytch from "stytch";
// Or as a CommonJS module:
// const stytch = require("stytch");

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
    login_magic_link_url: "https://www.stytch.com/login",
    signup_magic_link_url: "https://www.stytch.com/signup",
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
