# Getting started

This is the Stytch api.  You can find out more about Stytch at 
[stytch.com](https://stytch.com).

## Quickstart
First install stytch.
```
npm install stytch
```

Example usage.

```javascript
const stytch = require('stytch');

// Configuration parameters and credentials
stytch.Configuration.projectID = "PROJECT_ID"; 
stytch.Configuration.secret = "SECRET"; 
var email = "something@stytch.com";
var userCreateBody = new stytch.UserCreate({"email" : email});

stytch.Users.createUser(userCreateBody, function(error, response, context) {

	console.log(response);
});

var magicLinkSendBody = new stytch.MagicLinkSendByEmail({
	"email": email,
	"magic_link_url": "https://stytch.com",
	"expiration_minutes": 5,
	"attributes": {
		"ip_address": "10.0.0.0"
	}
});

stytch.MagicLinks.createSendEmailMagicLink(magicLinkSendBody, function(error, response, context) {
	console.log(response);
});

var token = 'grab token from url';
var magicLinkAuthBody = new stytch.MagicLinkAuthenticate({
	"attributes": {
		"ip_address": "10.0.0.0"
	}
});

stytch.MagicLinks.postUserMagicLinkAuthenticate(token, magicLinkAuthBody, function(error, response, context) {
	console.log(response)
});

```

## How to Build

The generated SDK relies on [Node Package Manager](https://www.npmjs.com/) (NPM) being available to resolve dependencies. If you don't already have NPM installed, please go ahead and follow instructions to install NPM from [here](https://nodejs.org/en/download/).
The SDK also requires Node to be installed. If Node isn't already installed, please install it from [here](https://nodejs.org/en/download/)
> NPM is installed by default when Node is installed

To check if node and npm have been successfully installed, write the following commands in command prompt:

* `node --version`
* `npm -version`

![Version Check](https://apidocs.io/illustration/nodejs?step=versionCheck&workspaceFolder=Stytch-Node)

Now use npm to resolve all dependencies by running the following command in the root directory (of the SDK folder):

```bash
npm install
```

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency1&workspaceFolder=Stytch-Node)

![Resolve Dependencies](https://apidocs.io/illustration/nodejs?step=resolveDependency2)

This will install all dependencies in the `node_modules` folder.

Once dependencies are resolved, you will need to move the folder `Stytch` in to your `node_modules` folder.

## How to Use

The following section explains how to use the library in a new project.

### 1. Open Project Folder
Open an IDE/Text Editor for JavaScript like Sublime Text. The basic workflow presented here is also applicable if you prefer using a different editor or IDE.

Click on `File` and select `Open Folder`.

![Open Folder](https://apidocs.io/illustration/nodejs?step=openFolder)

Select the folder of your SDK and click on `Select Folder` to open it up in Sublime Text. The folder will become visible in the bar on the left.

![Open Project](https://apidocs.io/illustration/nodejs?step=openProject&workspaceFolder=Stytch-Node)

### 2. Creating a Test File

Now right click on the folder name and select the `New File` option to create a new test file. Save it as `index.js` Now import the generated NodeJS library using the following lines of code:

```js
var lib = require('lib');
```

Save changes.

![Create new file](https://apidocs.io/illustration/nodejs?step=createNewFile&workspaceFolder=Stytch-Node)

![Save new file](https://apidocs.io/illustration/nodejs?step=saveNewFile&workspaceFolder=Stytch-Node)

### 3. Running The Test File

To run the `index.js` file, open up the command prompt and navigate to the Path where the SDK folder resides. Type the following command to run the file:

```
node index.js
```

![Run file](https://apidocs.io/illustration/nodejs?step=runProject&workspaceFolder=Stytch-Node)


## How to Test

These tests use Mocha framework for testing, coupled with Chai for assertions. These dependencies need to be installed for tests to run.
Tests can be run in a number of ways:

### Method 1 (Run all tests)

1. Navigate to the root directory of the SDK folder from command prompt.
2. Type `mocha --recursive` to run all the tests.

### Method 2 (Run all tests)

1. Navigate to the `../test/Controllers/` directory from command prompt.
2. Type `mocha *` to run all the tests.

### Method 3 (Run specific controller's tests)

1. Navigate to the `../test/Controllers/` directory from command prompt.
2. Type `mocha  StytchController`  to run all the tests in that controller file.

> To increase mocha's default timeout, you can change the `TEST_TIMEOUT` parameter's value in `TestBootstrap.js`.

![Run Tests](https://apidocs.io/illustration/nodejs?step=runTests&controllerName=StytchController)

## Initialization

### Authentication
In order to setup authentication in the API client, you need the following information.

| Parameter | Description |
|-----------|-------------|
| basicAuthUserName | The username to use with basic authentication |
| basicAuthPassword | The password to use with basic authentication |



API client can be initialized as following:

```JavaScript
const lib = require('lib');

// Configuration parameters and credentials
lib.Configuration.basicAuthUserName = "basicAuthUserName"; // The username to use with basic authentication
lib.Configuration.basicAuthPassword = "basicAuthPassword"; // The password to use with basic authentication

```



# Class Reference

## <a name="list_of_controllers"></a>List of Controllers

* [UsersController](#users_controller)
* [MagicLinksController](#magic_links_controller)
* [EmailsController](#emails_controller)

## <a name="users_controller"></a>![Class: ](https://apidocs.io/img/class.png ".UsersController") UsersController

### Get singleton instance

The singleton instance of the ``` UsersController ``` class can be accessed from the API Client.

```javascript
var controller = lib.UsersController;
```

### <a name="create_user"></a>![Method: ](https://apidocs.io/img/method.png ".UsersController.createUser") createUser

> Add a user to Stytch. A user_id is returned in the response that can then be used to perform other operations within Stytch.


```javascript
function createUser(body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | Created user object |



#### Example Usage

```javascript

    var body = new UserCreate({"key":"value"});

    controller.createUser(body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="get_user_by_id"></a>![Method: ](https://apidocs.io/img/method.png ".UsersController.getUserByID") getUserByID

> Fetch a given user to see what their various attributes are.


```javascript
function getUserByID(userId, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| userId |  ``` Required ```  | The user_id for the user to fetch. |



#### Example Usage

```javascript

    var userId = user-test-b8797f2c-a93c-11ea-bb37-0242ac130002;

    controller.getUserByID(userId, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="update_user"></a>![Method: ](https://apidocs.io/img/method.png ".UsersController.updateUser") updateUser

> Update a user's attributes. For example, you can add additional emails or change the user's primary email.


```javascript
function updateUser(userId, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| userId |  ``` Required ```  | The user_id to update. |
| body |  ``` Required ```  | Updated user object |



#### Example Usage

```javascript

    var userId = user_id;
    var body = new UserUpdate({"key":"value"});

    controller.updateUser(userId, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="delete_user"></a>![Method: ](https://apidocs.io/img/method.png ".UsersController.deleteUser") deleteUser

> Remove a user from Stytch.


```javascript
function deleteUser(userId, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| userId |  ``` Required ```  | The user_id to be deleted. |



#### Example Usage

```javascript

    var userId = user-test-b8797f2c-a93c-11ea-bb37-0242ac130002;

    controller.deleteUser(userId, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




[Back to List of Controllers](#list_of_controllers)

## <a name="magic_links_controller"></a>![Class: ](https://apidocs.io/img/class.png ".MagicLinksController") MagicLinksController

### Get singleton instance

The singleton instance of the ``` MagicLinksController ``` class can be accessed from the API Client.

```javascript
var controller = lib.MagicLinksController;
```

### <a name="create_send_magic_link"></a>![Method: ](https://apidocs.io/img/method.png ".MagicLinksController.createSendMagicLink") createSendMagicLink

> Send a magic link to the user. You can optionally include additional security measures such as requiring the ip address the link is requested from match the one it's clicked from.


```javascript
function createSendMagicLink(body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var body = new MagicLinkSend({"key":"value"});

    controller.createSendMagicLink(body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="create_send_email_magic_link"></a>![Method: ](https://apidocs.io/img/method.png ".MagicLinksController.createSendEmailMagicLink") createSendEmailMagicLink

> Send a magic link to the user. You can optionally include additional security measures such as requiring the ip address the link is requested from match the one it's clicked from.


```javascript
function createSendEmailMagicLink(body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| body |  ``` Required ```  | TODO: Add a parameter description |



#### Example Usage

```javascript

    var body = new MagicLinkSendByEmail({"key":"value"});

    controller.createSendEmailMagicLink(body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="post_user_magic_link_authenticate"></a>![Method: ](https://apidocs.io/img/method.png ".MagicLinksController.postUserMagicLinkAuthenticate") postUserMagicLinkAuthenticate

> Authenticate a user given a magic link. This endpoint verifies that the link is valid, hasn't expired, and any optional security settings such as ip match or user agent match are satisfied. Not to be confused with the emails verify endpoint meant for initial, one time verification that the correct email was supplied during sign up.


```javascript
function postUserMagicLinkAuthenticate(token, body, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| token |  ``` Required ```  | TODO: Add a parameter description |
| body |  ``` Required ```  | Magic link object |



#### Example Usage

```javascript

    var token = 'token';
    var body = new MagicLinkAuthenticate({"key":"value"});

    controller.postUserMagicLinkAuthenticate(token, body, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




[Back to List of Controllers](#list_of_controllers)

## <a name="emails_controller"></a>![Class: ](https://apidocs.io/img/class.png ".EmailsController") EmailsController

### Get singleton instance

The singleton instance of the ``` EmailsController ``` class can be accessed from the API Client.

```javascript
var controller = lib.EmailsController;
```

### <a name="delete_email"></a>![Method: ](https://apidocs.io/img/method.png ".EmailsController.deleteEmail") deleteEmail

> Remove an email from a given user.


```javascript
function deleteEmail(emailId, userId, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| emailId |  ``` Required ```  | The email_id to be deleted. |
| userId |  ``` Required ```  | The user_id to delete an email from. |



#### Example Usage

```javascript

    var emailId = email-test-c1a1d554-a93c-11ea-bb37-0242ac130002;
    var userId = user-test-b8797f2c-a93c-11ea-bb37-0242ac130002;

    controller.deleteEmail(emailId, userId, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="create_send_email_verification"></a>![Method: ](https://apidocs.io/img/method.png ".EmailsController.createSendEmailVerification") createSendEmailVerification

> Prompt for a verification email to be sent to the user to confirm the correct email was entered. The email must be verified before the user needs to login next.


```javascript
function createSendEmailVerification(userId, emailId, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| userId |  ``` Required ```  | The user_id for the user to fetch. |
| emailId |  ``` Required ```  | The email_id for the given user to verify. |



#### Example Usage

```javascript

    var userId = user-test-b8797f2c-a93c-11ea-bb37-0242ac130002;
    var emailId = email-test-c1a1d554-a93c-11ea-bb37-0242ac130002;

    controller.createSendEmailVerification(userId, emailId, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




### <a name="create_verify_email"></a>![Method: ](https://apidocs.io/img/method.png ".EmailsController.createVerifyEmail") createVerifyEmail

> Verify that a user supplied the correct email during signup.


```javascript
function createVerifyEmail(token, callback)
```
#### Parameters

| Parameter | Tags | Description |
|-----------|------|-------------|
| token |  ``` Required ```  | The token used to verify user's email. |



#### Example Usage

```javascript

    var token = 'KKFa7u0KgAgHGXkZ77gOEd8YjyzzcC1rvMINgsZuIxM';

    controller.createVerifyEmail(token, function(error, response, context) {

    
    });
```

#### Errors

| Error Code | Error Description |
|------------|-------------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 429 | Too many requests |
| 500 | Internal server error |




[Back to List of Controllers](#list_of_controllers)



