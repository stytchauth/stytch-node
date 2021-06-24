import stytch from "../lib";

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

describe("config errors", () => {
  test("config is not an object", () => {
    expect(() => {
      new stytch.Client(0 as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/Unexpected config type/);
  });

  test("missing project ID", () => {
    expect(() => {
      new stytch.Client({
        project_id: "",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: "test",
      });
    }).toThrow(/Missing "project_id" in config/);
  });

  test("missing secret", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "",
        env: "test",
      });
    }).toThrow(/Missing "secret" in config/);
  });

  test("missing environment", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: "" as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      });
    }).toThrow(/Missing "env" in config/);
  });

  test("unknown environment", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: "development" as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      });
    }).toThrow(/Expected env to be "test" or "live", got "development"/);
  });
});
