/**
 * Stytch
 */

'use strict';

const Attributes = require('../lib/Models/Attributes');
const UserCreate = require('../lib/Models/UserCreate');
const UserCreateResponse = require('../lib/Models/UserCreateResponse');
const UserUpdate = require('../lib/Models/UserUpdate');
const UserUpdateResponse = require('../lib/Models/UserUpdateResponse');
const UserGetResponse = require('../lib/Models/UserGetResponse');
const UserDeleteResponse = require('../lib/Models/UserDeleteResponse');
const UserEmailDeleteResponse = require('../lib/Models/UserEmailDeleteResponse');
const SendVerificationResponse = require('../lib/Models/SendVerificationResponse');
const VerifyEmailResponse = require('../lib/Models/VerifyEmailResponse');
const MagicLinkSend = require('../lib/Models/MagicLinkSend');
const MagicLinkSendResponse = require('../lib/Models/MagicLinkSendResponse');
const MagicLinkSendByEmail = require('../lib/Models/MagicLinkSendByEmail');
const MagicLinkSendByEmailResponse = require('../lib/Models/MagicLinkSendByEmailResponse');
const MagicLinkAuthenticate = require('../lib/Models/MagicLinkAuthenticate');
const Email = require('../lib/Models/Email');
const MagicLinkAuthenticateResponse = require('../lib/Models/MagicLinkAuthenticateResponse');
const Name = require('../lib/Models/Name');
const Options = require('../lib/Models/Options');
const ErrorResponseException = require('../lib/Exceptions/ErrorResponseException');

const classMap = {
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
    ErrorResponseException,
};

/**
 * Factory class to create instances of models and exception classes
 */
class ModelFactory {
    /**
     * Creates instance of a model class
     * @param  modelName  {string}  Name of class to instantiate
     * @returns  {object} Instance of the model class
     */
    static getInstance(modelName) {
        return new classMap[modelName]();
    }
}

module.exports = ModelFactory;
