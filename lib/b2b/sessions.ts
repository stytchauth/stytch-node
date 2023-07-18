import { BaseResponse, request, fetchConfig } from "../shared";
import { B2BAuthenticationFactor, Member, MemberSession } from "./shared_b2b";
import * as jose from "jose";
import { authenticateJwtLocal, JwtConfig } from "../shared/sessions";
import { Organization } from "./organizations";
import { MfaRequired } from "./mfa";

export interface B2BSessionsGetRequest {
  organization_id: string;
  member_id: string;
}

export interface B2BSessionsGetResponse extends BaseResponse {
  member_sessions: MemberSession[];
}

export interface B2BSessionsJwksResponse extends BaseResponse {
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

export interface B2BSessionsAuthenticateRequest {
  session_duration_minutes?: number;
  session_token?: string;
  session_jwt?: string;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface B2BSessionsAuthenticateResponse extends BaseResponse {
  member_session: MemberSession;
  member: Member;
  session_token: string;
  session_jwt: string;
  organization: Organization;
}

export type B2BSessionsRevokeRequest =
  | { member_session_id: string }
  | { session_token: string }
  | { session_jwt: string }
  | { member_id: string };

export type B2BSessionsRevokeResponse = BaseResponse;

export interface B2BSessionsExchangeRequest {
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  locale?: "en" | "es" | "pt-br";
}

export interface B2BSessionsExchangeResponse extends BaseResponse {
  member_id: string;
  member_session: MemberSession | null;
  session_token: string;
  session_jwt: string;
  member: Member;
  organization: Organization;
  member_authenticated: boolean;
  intermediate_session_token: string;
  mfa_required: MfaRequired | null;
}

const organizationClaim = "https://stytch.com/organization";

export class Sessions {
  private base_path = "sessions";
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

  get({
    organization_id,
    member_id,
  }: B2BSessionsGetRequest): Promise<B2BSessionsGetResponse> {
    return request<B2BSessionsGetResponse>(this.fetchConfig, {
      method: "GET",
      url: this.base_path,
      params: { organization_id, member_id },
    });
  }

  jwks(project_id: string): Promise<B2BSessionsJwksResponse> {
    return request(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(`jwks/${project_id}`),
    });
  }

  authenticate(
    data: B2BSessionsAuthenticateRequest
  ): Promise<B2BSessionsAuthenticateResponse> {
    return request<B2BSessionsAuthenticateResponse>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
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
  ): Promise<{ member_session: MemberSession; session_jwt: string }> {
    try {
      const member_session = await this.authenticateJwtLocal(jwt, options);
      return {
        member_session,
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
  ): Promise<MemberSession> {
    const sess = await authenticateJwtLocal(
      this.jwksClient,
      this.jwtOptions,
      jwt,
      options
    );

    const { [organizationClaim]: orgClaimUntyped, ...claims } =
      sess.custom_claims;

    const orgClaim = orgClaimUntyped as { organization_id: string };

    return {
      member_session_id: sess.session_id,
      member_id: sess.sub,
      organization_id: orgClaim.organization_id,
      authentication_factors:
        sess.authentication_factors as B2BAuthenticationFactor[],
      started_at: sess.started_at,
      last_accessed_at: sess.last_accessed_at,
      expires_at: sess.expires_at,
      custom_claims: claims,
    };
  }

  exchange(
    data: B2BSessionsExchangeRequest
  ): Promise<B2BSessionsExchangeResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("exchange"),
      data,
    });
  }

  revoke(data: B2BSessionsRevokeRequest): Promise<B2BSessionsRevokeResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("revoke"),
      data,
    });
  }
}
