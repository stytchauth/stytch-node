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

describeIf(
  "sandbox tests",
  Boolean(process.env["RUN_INTEGRATION_TESTS"]),
  () => {
    const client = new stytch.Client({
      project_id: env("PROJECT_ID"),
      secret: env("SECRET"),
      env: "test",
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
              "Magic link could not be authenticated"
            );
            expect(err.error_url).toEqual(
              "https://stytch.com/docs/api/errors/401"
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
            expect(err.error_message).toEqual("Magic Link could not be found");
            expect(err.error_url).toEqual(
              "https://stytch.com/docs/api/errors/404"
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
  }
);