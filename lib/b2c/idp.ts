import * as jose from "jose";
import { JwtConfig } from "../shared/sessions";
import { fetchConfig, request } from "../shared";
import { ClientError } from "../shared/errors";

export interface IntrospectTokenRequest {
  token: string;
  client_id: string;
  client_secret?: string;
  token_type_hint?: string;
}

interface IntrospectTokenResponse {
  active: boolean;
  request_id: string;
  status_code: number;
  sub?: string;
  scope?: string;
  aud?: string[];
  exp?: number;
  iat?: number;
  iss?: string;
  nbf?: number;
  client_id?: string;
  token_type?: string;
}

export interface IntrospectTokenClaims {
  subject: string;
  scope: string;
  custom_claims: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  audience: string | string[];
  expires_at: number;
  issued_at: number;
  issuer: string;
  not_before: number;
  token_type: string;
}

export class IDP {
  private fetchConfig: fetchConfig;
  private jwtConfig: JwtConfig;
  private jwksClient: jose.JWTVerifyGetKey;
  // private jwtOptions: jose.JWTVerifyOptions;

  constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig) {
    this.fetchConfig = fetchConfig;
    this.jwtConfig = jwtConfig;
    this.jwksClient = jwtConfig.jwks;
  }

  async introspectTokenNetwork(
    data: IntrospectTokenRequest
  ): Promise<IntrospectTokenClaims> {
    const fetchConfig: fetchConfig = {
      ...this.fetchConfig,
      headers: {
        ["User-Agent"]: this.fetchConfig.headers["User-Agent"],
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const params: Record<string, string> = {
      token: data.token,
      client_id: data.client_id,
    };

    if (data.client_secret && data.client_secret.length > 0) {
      params.client_secret = data.client_secret;
    }

    if (data.token_type_hint && data.token_type_hint.length > 0) {
      params.token_type_hint = data.token_type_hint;
    }

    try {
      const response = await request<IntrospectTokenResponse>(fetchConfig, {
        method: "POST",
        url: `/v1/public/${this.jwtConfig.projectID}/oauth2/introspect`,
        dataRaw: new URLSearchParams(params),
      });
      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        aud: _aud,
        exp: _exp,
        iat: _iat,
        iss: _iss,
        nbf: _nbf,
        sub: _sub,
        status_code: _status_code,
        scope: _scope,
        active: _active,
        request_id: _request_id,
        token_type: _token_type,
        client_id: _client_id,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...customClaims
      } = response;

      if (!_active) {
        throw new ClientError("token_invalid", "Token was not active", null);
      }

      return {
        subject: _sub as string,
        scope: _scope as string,
        audience: _aud as string[],
        expires_at: _exp as number,
        issued_at: _iat as number,
        issuer: _iss as string,
        not_before: _nbf as number,
        custom_claims: customClaims,
        token_type: _token_type as string,
      };
    } catch (err) {
      throw new ClientError("token_invalid", "Could not introspect token", err);
    }
  }

  async introspectTokenLocal(
    data: IntrospectTokenRequest,
    options?: {
      clock_tolerance_seconds?: number;
      current_date?: Date;
    }
  ): Promise<IntrospectTokenClaims> {
    const jwtOptions = {
      audience: data.client_id,
      issuer: `https://stytch.com/${this.jwtConfig.projectID}`,
      typ: "JWT",
    };
    const now = options?.current_date || new Date();
    let payload;
    try {
      const token = await jose.jwtVerify(data.token, this.jwksClient, {
        ...jwtOptions,
        clockTolerance: options?.clock_tolerance_seconds,
        currentDate: now,
        // Don't pass maxTokenAge directly to jwtVerify because it interprets zero as "infinity".
        // We want zero to mean "every token is stale" and force remote verification.
      });
      payload = token.payload;
    } catch (err) {
      throw new ClientError("jwt_invalid", "Could not verify JWT", err);
    }

    // The custom claim set is all the claims in the payload except for the standard claims and
    // the scope and token_type claims. The cleanest way to collect those seems to be naming what we want
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
      scope: _scope,
      token_type: _token_type,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...custom_claims
    } = payload;
    return {
      subject: _sub as string,
      expires_at: _exp as number,
      audience: _aud as string[],
      issued_at: _iat as number,
      issuer: _iss as string,
      not_before: _nbf as number,
      scope: _scope as string,
      token_type: _token_type as string,
      custom_claims,
    };
  }
}
