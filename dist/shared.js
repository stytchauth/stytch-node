"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;

var _errors = require("./errors");

function request(client, config) {
  return client.request(config).then(res => res.data).catch(err => {
    if (err.response) {
      // Received a structured error from the API
      throw new _errors.StytchError(err.response.data);
    } else if (err.request) {
      // No response received for the request.
      throw new _errors.RequestError(err.message, err.config);
    } else {
      // The request couldn't be sent for some reason.
      throw new _errors.RequestError(err.message, config);
    }
  });
}