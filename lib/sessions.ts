import * as jose from "jose";
import { URL } from "url";
import { request, Attributes, Session, AuthenticationFactor } from "./shared";
import { ClientError } from "./errors";

import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";

export interface GetRequest {
  user_id: string;
}

export interface GetResponse extends BaseResponse {
  sessions: Session[];
}

export interface AuthenticateRequest {
  session_duration_minutes?: number;
  session_token?: string;
  session_jwt?: string;
}

export interface AuthenticateResponse extends BaseResponse {
  session: Session;
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
  session: SessionRaw;
  session_token: string;
  session_jwt: string;
}

interface JWTConfig {
  projectID: string;
  jwksURL: URL;
}

const sessionClaim = "https://stytch.com/session";

export class Sessions {
  base_path = "sessions";
  private client: AxiosInstance;

  private jwks: jose.JWTVerifyGetKey;
  private jwtOptions: jose.JWTVerifyOptions;

  constructor(client: AxiosInstance, jwtConfig: JWTConfig) {
    this.client = client;

    this.jwks = jose.createRemoteJWKSet(jwtConfig.jwksURL);
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
    return request<GetResponseRaw>(this.client, {
      method: "GET",
      url: this.base_path,
      params,
    }).then((res): GetResponse => {
      return {
        ...res,
        sessions: res.sessions.map(parseSession),
      };
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<AuthenticateResponseRaw>(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    }).then((res): AuthenticateResponse => {
      return {
        ...res,
        session: parseSession(res.session),
      };
    });
  }

  /** Parse a JWT and verify the signature, preferring local verification over remote.
   *
   * If max_token_age_seconds is set, remote verification will be forced if the JWT was issued at
   * (based on the "iat" claim) more than that many seconds ago.
   */
  async authenticate_jwt(
    jwt: string,
    options?: {
      max_token_age_seconds?: number;
    }
  ): Promise<AuthenticateResponse> {
    try {
      const session = await this.authenticate_jwt_local(jwt, {
        max_token_age_seconds: options?.max_token_age_seconds,
      });
      return {
        session,
        session_jwt: jwt,
        session_token: "",

        // Pretend that this was a successful API request.
        request_id: "",
        status_code: 200,
      };
    } catch (err) {
      if (err instanceof ClientError && err.code === "jwt_too_old") {
        // JWT was too old (stale) to verify locally. Check with the Stytch API.
        return this.authenticate({ session_jwt: jwt });
      }

      throw err;
    }
  }

  /** Parse a JWT and verify the signature locally (without making an /authenticate call).
   *
   * If maxTokenAge is set, this will return an error if the JWT was issued (based on the "iat"
   * claim) more than maxTokenAge seconds ago.
   */
  async authenticate_jwt_local(
    jwt: string,
    options?: {
      max_token_age_seconds?: number;
    }
  ): Promise<Session> {
    // Don't pass maxTokenAge directly to jwtVerify because it interprets zero as "infinity". We
    // want zero to mean "every token is stale" and force remote verification.
    const maxTokenAge = options?.max_token_age_seconds;
    const now = Date.now() / 1000; // Unix epoch seconds

    let payload;
    try {
      const token = await jose.jwtVerify(jwt, this.jwks, this.jwtOptions);
      payload = token.payload;
    } catch (err) {
      throw new ClientError("jwt_invalid", "Could not verify JWT", err);
    }

    if (maxTokenAge != null) {
      const iat = payload.iat;
      if (!iat) {
        throw new ClientError("jwt_invalid", "JWT was missing iat claim");
      }
      if (now - iat > maxTokenAge) {
        throw new ClientError(
          "jwt_too_old",
          `JWT was issued at ${iat}, more than ${maxTokenAge} seconds ago`
        );
      }
    }

    // Re-pack the JWT contents as session data. Since we're actually changing the types of
    // values stored on the session object, we have to disable type-checking for a bit.
    //
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session = payload[sessionClaim] as any;

    // The subject claim is the user ID.
    session.user_id = payload.sub;

    // Parse the timestamps into Dates. The JWT expiration time is the same as the session's.
    // The exp claim is a Unix timestamp in seconds, so convert it to milliseconds first. The
    // other two timestamps are RFC3339-formatted strings.
    session.expires_at = new Date((payload.exp || 0) * 1000);
    session.started_at = new Date(session.started_at);
    session.last_accessed_at = new Date(session.last_accessed_at);

    // The JWT has a slightly different name for the session ID.
    session.session_id = session.id;
    delete session.id;

    return session as Session;
  }

  revoke(data: RevokeRequest): Promise<RevokeResponse> {
    return request(this.client, {
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
