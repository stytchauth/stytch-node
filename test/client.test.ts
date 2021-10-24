import * as stytch from "../lib";

describe("config validation", () => {
  test("does not throw when everything is valid", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: stytch.envs.test,
      });
    }).not.toThrow();
  });

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
        env: stytch.envs.test,
      });
    }).toThrow(/Missing "project_id" in config/);
  });

  test("missing secret", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "",
        env: stytch.envs.test,
      });
    }).toThrow(/Missing "secret" in config/);
  });

  test("missing environment", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: "",
      });
    }).toThrow(/Missing "env" in config/);
  });

  test("Invalid HTTPS url for environment", () => {
    expect(() => {
      new stytch.Client({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: "some bad env",
      });
    }).toThrow(/Expected env to start with https:\/\/ but got some bad env. Try passing in stytch.envs.test or stytch.envs.live instead./);
  });
});

describe("backward compatibility", () => {
  // TODO(v4): Remove these deprecated methods.
  test("v2.0 top-level client methods still exist", () => {
    const client = new stytch.Client({
      project_id: "project-test-00000000-0000-4000-8000-000000000000",
      secret: "secret-test-11111111-1111-4111-8111-111111111111",
      env: stytch.envs.test,
    });

    expect(client.createUser).toBeTruthy();
    expect(client.getUser).toBeTruthy();
    expect(client.updateUser).toBeTruthy();
    expect(client.deleteUser).toBeTruthy();
    expect(client.deleteUserEmail).toBeTruthy();
    expect(client.deleteUserPhoneNumber).toBeTruthy();
    expect(client.getPendingUsers).toBeTruthy();
    expect(client.sendMagicLinkByEmail).toBeTruthy();
    expect(client.loginOrCreate).toBeTruthy();
    expect(client.inviteByEmail).toBeTruthy();
    expect(client.revokePendingInvite).toBeTruthy();
    expect(client.authenticateMagicLink).toBeTruthy();
    expect(client.sendOTPBySMS).toBeTruthy();
    expect(client.loginOrCreateUserBySMS).toBeTruthy();
    expect(client.authenticateOTP).toBeTruthy();
  });
});
