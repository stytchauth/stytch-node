import * as stytch from "../../lib";

describe("config errors", () => {
  test("config is not an object", () => {
    expect(() => {
      new stytch.B2BClient(0 as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/Unexpected config type/);
  });

  test("missing project ID", () => {
    expect(() => {
      new stytch.B2BClient({
        project_id: "",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: stytch.envs.test,
      });
    }).toThrow(/Missing "project_id" in config/);
  });

  test("missing secret", () => {
    expect(() => {
      new stytch.B2BClient({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "",
        env: stytch.envs.test,
      });
    }).toThrow(/Missing "secret" in config/);
  });

  test("missing environment", () => {
    expect(() => {
      new stytch.B2BClient({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: "",
      });
    }).toThrow(/Missing "env" in config/);
  });
});
