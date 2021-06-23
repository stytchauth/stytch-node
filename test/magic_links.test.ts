import stytch from "../lib/stytch";

function env(name: string): string {
  const val = process.env[name];
  if (val) {
    return val;
  }
  throw new Error(`Missing required environment variable: ${name}`);
}

const client = new stytch.Client({
  project_id: env("PROJECT_ID"),
  secret: env("SECRET"),
  env: "test",
});

describe("magicLinks.authenticate", () => {
  test("success", () => {
    return client.magicLinks
      .authenticate("DOYoip3rvIMMW5lgItikFK-Ak1CfMsgjuiCyI7uuU94=")
      .then((res) => {
        expect(res.status_code).toEqual(200);
        expect(res.user_id).toEqual(
          "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd"
        );
      });
  });

  test("magic link not authorized", () => {
    return client.magicLinks
      .authenticate("3pzjQpgksDlGKWEwUq2Up--hCHC_0oamfLHyfspKDFU=")
      .catch((err) => {
        expect(err.status_code).toEqual(401);
        expect(err.error_type).toEqual("unable_to_auth_magic_link");
        expect(err.error_message).toEqual(
          "Magic link could not be authenticated"
        );
        expect(err.error_url).toEqual("https://stytch.com/docs/api/errors/401");
      });
  });

  test("magic link not found", () => {
    return client.magicLinks
      .authenticate("CprTtwhnRNiMBiUS2jSLcWYrfuO2POeBNdo5HhW6qTM=")
      .catch((err) => {
        expect(err.status_code).toEqual(404);
        expect(err.error_type).toEqual("magic_link_not_found");
        expect(err.error_message).toEqual("Magic Link could not be found");
        expect(err.error_url).toEqual("https://stytch.com/docs/api/errors/404");
      });
  });
});
