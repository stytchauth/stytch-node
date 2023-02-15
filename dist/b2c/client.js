"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _crypto_wallets = require("./crypto_wallets");

var _magic_links = require("./magic_links");

var _oauth = require("./oauth");

var _otps = require("./otps");

var _passwords = require("./passwords");

var _sessions = require("./sessions");

var _totps = require("./totps");

var _users = require("./users");

var _webauthn = require("./webauthn");

var _client = require("../shared/client");

class Client extends _client.BaseClient {
  constructor(config) {
    super(config);
    this.users = new _users.Users(this.fetchConfig);
    this.magicLinks = new _magic_links.MagicLinks(this.fetchConfig);
    this.oauth = new _oauth.OAuth(this.fetchConfig);
    this.otps = new _otps.OTPs(this.fetchConfig);
    this.passwords = new _passwords.Passwords(this.fetchConfig);
    this.sessions = new _sessions.Sessions(this.fetchConfig, this.jwtConfig);
    this.totps = new _totps.TOTPs(this.fetchConfig);
    this.webauthn = new _webauthn.WebAuthn(this.fetchConfig);
    this.cryptoWallets = new _crypto_wallets.CryptoWallets(this.fetchConfig);
  }

}

exports.Client = Client;