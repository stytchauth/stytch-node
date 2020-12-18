# stytch-node

The Stytch Node library provides support for the Stytch API for server-side Javscript applications. You can find out more about the Stytch API at 
[docs.stytch.com](https://docs.stytch.com).

If you're looking for frontend support for our Javascript SDK, check out [stytch-js](https://www.npmjs.com/package/@stytch/stytch-js).

## Quickstart
Install stytch
```
npm install stytch
```

Example usage

```javascript
const stytch = require('stytch');

// Configuration parameters and credentials
stytch.Configuration.projectID = "PROJECT_ID"; 
stytch.Configuration.secret = "SECRET"; 
var email = "something@stytch.com";
var createUserBody = new stytch.UserCreate({"email": email});

stytch.Users.createUser(createUserBody, function(error, response, context) {

	console.log(response);
});

var sendMagicLinkBody = new stytch.MagicLinkSendByEmail({
	"email": email,
	"magic_link_url": "https://stytch.com",
	"expiration_minutes": 5,
	"attributes": {
		"ip_address": "10.0.0.0"
	}
});

stytch.MagicLinks.sendEmailMagicLink(sendMagicLinkBody, function(error, response, context) {
	console.log(response);
});

var token = 'grab token from url';
var authenticateMagicLinkBody = new stytch.MagicLinkAuthenticate({
	"attributes": {
		"ip_address": "10.0.0.0"
	}
});

stytch.MagicLinks.authenticateMagicLink(token, authenticateMagicLinkBody, function(error, response, context) {
	console.log(response)
});

```
