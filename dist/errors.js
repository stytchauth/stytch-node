"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExperimentError = exports.RequestError = exports.StytchError = void 0;

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

class ExperimentError extends Error {
  constructor(experiment) {
    super(`This feature is experimental. Please enable the "${experiment}" experiment to use it.`);
  }

}

exports.ExperimentError = ExperimentError;