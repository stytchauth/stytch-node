import stytch = require("../lib");

function env(name: string): string {
  const val = process.env[name];
  if (val) {
    return val;
  }
  throw new Error(`Missing required environment variable: ${name}`);
}

function describeIf(name: string, cond: boolean, fn: () => void): void {
  if (cond) {
    describe(name, fn);
  } else {
    describe.skip(name, fn);
  }
}

// These tests can't be run programmatically (even as integration tests), but it's still useful to
// record their setup and expectations.
describe("manual tests", () => {
  let client: stytch.Client;

  beforeEach(() => {
    client = new stytch.Client({
      project_id: env("PROJECT_ID"),
      secret: env("SECRET"),
      env: process.env["STYTCH_API_URL"] || stytch.envs.test,
    });
  });

  // To run these tests, start a new session (it doesn't matter how) and paste its session_token
  // and session_jwt values here.
  //
  // Do not commit any real tokens to this repo.
  const jwt = "";
  const session_token = "";

  describeIf(
    "session_JWT and session_token parity",
    Boolean(jwt && session_token),
    () => {
      it("long nonzero age -> local only", async () => {
        const plain = await client.sessions.authenticate({ session_token });
        const actual = await client.sessions.authenticateJwt(jwt, {
          max_token_age_seconds: 3600, // one hour
        });

        // These won't actually be equal, so this is expected to fail. These are the expected differences:
        // 1. last_authenticated_at timestamps (~1s)
        // 2. last_accessed_at timestamps (~time since original session_token was printed)
        await expect(actual.session_jwt).toEqual(jwt);
        await expect(actual.session).toEqual(plain.session);
      });

      it("short nonzero age -> remote fallback", async () => {
        const actual = await client.sessions.authenticateJwt(jwt, {
          max_token_age_seconds: 1,
        });
        await expect(actual.session_jwt).not.toEqual(jwt);
      });

      it("zero age -> remote fallback", async () => {
        const actual = await client.sessions.authenticateJwt(jwt, {
          max_token_age_seconds: 0,
        });
        await expect(actual.session_jwt).not.toEqual(jwt);
      });

      it("empty opts -> local only", async () => {
        const actual = await client.sessions.authenticateJwt(jwt, {});
        await expect(actual.session_jwt).toEqual(jwt);
      });

      it("no opts -> local only", async () => {
        const actual = await client.sessions.authenticateJwt(jwt);
        await expect(actual.session_jwt).toEqual(jwt);
      });
    }
  );
});
