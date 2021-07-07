"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;

var _stytch_error = require("./stytch_error");

function request(client, config) {
  return client.request(config).then(res => res.data).catch(err => {
    if (err.response) {
      throw new _stytch_error.StytchError(err.response.data);
    } else if (err.request) {
      // No response received for the request.
      throw new Error(err.request);
    } else {
      // The request couldn't be sent for some reason.
      throw new Error(err.message);
    }
  });
}