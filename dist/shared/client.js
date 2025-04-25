"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseClient = void 0;
var envs = _interopRequireWildcard(require("./envs"));
var _package = require("../../package.json");
var _base = require("./base64");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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