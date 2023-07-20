import * as stytch from "../../lib";

describe("B2B Client", () => {
  test("URL is as expected", () => {
    const testClient = new stytch.B2BClient({
      project_id: "project-test-00000000-0000-4000-8000-000000000000",
      secret: "secret-test-11111111-1111-4111-8111-111111111111",
      env: stytch.envs.test,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(testClient.fetchConfig.baseURL).toBe("https://test.stytch.com/");

    const liveClient = new stytch.B2BClient({
      project_id: "project-test-00000000-0000-4000-8000-000000000000",
      secret: "secret-test-11111111-1111-4111-8111-111111111111",
      env: stytch.envs.live,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(liveClient.fetchConfig.baseURL).toBe("https://api.stytch.com/");
  });
});
