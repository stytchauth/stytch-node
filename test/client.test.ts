import * as stytch from "../lib";

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
        env: "",
      });
    }).toThrow(/Missing "env" in config/);
  });
});

describe("backward compatibility", () => {
  // TODO(v3): Remove these deprecated methods.
  test("v2.0 top-level methods", () => {
    const client = new stytch.Client({
      project_id: "project-test-00000000-0000-4000-8000-000000000000",
      secret: "secret-test-11111111-1111-4111-8111-111111111111",
      env: "test",
    });

    expect(client.createUser).toBe(client.users.create);
    expect(client.getUser).toBe(client.users.get);
    expect(client.updateUser).toBe(client.users.update);
    expect(client.deleteUser).toBe(client.users.delete);
    expect(client.deleteUserEmail).toBe(client.users.deleteEmail);
    expect(client.deleteUserPhoneNumber).toBe(client.users.deletePhoneNumber);
    expect(client.getPendingUsers).toBe(client.users.getPending);
    expect(client.sendMagicLinkByEmail).toBe(client.magicLinks.email.send);
    expect(client.loginOrCreate).toBe(client.magicLinks.email.loginOrCreate);
    expect(client.inviteByEmail).toBe(client.magicLinks.email.invite);
    expect(client.revokePendingInvite).toBe(
      client.magicLinks.email.revokeInvite
    );
    expect(client.authenticateMagicLink).toBe(client.magicLinks.authenticate);
    expect(client.sendOTPBySMS).toBe(client.otps.sms.send);
    expect(client.loginOrCreateUserBySMS).toBe(client.otps.sms.loginOrCreate);
    expect(client.authenticateOTP).toBe(client.otps.authenticate);
  });
});
