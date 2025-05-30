"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseClient = void 0;
var envs = _interopRequireWildcard(require("./envs"));
var _package = require("../../package.json");
var _base = require("./base64");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

class BaseClient {
  constructor(config) {
    if (typeof config != "object") {
      throw new Error("Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library.");
    }
    if (!config.project_id) {
      throw new Error('Missing "project_id" in config');
    }
    if (!config.secret) {
      throw new Error('Missing "secret" in config');
    }
    if (config.env && config.custom_base_url) {
      console.warn(`[Stytch] Warning: Both 'env' and 'base_url' were provided in the client config. 'env' will be ignored in favor of 'base_url'.`);
    }

    // Validate custom_base_url is using HTTPS
    if (config.custom_base_url && !config.custom_base_url.startsWith("https://")) {
      throw new Error("custom_base_url must use HTTPS scheme");
    }
    if (!config.env) {
      if (config.project_id.startsWith("project-live-")) {
        config.env = envs.live;
      } else {
        config.env = envs.test;
      }
    }
    if (!config.fraud_env) {
      config.fraud_env = envs.fraud;
    }
    if (config.env != envs.test && config.env != envs.live) {
      console.warn(`[Stytch] Warning: Using a custom 'env' value ("${config.env}") instead of 'envs.test' or 'envs.live". If you're attempting to use a custom baseURL consider the base_url parameter.`);
    }
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": `Stytch Node v${_package.version}`,
      Authorization: "Basic " + (0, _base.base64Encode)(config.project_id + ":" + config.secret)
    };
    const baseURL = config.custom_base_url || config.env;
    this.fetchConfig = {
      baseURL: baseURL,
      fraudBaseURL: config.fraud_env,
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      dispatcher: config.dispatcher
    };

    // Get a baseURL that ends with a slash to make building route URLs easier.
    this.baseURL = baseURL;
    if (!this.baseURL.endsWith("/")) {
      this.baseURL += "/";
    }
  }
}
exports.BaseClient = BaseClient;