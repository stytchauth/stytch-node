"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.experimentRequired = experimentRequired;
exports.defaults = void 0;

var _errors = require("./errors");

const defaults = {
  sessions: false
};
exports.defaults = defaults;

function experimentRequired(experiments, experiment) {
  return new Promise((resolve, reject) => {
    experiments[experiment] ? resolve() : reject(new _errors.ExperimentError(experiment));
  });
}