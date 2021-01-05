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

const stytch = new Stytch("PROJECT_ID", "SECRET", "ENVIRONMENT");


const loginOrCreateWithMagicLink = async () => {
  const params: Stytch.MagicLinkLoginOrCreate = {
    email: 'example@stytch.com',
  };

  const response: Stytch.LoginOrCreateResponse = await stytch.loginOrCreateWithMagicLink(params);

  console.log(response);
};

stytch.MagicLinks.authenticateMagicLink(token, authenticateMagicLinkBody, function(error, response, context) {
	console.log(response)
});

const AuthenticateMagicLink = async () => {
  const params: Stytch.MagicLinkAuthenticate = {
    token: 'token from url',
  };

  const response: Stytch.MagicLinkAuthenticateResponse = await stytch.authenticateMagicLink(params);

  console.log(response);
};


loginOrCreateWithMagicLink();
authenticateMagicLink();
```