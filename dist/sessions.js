"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sessions = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Sessions {
  constructor(client) {
    _defineProperty(this, "base_path", "sessions");

    this.client = client;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  get(params) {
    return (0, _shared.request)(this.client, {
      method: "GET",
      url: this.base_path,
      params
    }).then(res => {
      return { ...res,
        sessions: res.sessions.map(parseSession)
      };
    });
  }

  authenticate(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data
    }).then(res => {
      return { ...res,
        session: parseSession(res.session)
      };
    });
  }

  revoke(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("revoke"),
      data
    });
  }

}

exports.Sessions = Sessions;

function parseSession(session) {
  const started_at = new Date(session.started_at);
  const last_accessed_at = new Date(session.last_accessed_at);
  const expires_at = new Date(session.expires_at);
  return { ...session,
    started_at,
    expires_at,
    last_accessed_at
  };
}