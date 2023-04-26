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
export declare function base64Encode(input: string): string;
