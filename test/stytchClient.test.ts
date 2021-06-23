import stytch from "../lib/stytch";

test("available environments and base URLs", () => {
  expect(stytch.envs.test).toEqual("https://test.stytch.com/v1/");
  expect(stytch.envs.live).toEqual("https://api.stytch.com/v1/");
});

test("a client can be made for available environments", () => {
  const project_id = "TODO: project_id";
  const secret = "TODO: secret";
  new stytch.Client({ project_id, secret, env: "live" });
  new stytch.Client({ project_id, secret, env: "test" });
});
