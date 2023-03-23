import { Sessions } from "../../lib/b2b/sessions";
import { MOCK_FETCH_CONFIG, mockRequest } from "../helpers";
import * as jose from "jose";
import { ClientError } from "../../lib";

jest.mock("../../lib/shared");

function jwtConfig() {
  return {
    projectID: "project-test-00000000-0000-4000-8000-000000000000",
    jwks: jose.createLocalJWKSet({ keys: [] }),
  };
}

describe("sessions.get", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "GET",
        path: "sessions",
        params: {
          organization_id:
            "organization-test-11111111-1111-4111-8111-111111111111",
          member_id: "member-test-22222222-2222-4222-8222-222222222222",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_sessions: [
          {
            expires_at: "2021-08-30T18:16:53.370383Z",
            last_accessed_at: "2021-08-30T17:16:53.370383Z",
            member_session_id:
              "session-test-33333333-3333-4333-8333-333333333333",
            started_at: "2021-08-28T00:41:58.935673870Z",
            member_id: "member-test-22222222-2222-4222-8222-222222222222",
          },
        ],
        status_code: 200,
      };
      return { status: 200, data };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG, jwtConfig());

    return expect(
      sessions.get({
        organization_id:
          "organization-test-11111111-1111-4111-8111-111111111111",
        member_id: "member-test-22222222-2222-4222-8222-222222222222",
      })
    ).resolves.toMatchObject({
      status_code: 200,
      member_sessions: [
        expect.objectContaining({
          expires_at: "2021-08-30T18:16:53.370383Z",
          last_accessed_at: "2021-08-30T17:16:53.370383Z",
          member_id: "member-test-22222222-2222-4222-8222-222222222222",
          member_session_id:
            "session-test-33333333-3333-4333-8333-333333333333",
          started_at: "2021-08-28T00:41:58.935673870Z",
        }),
      ],
    });
  });
});

describe("sessions.authenticate", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "sessions/authenticate",
        data: {
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
          session_duration_minutes: 60,
        },
      });

      const data = {
        request_id: "request-id-test-a8876db0-601a-4251-94bd-79dafe63f4dc",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        member_session: {
          expires_at: "2021-08-30T18:16:53.370383Z",
          last_accessed_at: "2021-08-30T17:16:53.370383Z",
          member_session_id:
            "session-test-eb94233f-8800-4ebd-8645-51dc15f9d028",
          started_at: "2021-08-28T00:41:58.935673870Z",
          member_id: "member-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        },
        status_code: 200,
      };
      return { status: 200, data };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG, jwtConfig());

    return expect(
      sessions.authenticate({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      member_session: {
        started_at: "2021-08-28T00:41:58.935673870Z",
        member_id: "member-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
      },
    });
  });
});

describe("sessions.revoke", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "sessions/revoke",
        data: {
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        },
      });

      return { status: 200, data: {} };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG, jwtConfig());

    return expect(
      sessions.revoke({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toEqual({
      status: 200,
    });
  });
});

describe("sessions.exchange", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "sessions/exchange",
        data: {
          organization_id: "organization-id-1234",
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        },
      });

      return { status: 200, data: {} };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG, jwtConfig());

    return expect(
      sessions.exchange({
        organization_id: "organization-id-1234",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toEqual({ status: 200 });
  });
});

describe("sessions.jwks", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "GET",
        path: "sessions/jwks/project-test-11111111-1111-4111-8111-111111111111",
      });

      return { status: 200, data: {} };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG, jwtConfig());

    return expect(
      sessions.jwks("project-test-11111111-1111-4111-8111-111111111111")
    ).resolves.toEqual({ status: 200 });
  });
});

describe("sessions.authenticateJwt", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "sessions/authenticate",
        data: {
          session_jwt: "stale_jwt",
        },
      });

      const data = {
        request_id: "request-id-test-a8876db0-601a-4251-94bd-79dafe63f4dc",
        session_jwt: "fresh_jwt",
        session: {
          attributes: null,
          expires_at: "2021-08-30T18:16:53.370383Z",
          last_accessed_at: "2021-08-30T17:16:53.370383Z",
          session_id: "session-test-eb94233f-8800-4ebd-8645-51dc15f9d028",
          started_at: "2021-08-28T00:41:58.935673870Z",
          member_id: "member-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        },
        status_code: 200,
      };
      return { status: 200, data };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG, jwtConfig());

    return expect(sessions.authenticateJwt("stale_jwt")).resolves.toMatchObject(
      {
        session_jwt: "fresh_jwt",
        session: {
          started_at: "2021-08-28T00:41:58.935673870Z",
          member_id: "member-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        },
      }
    );
  });
});

/** Format the UTC timestamp truncated to second precision. */
function iso(ts: Date): string {
  const pad = (n: number): string => {
    return n.toString().padStart(2, "0");
  };

  const Y = ts.getUTCFullYear();
  const m = ts.getUTCMonth() + 1;
  const d = ts.getUTCDate();
  const H = ts.getUTCHours();
  const M = ts.getUTCMinutes();
  const S = ts.getUTCSeconds();
  return `${Y}-${pad(m)}-${pad(d)}T${pad(H)}:${pad(M)}:${pad(S)}Z`;
}

function dateAdd(date: Date, seconds: number): Date {
  return new Date(+date + seconds * 1000);
}

describe("sessions.authenticateJwtLocal", () => {
  // The project ID doesn't really matter here, but this at least matches the format. Other IDs
  // in this test come from the sandbox data.
  const projectID = "project-test-00000000-0000-0000-0000-000000000000";

  let sessions: Sessions;
  let jwtWithExpiresAt: string;
  let startedAt: Date;
  let expiresAt: Date;

  beforeEach(async () => {
    // Generate a new key and add it to a local JWKS.
    const keyID = "key0";
    const { publicKey, privateKey } = await jose.generateKeyPair("RS256");

    const jwk = await jose.exportJWK(publicKey);
    const jwks = jose.createLocalJWKSet({ keys: [{ ...jwk, kid: keyID }] });

    sessions = new Sessions(MOCK_FETCH_CONFIG, {
      jwks,
      projectID,
    });

    // Set up timestamps truncated to second-level precision to match the API. The epoch
    // timestamps are used to create the JWT.
    const nowEpoch = Math.floor(+new Date() / 1000);
    startedAt = new Date(nowEpoch * 1000);
    expiresAt = new Date(+startedAt + 2 * 60 * 60 * 1000); // two hours

    // Format the timestamp fields like the API does to check the date parsing.
    const claim = {
      started_at: iso(startedAt),
      last_accessed_at: iso(startedAt),
      expires_at: iso(expiresAt),
      authentication_factors: [
        {
          delivery_method: "email",
          email_factor: {
            email_address: "sandbox@stytch.com",
            email_id: "email-live-cca9d7d0-11b6-4167-9385-d7e0c9a77418",
          },
          last_authenticated_at: iso(startedAt),
          type: "magic_link",
        },
      ],
      id: "session-live-e26a0ccb-0dc0-4edb-a4bb-e70210f43555",
    };

    // And now sign the JWTs.
    jwtWithExpiresAt = await new jose.SignJWT({
      "https://stytch.com/session": claim,
      "https://stytch.com/organization": {
        organization_id:
          "organization-live-bd49f916-180c-46fe-9535-d9acd5e30519",
        slug: "node",
      },
      sub: "member-live-fde03dd1-fff7-4b3c-9b31-ead3fbc224de",

      // Include some custom claims
      a: "A",
      "https://example.com/claim": {
        i: 0,
        s: "foo",
        arr: ["nested", { data: "values" }],
      },
    })
      .setProtectedHeader({
        alg: "RS256",
        kid: keyID,
        typ: "JWT",
      })
      .setIssuedAt(nowEpoch)
      .setNotBefore(nowEpoch)
      .setExpirationTime(nowEpoch + 5 * 60) // five minutes
      .setIssuer(`stytch.com/${projectID}`)
      .setAudience([projectID])
      .sign(privateKey);
  });

  test("extract session data from new-style claims", async () => {
    const session = await sessions.authenticateJwtLocal(jwtWithExpiresAt);
    expect(session).toMatchObject({
      authentication_factors: [
        {
          delivery_method: "email",
          email_factor: {
            email_address: "sandbox@stytch.com",
            email_id: "email-live-cca9d7d0-11b6-4167-9385-d7e0c9a77418",
          },
          last_authenticated_at: iso(startedAt),
          type: "magic_link",
        },
      ],
      expires_at: expiresAt.toISOString(),
      last_accessed_at: iso(startedAt),
      member_session_id: "session-live-e26a0ccb-0dc0-4edb-a4bb-e70210f43555",
      started_at: iso(startedAt),
      member_id: "member-live-fde03dd1-fff7-4b3c-9b31-ead3fbc224de",
    });
  });

  test("clock_tolerance_seconds allows for clock drift", async () => {
    // Say the app clock is ahead of API clock by 10 seconds so we're verifying "before" the
    // not-before time (nbf).
    const appNow = dateAdd(startedAt, -10);

    await expect(
      sessions.authenticateJwtLocal(jwtWithExpiresAt, {
        current_date: appNow,
        clock_tolerance_seconds: 9,
      })
    ).rejects.toHaveProperty("code", "jwt_invalid");

    await expect(
      sessions.authenticateJwtLocal(jwtWithExpiresAt, {
        current_date: appNow,
        clock_tolerance_seconds: 10,
      })
    ).resolves.toHaveProperty(
      "member_id",
      "member-live-fde03dd1-fff7-4b3c-9b31-ead3fbc224de"
    );
  });

  test("errors before not-before time (nbf)", async () => {
    const promise = sessions.authenticateJwtLocal(jwtWithExpiresAt, {
      current_date: dateAdd(startedAt, -1),
    });
    await expect(promise).rejects.toThrow(ClientError);
    await expect(promise).rejects.toHaveProperty("code", "jwt_invalid");
  });

  test("errors after expiration time (exp)", async () => {
    const promise = sessions.authenticateJwtLocal(jwtWithExpiresAt, {
      current_date: dateAdd(expiresAt, +1),
    });
    await expect(promise).rejects.toThrow(ClientError);
    await expect(promise).rejects.toHaveProperty("code", "jwt_invalid");
  });

  test("errors if token is too stale", async () => {
    // Make sure the token validates at an earlier time.
    await expect(
      sessions.authenticateJwtLocal(jwtWithExpiresAt, {
        current_date: dateAdd(startedAt, +3),
        max_token_age_seconds: 5,
      })
    ).resolves.toHaveProperty(
      "member_id",
      "member-live-fde03dd1-fff7-4b3c-9b31-ead3fbc224de"
    );

    const promise = sessions.authenticateJwtLocal(jwtWithExpiresAt, {
      current_date: dateAdd(startedAt, +10),
      max_token_age_seconds: 5,
    });
    await expect(promise).rejects.toThrow(ClientError);
    await expect(promise).rejects.toHaveProperty("code", "jwt_too_old");
  });

  test("zero max_token_age_seconds forces staleness", async () => {
    const promise = sessions.authenticateJwtLocal(jwtWithExpiresAt, {
      current_date: startedAt,
      max_token_age_seconds: 0,
    });
    await expect(promise).rejects.toThrow(ClientError);
    await expect(promise).rejects.toHaveProperty("code", "jwt_too_old");
  });

  test("reject alg=none", async () => {
    jwtWithExpiresAt = new jose.UnsecuredJWT({
      sub: "member-live-fde03dd1-fff7-4b3c-9b31-ead3fbc224de",
    })
      .setIssuedAt()
      .setExpirationTime("2h")
      .setIssuer(`stytch.com/${projectID}`)
      .setAudience([projectID])
      .encode();

    const decoded = jose.UnsecuredJWT.decode(jwtWithExpiresAt);
    expect(decoded.header.alg).toBe("none");

    const promise = sessions.authenticateJwtLocal(jwtWithExpiresAt);
    await expect(promise).rejects.toThrow(ClientError);
    await expect(promise).rejects.toHaveProperty("code", "jwt_invalid");
    // This is part of the unstructured error message and comes directly from jose.
    await expect(promise).rejects.toThrow(/Unsupported "alg" value/);
  });

  test("extract custom claims", async () => {
    const session = await sessions.authenticateJwtLocal(jwtWithExpiresAt);
    expect(session).toMatchObject({
      custom_claims: {
        a: "A",
        "https://example.com/claim": {
          i: 0,
          s: "foo",
          arr: ["nested", { data: "values" }],
        },
      },
    });
  });
});
