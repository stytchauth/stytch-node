# stytch-node

The Stytch Node library provides support for the Stytch API for server-side Javscript applications. You can find out more about the Stytch API at 
[docs.stytch.com](https://docs.stytch.com).

If you're looking for frontend support for our Javascript SDK, check out [stytch-js](https://www.npmjs.com/package/@stytch/stytch-js).

## Quickstart
Install stytch
```
npm install stytch
```

Example `login_or_create` usage

```javascript
import Stytch from 'stytch';

const stytchClient = new Stytch.Client({
  project_id: "PROJECT_ID",
  secret: "SECRET", 
  env: Stytch.envs.test
});


const loginOrCreateWithMagicLink = async () => {
  const params: Stytch.loginOrCreateRequest = {
    email: 'sandbox@stytch.com',
    login_magic_link_url: 'https://www.stytch.com/login',
    signup_magic_link_url: 'https://www.stytch.com/signup',
  };

  const response: Stytch.loginOrCreateResponse = await stytchClient.loginOrCreate(params);

  console.log(response);
};

const authenticateMagicLink = async (token) => {
  const response = Stytch.authenticateMagicLinkResponse = await stytchClient.authenticateMagicLink(token);

  console.log(response);
};


loginOrCreateWithMagicLink().then().catch(err => console.log(err));
authenticateMagicLink().then().catch(err => console.log(err));
```