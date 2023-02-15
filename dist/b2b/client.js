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

class B2BClient extends _client.BaseClient {
  constructor(config) {
    super(config);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.sessions = new _sessions.Sessions(this.fetchConfig);
    this.organizations = new _organizations.Organizations(this.fetchConfig);
    this.sso = new _sso.SSO(this.fetchConfig);
  }

}

exports.B2BClient = B2BClient;