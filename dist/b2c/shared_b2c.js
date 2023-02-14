"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseUser = parseUser;

function parseUser(user) {
  return { ...user,
    created_at: new Date(user.created_at)
  };
}