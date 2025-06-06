"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StytchError = exports.RequestError = exports.ClientError = void 0;
class StytchError extends Error {
  constructor(data) {
    super(JSON.stringify(data));
    if ("error" in data) {
      this.status_code = data.status_code;
      this.request_id = data.request_id;
      this.error_type = data.error;
      this.error_message = data.error_description;
      this.error_url = data.error_uri;
    } else {
      this.status_code = data.status_code;
      this.request_id = data.request_id;
      this.error_type = data.error_type;
      this.error_message = data.error_message;
      this.error_url = data.error_url;
      this.error_details = data.error_details;
    }
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
    let msg = `${code}: ${message}`;
    if (cause) {
      msg += `: ${cause}`;
    }
    super(msg);
    this.code = code;
    this.cause = cause;
  }
}
exports.ClientError = ClientError;