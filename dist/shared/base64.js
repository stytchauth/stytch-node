"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64Encode = base64Encode;
const LOOKUP_TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * base64Encode is a vanilla-javascript implementation of base64 encoding
 * We expect stytch-node to be run in a variety of runtimes, so
 * we often can't depend on `window.atob` or `new Buffer`.
 *
 * We've experienced problems with two isomorphic base64 libraries so far,
 * so let's just roll our own!
 *
 * We only use this to encode project IDs and secrets, which are guaranteed to be ASCII and not unicode.
 *
 * Heavily, heavily inspired by http://www.webtoolkit.info/javascript-base64.html
 * @param input string
 */
function base64Encode(input) {
  let output = "";

  // Unicode sanity check
  for (let i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) > 128) {
      throw Error("Base64 encoded unicode is not supported. Cannot encode " + input);
    }
  }
  let char1 = 0,
    char2 = 0,
    char3 = 0;
  let enc1 = 0,
    enc2 = 0,
    enc3 = 0,
    enc4 = 0;
  let i = 0;
  while (i < input.length) {
    char1 = input.charCodeAt(i++);
    char2 = input.charCodeAt(i++);
    char3 = input.charCodeAt(i++);
    enc1 = char1 >> 2;
    enc2 = (char1 & 3) << 4 | char2 >> 4;
    enc3 = (char2 & 15) << 2 | char3 >> 6;
    enc4 = char3 & 63;
    if (isNaN(char2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(char3)) {
      enc4 = 64;
    }
    output = output + LOOKUP_TABLE.charAt(enc1) + LOOKUP_TABLE.charAt(enc2) + LOOKUP_TABLE.charAt(enc3) + LOOKUP_TABLE.charAt(enc4);
  }
  return output;
}