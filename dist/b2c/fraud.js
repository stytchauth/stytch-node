"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fraud = void 0;
require("../shared/method_options");
var _fraud_fingerprint = require("./fraud_fingerprint");
var _fraud_rules = require("./fraud_rules");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

class Fraud {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.fingerprint = new _fraud_fingerprint.Fingerprint(this.fetchConfig);
    this.rules = new _fraud_rules.Rules(this.fetchConfig);
  }
}
exports.Fraud = Fraud;