"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Discovery = void 0;

var _shared = require("../shared");

class Organizations {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  list(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: "discovery/organizations",
      data
    });
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: "discovery/organizations/create",
      data
    });
  }

}

class IntermediateSessions {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  exchange(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: "discovery/intermediate_sessions/exchange",
      data
    });
  }

}

class Discovery {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.organizations = new Organizations(this.fetchConfig);
    this.intermediateSessions = new IntermediateSessions(this.fetchConfig);
  }

}

exports.Discovery = Discovery;