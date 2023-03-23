"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.B2BClient = void 0;

var _magic_links = require("./magic_links");

var _sessions = require("./sessions");

var _organizations = require("./organizations");

var _sso = require("./sso");

var _client = require("../shared/client");

var jose = _interopRequireWildcard(require("jose"));

var _discovery = require("./discovery");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class B2BClient extends _client.BaseClient {
  constructor(config) {
    super(config);

    if (!this.fetchConfig.baseURL.endsWith("b2b/")) {
      this.fetchConfig.baseURL += "b2b/";
    }

    this.jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(new URL(`sessions/jwks/${config.project_id}`, this.fetchConfig.baseURL))
    };
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.sessions = new _sessions.Sessions(this.fetchConfig, this.jwtConfig);
    this.organizations = new _organizations.Organizations(this.fetchConfig);
    this.sso = new _sso.SSO(this.fetchConfig);
    this.discovery = new _discovery.Discovery(this.fetchConfig);
  }

}

exports.B2BClient = B2BClient;