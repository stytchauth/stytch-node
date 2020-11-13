/**
  * @module Stytch
  *
  * This is the Stytch api.  You can find out more about Stytch at  [stytch.com](https://stytch.
  * com).
  */

'use strict';

const Configuration = require('./configuration');
const Users = require('./Controllers/Users');
const MagicLinks = require('./Controllers/MagicLinks');
const Emails = require('./Controllers/Emails');
const Attributes = require('./Models/Attributes');
const UserCreate = require('./Models/UserCreate');
const UserCreateResponse = require('./Models/UserCreateResponse');
const UserUpdate = require('./Models/UserUpdate');
const UserUpdateResponse = require('./Models/UserUpdateResponse');
const UserGetResponse = require('./Models/UserGetResponse');
const UserDeleteResponse = require('./Models/UserDeleteResponse');
const UserEmailDeleteResponse = require('./Models/UserEmailDeleteResponse');
const SendVerificationResponse = require('./Models/SendVerificationResponse');
const VerifyEmailResponse = require('./Models/VerifyEmailResponse');
const MagicLinkSend = require('./Models/MagicLinkSend');
const MagicLinkSendResponse = require('./Models/MagicLinkSendResponse');
const MagicLinkSendByEmail = require('./Models/MagicLinkSendByEmail');
const MagicLinkSendByEmailResponse = require('./Models/MagicLinkSendByEmailResponse');
const MagicLinkAuthenticate = require('./Models/MagicLinkAuthenticate');
const Email = require('./Models/Email');
const MagicLinkAuthenticateResponse = require('./Models/MagicLinkAuthenticateResponse');
const Name = require('./Models/Name');
const Options = require('./Models/Options');
const ErrorResponseException = require('./Exceptions/ErrorResponseException');
const APIException = require('./Exceptions/APIException');


// var Client = /** @class */ (function () {
//   function Client(config) {
//     var _a;
//     if (typeof config !== 'object' || config === null) {
//         throw new Error('Unexpected parameter type. ' +
//             'Refer to https://github.com/stytch/stytch-node ' +
//             'for how to create a Stytch client.');
//     }
//     if (config.projectID === null) {
//         throw new Error('Missing Stytch "projectID"');
//     }
//     if (config.secret === null) {
//         throw new Error('Missing Stytch "secret"');
//     }
//     if (arguments.length > 1) {
//         throw new Error('Too many arguments to constructor');
//     }
//     this.Configuration.projectID = config.projectID;
//     this.Configuration.secret = config.secret;
//   }
// });

const initializer = {
    // functional components of Stytch
    Configuration,
    // controllers of Stytch
    Users,
    MagicLinks,
    Emails,
    // models of Stytch
    Attributes,
    UserCreate,
    UserCreateResponse,
    UserUpdate,
    UserUpdateResponse,
    UserGetResponse,
    UserDeleteResponse,
    UserEmailDeleteResponse,
    SendVerificationResponse,
    VerifyEmailResponse,
    MagicLinkSend,
    MagicLinkSendResponse,
    MagicLinkSendByEmail,
    MagicLinkSendByEmailResponse,
    MagicLinkAuthenticate,
    Email,
    MagicLinkAuthenticateResponse,
    Name,
    Options,
    // exceptions of Stytch
    ErrorResponseException,
    APIException,
};

module.exports = initializer;
