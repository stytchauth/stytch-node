# stytch-node

The Stytch Node library provides support for the Stytch API for server-side Javscript applications. You can find out more about the Stytch API at 
[stytch.com/docs](https://stytch.com/docs).

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


const magicLinksEmailLoginOrCreate = async () => {
  const params: Stytch.magicLinksEmailLoginOrCreateRequest = {
    email: 'sandbox@stytch.com',
    login_magic_link_url: 'https://www.stytch.com/login',
    signup_magic_link_url: 'https://www.stytch.com/signup',
  };

  const response: Stytch.magicLinksEmailLoginOrCreateResponse = await stytchClient.magicLinksEmailLoginOrCreate(params);

  console.log(response);
};

const magicLinksAuthenticate = async (token) => {
  const params: Stytch.magicLinksEmailLoginOrCreateRequest = {
    token: token,
  };

  const response: Stytch.magicLinksAuthenticateResponse = await stytchClient.magicLinksAuthenticate(params);

  console.log(response);
};


magicLinksEmailLoginOrCreate().then().catch(err => console.log(err));
magicLinksAuthenticate('token from email').then().catch(err => console.log(err));
```