"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientError = exports.RequestError = exports.StytchError = void 0;

class StytchError extends Error {
  constructor(data) {
    super(JSON.stringify(data));
    this.status_code = data.status_code;
    this.request_id = data.request_id;
    this.error_type = data.error_type;
    this.error_message = data.error_message;
    this.error_url = data.error_url;
  }

}

exports.StytchError = StytchError;

class RequestError extends Error {
  constructor(message, request) {
    super(message);
    this.request = request;
  }

}

exports.RequestError = RequestError;

class ClientError extends Error {
  constructor(code, message, cause) {
    super(`${code}: ${message}`);
    this.code = code;
    this.cause = cause;
  }

}

exports.ClientError = ClientError;