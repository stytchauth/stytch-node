"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;
exports.parseUser = parseUser;

var _errors = require("./errors");

var fetchImport = _interopRequireWildcard(require("isomorphic-unfetch"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// https://github.com/developit/unfetch/issues/99
const fetch = fetchImport.default || fetchImport;

async function request(fetchConfig, requestConfig) {
  const url = new URL(requestConfig.url, fetchConfig.baseURL);

  if (requestConfig.params) {
    Object.entries(requestConfig.params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  let response;

  try {
    response = await fetch(url.toString(), {
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

function parseUser(user) {
  return { ...user,
    created_at: new Date(user.created_at)
  };
}