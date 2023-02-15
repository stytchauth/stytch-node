import * as stytch from "../../lib";

test("pre-configured environment base URLs", () => {
  expect(stytch.envs.test).toEqual("https://test.stytch.com/v1/");
  expect(stytch.envs.live).toEqual("https://api.stytch.com/v1/");
});

test("configuring a test client", () => {
  new stytch.Client({
    project_id: "project-test-00000000-0000-4000-8000-000000000000",
    secret: "secret-test-11111111-1111-4111-8111-111111111111",
    env: stytch.envs.test,
  });
});

test("configuring a live client", () => {
  new stytch.Client({
    project_id: "project-test-00000000-0000-4000-8000-000000000000",
    secret: "secret-test-11111111-1111-4111-8111-111111111111",
    env: stytch.envs.live,
  });
});
