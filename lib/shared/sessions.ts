import * as jose from "jose";
import { ClientError } from "./errors";

const sessionClaim = "https://stytch.com/session";

export interface JwtConfig {
  projectID: string;
  jwks: jose.JWTVerifyGetKey;
}

type SessionClaim = {
  id: string;
  started_at: string;
  last_accessed_at: string;
  expires_at: string;
  attributes: unknown;
  authentication_factors: unknown;
};

// An IntermediateSession can be either a MemberSession or a UserSession
type IntermediateSession = {
  // The JWT subject - either a user_id or a member_id
  sub: string;
  session_id: string;
  attributes: unknown;
  authentication_factors: unknown;
  started_at: string;
  last_accessed_at: string;
  expires_at: string;
  custom_claims: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export async function authenticateJwtLocal(
  jwksClient: jose.JWTVerifyGetKey,
  jwtOptions: jose.JWTVerifyOptions,
  jwt: string,
  options?: {
    clock_tolerance_seconds?: number;
    max_token_age_seconds?: number;
    current_date?: Date;
  }
): Promise<IntermediateSession> {
  const now = options?.current_date || new Date();

  let payload;
  try {
    const token = await jose.jwtVerify(jwt, jwksClient, {
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
        `JWT was issued at ${iat}, more than ${maxTokenAge} seconds ago`
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

    sub: payload.sub || "",

    // The JWT expiration time is the same as the session's.
    // The exp claim is a Unix timestamp in seconds, so convert it to milliseconds first. The
    // other timestamps are RFC3339-formatted strings.
    started_at: claim.started_at,
    last_accessed_at: claim.last_accessed_at,
    // For JWTs that include it, prefer the inner expires_at claim.
    expires_at: new Date(
      claim.expires_at || (payload.exp || 0) * 1000
    ).toISOString(),

    custom_claims: customClaims,
  };
}
