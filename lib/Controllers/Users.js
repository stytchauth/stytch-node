/**
 * Stytch
 */

'use strict';

const _request = require('../Http/Client/RequestClient');
const _configuration = require('../configuration');
const _apiHelper = require('../APIHelper');
const _baseController = require('./BaseController');

class Users {
    /**
     * Add a user to Stytch. A user_id is returned in the response that can then be used to
     * perform other operations within Stytch.
     *
     * @param {UserCreate} body Created user object
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static createUser(body, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        const _pathUrl = '/users';
        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'stytch-node',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            body: _apiHelper.jsonSerialize(body),
            username: _configuration.projectID,
            password: _configuration.secret,
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
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserCreateResponse');
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
     * Fetch a given user to see what their various attributes are.
     *
     * @param {string} userId The user_id for the user to fetch.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static getUserByID(userId, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/users/{user_id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            user_id: { value: userId, encode: true },
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'stytch-node',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'GET',
            headers: _headers,
            username: _configuration.projectID,
            password: _configuration.secret,
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
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserGetResponse');
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
     * Update a user's attributes. For example, you can add additional emails or change the
     * user's primary email.
     *
     * @param {string} userId The user_id to update.
     * @param {UserUpdate} body Updated user object
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static updateUser(userId, body, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/users/{user_id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            user_id: { value: userId, encode: true },
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'stytch-node',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'PUT',
            headers: _headers,
            body: _apiHelper.jsonSerialize(body),
            username: _configuration.projectID,
            password: _configuration.secret,
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
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserUpdateResponse');
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
     * Remove a user from Stytch.
     *
     * @param {string} userId The user_id to be deleted.
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static deleteUser(userId, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/users/{user_id}';
        // process template parameters
        _pathUrl = _apiHelper.appendUrlWithTemplateParameters(_pathUrl, {
            user_id: { value: userId, encode: true },
        });

        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'user-agent': 'stytch-node',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'DELETE',
            headers: _headers,
            username: _configuration.projectID,
            password: _configuration.secret,
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
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'UserDeleteResponse');
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
module.exports = Users;
