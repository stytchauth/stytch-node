/**
 * Stytch
 */

'use strict';

const _request = require('../Http/Client/RequestClient');
const _configuration = require('../configuration');
const _apiHelper = require('../APIHelper');
const _baseController = require('./BaseController');

class EmailsController {
    /**
     * Remove an email from a given user.
     *
     * @param {string} emailId The email_id to be deleted.
     * @param {string} userId The user_id to delete an email from.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static deleteEmail(emailId, userId, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/emails/{email_id}/users/{user_id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            email_id: { value: emailId, encode: true },
            user_id: { value: userId, encode: true },
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'APIMATIC 2.0',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'DELETE',
            headers: _headers,
            username: _configuration.basicAuthUserName,
            password: _configuration.basicAuthPassword,
        };

        // build the response processing.
        return new Promise((_fulfill, _reject) => {
            _request(_options, (_error, _response, _context) => {
                let errorResponse;
                if (_error) {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                    let parsed = JSON.parse(_response.body);
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserEmailDeleteResponse');
                    _callback(null, parsed, _context);
                    _fulfill(parsed);
                } else if (_response.statusCode === 400) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Bad request';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Bad request', errorCode: 400, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 401) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Unauthorized';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unauthorized', errorCode: 401, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 403) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Forbidden';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Forbidden', errorCode: 403, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 404) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Not found';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Not found', errorCode: 404, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 429) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Too many requests';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Too many requests', errorCode: 429, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 500) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Internal server error';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Internal server error',
                        errorCode: 500,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                }
            });
        });
    }
    /**
     * Prompt for a verification email to be sent to the user to confirm the correct email was
     * entered. The email must be verified before the user needs to login next.
     *
     * @param {string} userId The user_id for the user to fetch.
     * @param {string} emailId The email_id for the given user to verify.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static createSendEmailVerification(userId, emailId, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/emails/{email_id}/send_verification';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            user_id: { value: userId, encode: true },
            email_id: { value: emailId, encode: true },
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'APIMATIC 2.0',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            username: _configuration.basicAuthUserName,
            password: _configuration.basicAuthPassword,
        };

        // build the response processing.
        return new Promise((_fulfill, _reject) => {
            _request(_options, (_error, _response, _context) => {
                let errorResponse;
                if (_error) {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                    let parsed = JSON.parse(_response.body);
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'SendVerificationResponse');
                    _callback(null, parsed, _context);
                    _fulfill(parsed);
                } else if (_response.statusCode === 400) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Bad request';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Bad request', errorCode: 400, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 401) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Unauthorized';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unauthorized', errorCode: 401, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 403) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Forbidden';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Forbidden', errorCode: 403, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 404) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Not found';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Not found', errorCode: 404, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 429) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Too many requests';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Too many requests', errorCode: 429, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 500) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Internal server error';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Internal server error',
                        errorCode: 500,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                }
            });
        });
    }
    /**
     * Verify that a user supplied the correct email during signup.
     *
     * @param {string} token The token used to verify user's email.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static createVerifyEmail(token, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/emails/{token}/verify';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            token: { value: token, encode: true },
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'APIMATIC 2.0',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            username: _configuration.basicAuthUserName,
            password: _configuration.basicAuthPassword,
        };

        // build the response processing.
        return new Promise((_fulfill, _reject) => {
            _request(_options, (_error, _response, _context) => {
                let errorResponse;
                if (_error) {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                } else if (_response.statusCode >= 200 && _response.statusCode <= 206) {
                    let parsed = JSON.parse(_response.body);
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'VerifyEmailResponse');
                    _callback(null, parsed, _context);
                    _fulfill(parsed);
                } else if (_response.statusCode === 400) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Bad request';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Bad request', errorCode: 400, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 401) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Unauthorized';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Unauthorized', errorCode: 401, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 403) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Forbidden';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Forbidden', errorCode: 403, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 404) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Not found';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Not found', errorCode: 404, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 429) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Too many requests';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Too many requests', errorCode: 429, errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else if (_response.statusCode === 500) {
                    const mappedObject = _baseController.getObjectMapper()
                        .mapObject(JSON.parse(_context.response.body), 'ErrorResponseException');
                    mappedObject.reason = 'Internal server error';
                    mappedObject.context = _context;
                    const _err = { errorMessage: 'Internal server error',
                        errorCode: 500,
                        errorResponse: mappedObject };
                    _callback(_err, null, _context);
                    _reject(_err);
                } else {
                    errorResponse = _baseController.validateResponse(_context);
                    _callback(errorResponse.error, errorResponse.response, errorResponse.context);
                    _reject(errorResponse.error);
                }
            });
        });
    }
}
module.exports = EmailsController;
