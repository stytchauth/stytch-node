"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAuthorizationHeaders = addAuthorizationHeaders;
function addAuthorizationHeaders(headers, authorization) {
  if (authorization.session_token) {
    headers["X-Stytch-Member-Session"] = authorization.session_token;
  }
  if (authorization.session_jwt) {
    headers["X-Stytch-Member-SessionJWT"] = authorization.session_jwt;
  }
}