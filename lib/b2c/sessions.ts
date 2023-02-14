import * as jose from "jose";
import {
  Attributes,
  Session,
  AuthenticationFactor,
  parseUser,
  WithRawUser,
  User,
} from "./shared_b2c";
import { ClientError } from "../shared/errors";

import { request, fetchConfig, BaseResponse } from "../shared";

export interface GetRequest {
  user_id: string;
}

export interface GetResponse extends BaseResponse {
  sessions: Session[];
}

export interface JwksResponse extends BaseResponse {
  keys: JWK[];
}

export interface JWK {
  alg: string;
  key_ops: string[];
  kid: string;
  kty: string;
  use: string;
  x5c: string[];
  "x5t#S256": string;

  n: string;
  e: string;
}

export interface AuthenticateRequest {
  session_duration_minutes?: number;
  session_token?: string;
  session_jwt?: string;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthenticateResponse extends BaseResponse {
  session: Session;
  user: User;
  session_token: string;
  session_jwt: string;
}

export interface RevokeRequest {
  session_id?: string;
  session_token?: string;
  session_jwt?: string;
}

export type RevokeResponse = BaseResponse;

type SessionRaw = {
  session_id: string;
  user_id: string;
  started_at: string;
  last_accessed_at: string;
  expires_at: string;
  attributes: Attributes;
  authentication_factors: AuthenticationFactor[];
};

interface GetResponseRaw extends BaseResponse {
  sessions: SessionRaw[];
}

interface AuthenticateResponseRaw extends BaseResponse {
  user: User;
  session: SessionRaw;
  session_token: string;
  session_jwt: string;
}

interface JwtConfig {
  projectID: string;
  jwks: jose.JWTVerifyGetKey;
}

const sessionClaim = "https://stytch.com/session";

type SessionClaim = {
  id: string;
  started_at: string;
  last_accessed_at: string;
  expires_at: string;
  attributes: Attributes;
  authentication_factors: AuthenticationFactor[];
};

export class Sessions {
  base_path = "sessions";
  private fetchConfig: fetchConfig;

  private jwksClient: jose.JWTVerifyGetKey;
  private jwtOptions: jose.JWTVerifyOptions;

  constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig) {
    this.fetchConfig = fetchConfig;

    this.jwksClient = jwtConfig.jwks;
    this.jwtOptions = {
      audience: jwtConfig.projectID,
      issuer: `stytch.com/${jwtConfig.projectID}`,
      typ: "JWT",
    };
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  get(params: GetRequest): Promise<GetResponse> {
    return request<GetResponseRaw>(this.fetchConfig, {
      method: "GET",
      url: this.base_path,
      params: { ...params },
    }).then((res): GetResponse => {
      return {
        ...res,
        sessions: res.sessions.map(parseSession),
      };
    });
  }

  jwks(project_id: string): Promise<JwksResponse> {
    return request(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(`jwks/${project_id}`),
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<WithRawUser<AuthenticateResponseRaw>>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    }).then((res): AuthenticateResponse => {
      return {
        ...res,
        user: parseUser(res.user),
        session: parseSession(res.session),
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
  async authenticateJwt(
    jwt: string,
    options?: {
      max_token_age_seconds?: number;
    },
  ): Promise<{ session: Session; session_jwt: string }> {
    try {
      const session = await this.authenticateJwtLocal(jwt, options);
      return {
        session,
        session_jwt: jwt,
      };
    } catch (err) {
      // JWT could not be verified locally. Check with the Stytch API.
      return this.authenticate({ session_jwt: jwt });
    }
  }

  /** Parse a JWT and verify the signature locally (without calling /authenticate in the API).
   *
   * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
   * claim) more than maxTokenAge seconds ago.
   *
   * If max_token_age_seconds is explicitly set to zero, all tokens will be considered too old,
   * even if they are otherwise valid.
   *
   * The value for current_date is used to compare timestamp claims ("exp", "nbf", "iat"). It
   * defaults to the current date (new Date()).
   *
   * The value for clock_tolerance_seconds is the maximum allowable difference when comparing
   * timestamps. It defaults to zero.
   */
  async authenticateJwtLocal(
    jwt: string,
    options?: {
      clock_tolerance_seconds?: number;
      max_token_age_seconds?: number;
      current_date?: Date;
    },
  ): Promise<Session> {
    const now = options?.current_date || new Date();

    let payload;
    try {
      const token = await jose.jwtVerify(jwt, this.jwksClient, {
        ...this.jwtOptions,
        clockTolerance: options?.clock_tolerance_seconds,
        currentDate: now,
        // Don't pass maxTokenAge directly to jwtVerify because it interprets zero as "infinity".
        // We want zero to mean "every token is stale" and force remote verification.
      });
      payload = token.payload;
    } catch (err) {
      throw new ClientError("jwt_invalid", "Could not verify JWT", err);
    }

    const maxTokenAge = options?.max_token_age_seconds;
    if (maxTokenAge != null) {
      const iat = payload.iat;
      if (!iat) {
        throw new ClientError("jwt_invalid", "JWT was missing iat claim");
      }
      const nowEpoch = +now / 1000; // Epoch seconds from milliseconds
      if (nowEpoch - iat >= maxTokenAge) {
        throw new ClientError(
          "jwt_too_old",
          `JWT was issued at ${iat}, more than ${maxTokenAge} seconds ago`,
        );
      }
    }

    // The custom claim set is all the claims in the payload except for the standard claims and
    // the Stytch session claim. The cleanest way to collect those seems to be naming what we want
    // to omit and using ...rest for to collect the custom claims.
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      aud: _aud,
      exp: _exp,
      iat: _iat,
      iss: _iss,
      jti: _jti,
      nbf: _nbf,
      sub: _sub,
      /* eslint-enable @typescript-eslint/no-unused-vars */

      [sessionClaim]: stytchClaim,
      ...customClaims
    } = payload;

    const claim = stytchClaim as SessionClaim;

    return {
      session_id: claim.id,
      attributes: claim.attributes,
      authentication_factors: claim.authentication_factors,

      user_id: payload.sub || "",

      // Parse the timestamps into Dates. The JWT expiration time is the same as the session's.
      // The exp claim is a Unix timestamp in seconds, so convert it to milliseconds first. The
      // other timestamps are RFC3339-formatted strings.
      started_at: new Date(claim.started_at),
      last_accessed_at: new Date(claim.last_accessed_at),
      // For JWTs that include it, prefer the inner expires_at claim.
      expires_at: new Date(claim.expires_at || (payload.exp || 0) * 1000),

      custom_claims: customClaims,
    };
  }

  revoke(data: RevokeRequest): Promise<RevokeResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke"),
      data,
    });
  }
}

function parseSession(session: SessionRaw): Session {
  const started_at = new Date(session.started_at);
  const last_accessed_at = new Date(session.last_accessed_at);
  const expires_at = new Date(session.expires_at);
  return {
    ...session,
    started_at,
    expires_at,
    last_accessed_at,
  };
}
