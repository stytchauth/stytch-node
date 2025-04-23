import * as stytch from "../../lib";
import { BaseClient } from "../../lib/shared/client";

describe("config errors", () => {
  test("config is not an object", () => {
    expect(() => {
      new BaseClient(0 as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }).toThrow(/Unexpected config type/);
  });

  test("missing project ID", () => {
    expect(() => {
      new BaseClient({
        project_id: "",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        env: stytch.envs.test,
      });
    }).toThrow(/Missing "project_id" in config/);
  });

  test("missing secret", () => {
    expect(() => {
      new BaseClient({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "",
        env: stytch.envs.test,
      });
    }).toThrow(/Missing "secret" in config/);
  });
});

describe("base client config warnings", () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("warns when both env and base_url are provided", () => {
    new BaseClient({
      project_id: "project-test-123",
      secret: "supersecret",
      env: "https://test.stytch.com",
      base_url: "https://override.stytch.com",
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Both 'env' and 'base_url' were provided")
    );
  });

  it("warns when a non-standard env is used", () => {
    new BaseClient({
      project_id: "project-test-456",
      secret: "anothersecret",
      env: "https://custom.stytch.com",
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("custom 'env' value")
    );
  });

  it("does not warn when only base_url is provided", () => {
    new BaseClient({
      project_id: "project-test-789",
      secret: "secret",
      base_url: "https://override.stytch.com",
    });

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("does not warn when only a valid env is provided (test)", () => {
    new BaseClient({
      project_id: "project-test-101",
      secret: "secret",
      env: stytch.envs.test,
    });

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("does not warn when only a valid env is provided (live)", () => {
    new BaseClient({
      project_id: "project-live-101",
      secret: "secret",
      env: stytch.envs.live,
    });

    expect(console.warn).not.toHaveBeenCalled();
  });

  describe("config variables", () => {
    test("custom base_url is used", () => {
      const baseClient = new BaseClient({
        project_id: "project-test-00000000-0000-4000-8000-000000000000",
        secret: "secret-test-11111111-1111-4111-8111-111111111111",
        base_url: "https://cname.customer.com/",
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(baseClient.fetchConfig.baseURL).toBe(
        "https://cname.customer.com/"
      );
    });
  });
});
