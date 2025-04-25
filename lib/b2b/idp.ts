import * as jose from "jose";
import { JwtConfig } from "../shared/sessions";
import { fetchConfig, request } from "../shared";
import { AuthorizationCheck } from "./sessions";
import { performScopeAuthorizationCheck } from "./rbac_local";
import { ClientError } from "../shared/errors";
import { PolicyCache } from "./rbac_local";

interface OrganizationClaim {
  organization_id: string;
  slug: string;
}

export interface IntrospectTokenRequest {
  token: string;
  client_id: string;
  client_secret?: string;
  token_type_hint?: string;
}

interface IntrospectTokenInactiveResponse {
  active: false;
  request_id: string;
  status_code: number;
}

interface IntrospectTokenActiveResponse {
  active: true;
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
  "https://stytch.com/organization"?: Record<string, string>;
}

type IntrospectTokenResponse =
  | IntrospectTokenActiveResponse
  | IntrospectTokenInactiveResponse;

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
  organization: OrganizationClaim;
}

export class IDP {
  private fetchConfig: fetchConfig;
  private jwtConfig: JwtConfig;
  private jwksClient: jose.JWTVerifyGetKey;
  private policyCache: PolicyCache;

  constructor(
    fetchConfig: fetchConfig,
    jwtConfig: JwtConfig,
    policyCache: PolicyCache
  ) {
    this.fetchConfig = fetchConfig;
    this.jwtConfig = jwtConfig;
    this.jwksClient = jwtConfig.jwks;
    this.policyCache = policyCache;
  }

  async introspectTokenNetwork(
    data: IntrospectTokenRequest,
    options?: {
      authorization_check?: AuthorizationCheck;
    }
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

    let response;
    try {
      response = await request<IntrospectTokenResponse>(fetchConfig, {
        method: "POST",
        url: `/v1/public/${this.jwtConfig.projectID}/oauth2/introspect`,
        dataRaw: new URLSearchParams(params),
      });
    } catch (err) {
      throw new ClientError("token_invalid", "Could not introspect token", err);
    }
    if (!response.active) {
      throw new ClientError("token_invalid", "Token was not active", null);
    }
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
      "https://stytch.com/organization": _organization_claim,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...customClaims
    } = response;

    if (options?.authorization_check) {
      const policy = await this.policyCache.getPolicy();
      const organization_id = (_organization_claim as Record<string, string>)[
        "organization_id"
      ];
      performScopeAuthorizationCheck({
        policy,
        subjectOrgID: organization_id,
        tokenScopes: (_scope as string).trim().split(" "),
        authorizationCheck: options.authorization_check,
      });
    }

    const organization: OrganizationClaim = {
      organization_id: (_organization_claim as Record<string, string>)
        .organization_id,
      slug: (_organization_claim as Record<string, string>).slug,
    };

    return {
      subject: _sub as string,
      scope: _scope as string,
      audience: _aud as string[],
      expires_at: _exp as number,
      issued_at: _iat as number,
      issuer: _iss as string,
      not_before: _nbf as number,
      token_type: _token_type as string,
      organization,
      custom_claims: customClaims,
    };
  }

  async introspectTokenLocal(
    tokenJWT: string,
    options?: {
      clock_tolerance_seconds?: number;
      current_date?: Date;
      authorization_check?: AuthorizationCheck;
    }
  ): Promise<IntrospectTokenClaims> {
    const jwtOptions = {
      audience: this.jwtConfig.projectID,
      issuer: this.jwtConfig.issuers,
      typ: "JWT",
    };
    const now = options?.current_date || new Date();
    let payload;
    try {
      const token = await jose.jwtVerify(tokenJWT, this.jwksClient, {
        ...jwtOptions,
        clockTolerance: options?.clock_tolerance_seconds,
        currentDate: now,
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
      "https://stytch.com/organization": _organization_claim,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...custom_claims
    } = payload;

    if (options?.authorization_check) {
      const policy = await this.policyCache.getPolicy();
      performScopeAuthorizationCheck({
        policy,
        subjectOrgID: (_organization_claim as Record<string, string>)[
          "organization_id"
        ],
        tokenScopes: (_scope as string).trim().split(" "),
        authorizationCheck: options.authorization_check,
      });
    }

    const organization: OrganizationClaim = {
      organization_id: (_organization_claim as Record<string, string>)
        .organization_id,
      slug: (_organization_claim as Record<string, string>).slug,
    };

    return {
      subject: _sub as string,
      expires_at: _exp as number,
      audience: _aud as string[],
      issued_at: _iat as number,
      issuer: _iss as string,
      not_before: _nbf as number,
      scope: _scope as string,
      token_type: "access_token",
      organization,
      custom_claims,
    };
  }
}
