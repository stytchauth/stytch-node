"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;

var _stytch_error = _interopRequireDefault(require("./stytch_error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function request(client, config) {
  return client.request(config).then(res => res.data).catch(err => {
    if (err.response) {
      throw new _stytch_error.default(err.response.data);
    } else if (err.request) {
      // No response received for the request.
      throw new Error(err.request);
    } else {
      // The request couldn't be sent for some reason.
      throw new Error(err.message);
    }
  });
}