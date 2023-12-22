import * as stytch from "../../lib";
import * as undici from "undici";
import { M2MClientWithClientSecret } from "../../lib";

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

describeIf(
  "sandbox tests",
  Boolean(process.env["RUN_INTEGRATION_TESTS"]),
  () => {
    let client: stytch.Client;

    beforeEach(() => {
      client = new stytch.Client({
        project_id: env("PROJECT_ID"),
        secret: env("SECRET"),
        env: process.env["STYTCH_API_URL"] || stytch.envs.test,
      });
    });

    describe("magicLinks.authenticate", () => {
      test("success", () => {
        return client.magicLinks
          .authenticate({
            token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
          })
          .then((res) => {
            expect(res.status_code).toEqual(200);
            expect(res.user_id).toEqual(
              "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd"
            );
          });
      });

      test("magic link not authorized", () => {
        return client.magicLinks
          .authenticate({
            token: "3pzjQpgksDlGKWEwUq2Up--hCHC_0oamfLHyfspKDFU=",
          })
          .catch((err) => {
            expect(err.status_code).toEqual(401);
            expect(err.error_type).toEqual("unable_to_auth_magic_link");
            expect(err.error_message).toEqual(
              "The magic link could not be authenticated because it was either already used or expired. Send another magic link to this user."
            );
            expect(err.error_url).toEqual(
              "https://stytch.com/docs/api/errors/401#unable_to_auth_magic_link"
            );
          });
      });

      test("magic link not found", () => {
        return client.magicLinks
          .authenticate({
            token: "CprTtwhnRNiMBiUS2jSLcWYrfuO2POeBNdo5HhW6qTM=",
          })
          .catch((err) => {
            expect(err.status_code).toEqual(404);
            expect(err.error_type).toEqual("magic_link_not_found");
            expect(err.error_message).toEqual(
              "The magic link could not be authenticated, try sending another magic link to the user."
            );
            expect(err.error_url).toEqual(
              "https://stytch.com/docs/api/errors/404#magic_link_not_found"
            );
          });
      });
    });

    describe("magicLinks.email.send", () => {
      test("success", () => {
        return client.magicLinks.email
          .send({
            email: "sandbox@stytch.com",
            login_magic_link_url: "http://localhost:8000/login",
            signup_magic_link_url: "http://localhost:8000/signup",
          })
          .then((res) => {
            expect(res.status_code).toEqual(200);
            expect(res.user_id).toEqual(
              "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd"
            );
          });
      });
    });

    describe("magicLinks.email.loginOrCreate", () => {
      test("success", () => {
        return client.magicLinks.email
          .loginOrCreate({
            email: "sandbox@stytch.com",
            login_magic_link_url: "http://localhost:8000/login",
            signup_magic_link_url: "http://localhost:8000/signup",
          })
          .then((res) => {
            expect(res.status_code).toEqual(200);
            expect(res.user_id).toEqual(
              "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd"
            );
          });
      });
    });

    describe("magicLinks.email.invite", () => {
      test("success", () => {
        return client.magicLinks.email
          .invite({
            email: "sandbox@stytch.com",
            invite_magic_link_url: "http://localhost:8000/invite",
          })
          .then((res) => {
            expect(res.status_code).toEqual(200);
            expect(res.user_id).toEqual(
              "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd"
            );
          });
      });
    });

    describe("magicLinks.email.revokeInvite", () => {
      test("success", () => {
        return client.magicLinks.email
          .revokeInvite({
            email: "sandbox@stytch.com",
          })
          .then((res) => {
            expect(res.status_code).toEqual(200);
          });
      });
    });

    describe("sessions.authenticate", () => {
      test("success", async () => {
        // Make sure there's a key that can be used to sign the sandbox JWT.
        const jwks = await client.sessions.getJWKS({
          project_id: env("PROJECT_ID"),
        });
        expect(jwks.keys.length).toBeGreaterThan(0);

        await expect(
          client.sessions.authenticate({
            session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
          })
        ).resolves.toMatchObject({
          status_code: 200,
          session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
          session: {
            started_at: "2021-08-28T00:41:58.935673Z",
            user_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
          },
        });
      });

      test("success - local auth", async () => {
        // Make sure there's a key that can be used to sign the sandbox JWT.
        const jwks = await client.sessions.getJWKS({
          project_id: env("PROJECT_ID"),
        });
        expect(jwks.keys.length).toBeGreaterThan(0);

        const resp = await client.sessions.authenticate({
          session_token: "WJtR5BCy38Szd5AfoDpf0iqFKEt4EE5JhjlWUY7l3FtY",
        })

        expect(resp.session_jwt).toBeDefined();

        await expect(
          client.sessions.authenticateJwtLocal({
            session_jwt: resp.session_jwt
          })
        ).resolves.toMatchObject({
          user_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        })
      });

      test("error: not found", () => {
        return expect(
          client.sessions.authenticate({
            session_token: "59cnLELtq5cFVS6uYK9f-pAWzBkhqZl8AvLhbhOvKNWw",
          })
        ).rejects.toMatchObject({
          status_code: 404,
          error_type: "session_not_found",
        });
      });

      test("Using a custom agent", async () => {
        const getSpy = jest.fn();
        getSpy.mockReturnValue(true);
        const dispatcher = new undici.MockAgent();
        dispatcher.get(getSpy);
        client = new stytch.Client({
          project_id: env("PROJECT_ID"),
          secret: env("SECRET"),
          env: process.env["STYTCH_API_URL"] || stytch.envs.test,
          dispatcher,
        });

        await client.magicLinks.authenticate({
          token: "DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=",
        });
        expect(getSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("m2m operations", () => {
      let m2m_client: M2MClientWithClientSecret;

      beforeAll(async () => {
        ({ m2m_client } = await client.m2m.clients.create({
          scopes: ["read:users", "write:users", "pet:cats"],
        }));
      });

      afterAll(async () => {
        await client.m2m.clients.delete({ client_id: m2m_client.client_id });
      });

      it("Can read the client", async () => {
        const { m2m_client: get_response } = await client.m2m.clients.get({
          client_id: m2m_client.client_id,
        });
        expect(m2m_client).toMatchObject(get_response);
      });

      it("Can retrieve a token for the client and validate it locally", async () => {
        const { access_token } = await client.m2m.token({
          client_id: m2m_client.client_id,
          client_secret: m2m_client.client_secret,
        });

        const { scopes } = await client.m2m.authenticateToken({ access_token });
        expect(scopes).toEqual(
          expect.arrayContaining(["read:users", "write:users", "pet:cats"])
        );

        await client.m2m.authenticateToken({
          access_token,
          required_scopes: ["pet:cats"],
        });

        await expect(
          client.m2m.authenticateToken({
            access_token,
            required_scopes: ["pet:dogs"],
          })
        ).rejects.toThrow("Missing required scopes");
      });
    });
  }
);
