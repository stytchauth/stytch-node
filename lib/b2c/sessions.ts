import * as jose from "jose";
import {
  Attributes,
  Session,
  AuthenticationFactor,
  parseUser,
  WithRawUser,
  User,
} from "./shared_b2c";

import { request, fetchConfig, BaseResponse } from "../shared";
import { authenticateJwtLocal, JwtConfig } from "../shared/sessions";

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
    }
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
    }
  ): Promise<Session> {
    const sess = await authenticateJwtLocal(
      this.jwksClient,
      this.jwtOptions,
      jwt,
      options
    );

    return {
      session_id: sess.session_id,
      attributes: sess.attributes as Attributes,
      authentication_factors:
        sess.authentication_factors as AuthenticationFactor[],
      user_id: sess.sub,
      started_at: sess.started_at,
      last_accessed_at: sess.last_accessed_at,
      expires_at: sess.expires_at,
      custom_claims: sess.custom_claims,
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
