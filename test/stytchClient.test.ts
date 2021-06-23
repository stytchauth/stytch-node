import stytch from "../lib/stytch";

test("available environments and base URLs", () => {
  expect(stytch.envs.test).toEqual("https://test.stytch.com/v1/");
  expect(stytch.envs.live).toEqual("https://api.stytch.com/v1/");
});

test("configuring a basic client", () => {
  new stytch.Client({
    project_id: "project-test-00000000-0000-4000-8000-000000000000",
    secret: "secret-test-11111111-1111-4111-8111-111111111111",
    env: "test",
  });
});
