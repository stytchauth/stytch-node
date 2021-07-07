# stytch-node

The Stytch Node library provides support for the Stytch API for server-side Javscript
applications. You can find out more about the Stytch API at
[stytch.com/docs](https://stytch.com/docs).

If you're looking for frontend support for our Javascript SDK, check out
[stytch-js](https://www.npmjs.com/package/@stytch/stytch-js).

## Quickstart

Install stytch
```
npm install stytch
```

Run `login_or_create` to send a magic link by email:

```javascript
import * as stytch from "stytch";
// Or as a CommonJS module:
// const stytch = require("stytch");

const client = new stytch.Client({
  project_id: "PROJECT_ID",
  secret: "SECRET",
  env: stytch.envs.test,
});

client.magicLinks.email
  .loginOrCreate({
    email: "sandbox@stytch.com",
    login_magic_link_url: "http://localhost:8000/login",
    signup_magic_link_url: "http://localhost:8000/signup",
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

client.magicLinks
  .authenticate("TOKEN FROM EMAIL")
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
```

## Documentation

You can find all the documentation at https://stytch.com/docs, including an
[API reference](https://stytch.com/docs/api) with example usage for every endpoint.  We also
maintain a set of [example apps](https://stytch.com/docs/example-apps) to start development from.
