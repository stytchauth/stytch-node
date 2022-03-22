"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sessions = void 0;

var jose = _interopRequireWildcard(require("jose"));

var _shared = require("./shared");

var _errors = require("./errors");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const sessionClaim = "https://stytch.com/session";

class Sessions {
  constructor(client, jwtConfig) {
    _defineProperty(this, "base_path", "sessions");

    this.client = client;
    this.jwks = jose.createRemoteJWKSet(jwtConfig.jwksURL);
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT"
    };
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
  /** Parse a JWT and verify the signature, preferring local verification over remote.
   *
   * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
   * (based on the "iat" claim) more than that many seconds ago.
   *
   * To force remote validation for all tokens, set max_token_age_seconds to zero or use the
   * authenticate method instead.
   */


  async authenticate_jwt(jwt, options) {
    try {
      const session = await this.authenticate_jwt_local(jwt, {
        max_token_age_seconds: options === null || options === void 0 ? void 0 : options.max_token_age_seconds
      });
      return {
        session,
        session_jwt: jwt,
        session_token: "",
        // Pretend that this was a successful API request.
        request_id: "",
        status_code: 200
      };
    } catch (err) {
      if (err instanceof _errors.ClientError && err.code === "jwt_too_old") {
        // JWT was too old (stale) to verify locally. Check with the Stytch API.
        return this.authenticate({
          session_jwt: jwt
        });
      }

      throw err;
    }
  }
  /** Parse a JWT and verify the signature locally (without making an /authenticate call).
   *
   * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
   * claim) more than maxTokenAge seconds ago.
   */


  async authenticate_jwt_local(jwt, options) {
    // Don't pass maxTokenAge directly to jwtVerify because it interprets zero as "infinity". We
    // want zero to mean "every token is stale" and force remote verification.
    const maxTokenAge = options === null || options === void 0 ? void 0 : options.max_token_age_seconds;
    const now = Date.now() / 1000; // Unix epoch seconds

    let payload;

    try {
      const token = await jose.jwtVerify(jwt, this.jwks, this.jwtOptions);
      payload = token.payload;
    } catch (err) {
      throw new _errors.ClientError("jwt_invalid", "Could not verify JWT", err);
    }

    if (maxTokenAge != null) {
      const iat = payload.iat;

      if (!iat) {
        throw new _errors.ClientError("jwt_invalid", "JWT was missing iat claim");
      }

      if (now - iat > maxTokenAge) {
        throw new _errors.ClientError("jwt_too_old", `JWT was issued at ${iat}, more than ${maxTokenAge} seconds ago`);
      }
    } // Re-pack the JWT contents as session data. Since we're actually changing the types of
    // values stored on the session object, we have to disable type-checking for a bit.
    //
    // eslint-disable-next-line @typescript-eslint/no-explicit-any


    const session = payload[sessionClaim]; // The subject claim is the user ID.

    session.user_id = payload.sub; // Parse the timestamps into Dates. The JWT expiration time is the same as the session's.
    // The exp claim is a Unix timestamp in seconds, so convert it to milliseconds first. The
    // other two timestamps are RFC3339-formatted strings.

    session.expires_at = new Date((payload.exp || 0) * 1000);
    session.started_at = new Date(session.started_at);
    session.last_accessed_at = new Date(session.last_accessed_at); // The JWT has a slightly different name for the session ID.

    session.session_id = session.id;
    delete session.id;
    return session;
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