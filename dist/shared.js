"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;

var _errors = require("./errors");

var _isomorphicUnfetch = _interopRequireDefault(require("isomorphic-unfetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function request(fetchConfig, requestConfig) {
  const url = new URL(requestConfig.url, fetchConfig.baseURL);

  if (requestConfig.params) {
    Object.entries(requestConfig.params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  let response;

  try {
    response = await (0, _isomorphicUnfetch.default)(url.toString(), {
      method: requestConfig.method,
      body: JSON.stringify(requestConfig.data),
      ...fetchConfig
    });
  } catch (e) {
    const err = e;
    throw new _errors.RequestError(err.message, requestConfig);
  }

  let responseJSON;

  try {
    responseJSON = await response.json();
  } catch (e) {
    const err = e;
    throw new _errors.RequestError(`Unable to parse JSON response from server: ${err.message}`, requestConfig);
  }

  if (response.status >= 400) {
    throw new _errors.StytchError(responseJSON);
  }

  return responseJSON;
}