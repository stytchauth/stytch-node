export interface Authorization {
  // A secret token for a given Stytch Session.
  session_token?: string;
  // The JSON Web Token (JWT) for a given Stytch Session.
  session_jwt?: string;
}

export function addAuthorizationHeaders(
  headers: Record<string, string>,
  authorization: Authorization
): void {
  if (authorization.session_token) {
    headers["X-Stytch-Member-Session"] = authorization.session_token;
  }
  if (authorization.session_jwt) {
    headers["X-Stytch-Member-SessionJWT"] = authorization.session_jwt;
  }
}
