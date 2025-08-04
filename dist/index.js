"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  B2BClient: true,
  Client: true,
  SamlShieldClient: true,
  envs: true
};
Object.defineProperty(exports, "B2BClient", {
  enumerable: true,
  get: function () {
    return _client.B2BClient;
  }
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function () {
    return _client2.Client;
  }
});
Object.defineProperty(exports, "SamlShieldClient", {
  enumerable: true,
  get: function () {
    return _index.SamlShieldClient;
  }
});
exports.envs = exports.default = void 0;
var _client = require("./b2b/client");
var _client2 = require("./b2c/client");
var _index = require("./samlshield/index");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
var _index2 = require("./b2b/index");
Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index2[key];
    }
  });
});
var _index3 = require("./b2c/index");
Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index3[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index3[key];
    }
  });
});
var _envs = _interopRequireWildcard(require("./shared/envs"));
exports.envs = _envs;
var _errors = require("./shared/errors");
Object.keys(_errors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _errors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errors[key];
    }
  });
});
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
var _default = exports.default = {
  Client: _client2.Client,
  B2BClient: _client.B2BClient,
  SamlShieldClient: _index.SamlShieldClient
};