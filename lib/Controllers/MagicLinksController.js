/**
 * Stytch
 */

'use strict';

const _request = require('../Http/Client/RequestClient');
const _configuration = require('../configuration');
const _apiHelper = require('../APIHelper');
const _baseController = require('./BaseController');

class MagicLinksController {
    /**
     * Send a magic link to the user. You can optionally include additional security measures
     * such as requiring the ip address the link is requested from match the one it's clicked
     * from.
     *
     * @param {MagicLinkSend} body TODO: type description here
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static createSendMagicLink(body, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        const _pathUrl = '/magic_links/send';
        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'APIMATIC 2.0',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            body: _apiHelper.jsonSerialize(body),
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
                    parsed = _baseController.getObjectMapper().mapObject(parsed, 'MagicLinkSendResponse');
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
     * Send a magic link to the user. You can optionally include additional security measures
     * such as requiring the ip address the link is requested from match the one it's clicked
     * from.
     *
     * @param {MagicLinkSendByEmail} body TODO: type description here
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static createSendEmailMagicLink(body, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        const _pathUrl = '/magic_links/send_by_email';
        const _queryBuilder = `${_baseUri}${_pathUrl}`;

        // validate and preprocess url
        const _queryUrl = _apiHelper.cleanUrl(_queryBuilder);

        // prepare headers
        const _headers = {
            accept: 'application/json',
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'APIMATIC 2.0',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            body: _apiHelper.jsonSerialize(body),
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
                    parsed = _baseController.getObjectMapper()
                .mapObject(parsed, 'MagicLinkSendByEmailResponse');
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
     * Authenticate a user given a magic link. This endpoint verifies that the link is valid,
     * hasn't expired, and any optional security settings such as ip match or user agent match
     * are satisfied. Not to be confused with the emails verify endpoint meant for initial, one
     * time verification that the correct email was supplied during sign up.
     *
     * @param {string} token TODO: type description here
     * @param {MagicLinkAuthenticate} body Magic link object
     *
     * @callback    The callback function that returns response from the API call
     *
     * @returns {Promise}
     */
    static postUserMagicLinkAuthenticate(token, body, callback) {
        // create empty callback if absent
        const _callback = typeof callback === 'function' ? callback : () => undefined;

        // prepare query string for API call
        const _baseUri = _configuration.BASEURI;

        let _pathUrl = '/magic_links/{token}/authenticate';
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
            'content-type': 'application/json; charset=utf-8',
            'user-agent': 'APIMATIC 2.0',
        };

        // construct the request
        const _options = {
            queryUrl: _queryUrl,
            method: 'POST',
            headers: _headers,
            body: _apiHelper.jsonSerialize(body),
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
                    parsed = _baseController.getObjectMapper()
                .mapObject(parsed, 'MagicLinkAuthenticateResponse');
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
module.exports = MagicLinksController;
