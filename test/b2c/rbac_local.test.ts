import {
  performAuthorizationCheck,
  performScopeAuthorizationCheck,
  PolicyCache,
} from "../../lib/b2c/rbac_local";
import { SessionsAuthorizationCheck, ClientError } from "../../lib";
import { MOCK_RBAC_POLICY } from "./rbac_policy";

describe("PolicyCache", () => {
  const FAKE_POLICY = { FAKE: "POLICY" };
  const FAKE_POLICY_2 = { FAKE: "POLICY", TWO: "YES" };

  let policyCache: PolicyCache;
  let policySpy: jest.Mock;
  beforeEach(() => {
    policySpy = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    policyCache = new PolicyCache({ policy: policySpy });
    jest.useFakeTimers().setSystemTime(new Date("2023-10-05T00:00:00.000Z"));
  });

  it("Retrieves a policy and caches it locally", async () => {
    policySpy.mockResolvedValue({ policy: FAKE_POLICY });
    const policy = await policyCache.getPolicy();
    expect(policy).toBe(FAKE_POLICY);
    expect(policySpy).toHaveBeenCalledTimes(1);

    // 2 minutes later, we shouldn't refresh yet
    jest.setSystemTime(new Date("2023-10-05T00:02:00.000Z"));

    const policy2 = await policyCache.getPolicy();
    expect(policy2).toBe(FAKE_POLICY);
    expect(policySpy).toHaveBeenCalledTimes(1);
  });

  it("Updates the cache after MAX_AGE_MS time elapses", async () => {
    policySpy
      .mockResolvedValueOnce({ policy: FAKE_POLICY })
      .mockResolvedValueOnce({ policy: FAKE_POLICY_2 });
    const policy = await policyCache.getPolicy();
    expect(policy).toBe(FAKE_POLICY);
    expect(policySpy).toHaveBeenCalledTimes(1);

    jest.setSystemTime(new Date("2023-10-05T00:10:01.000Z"));

    const policy2 = await policyCache.getPolicy();
    expect(policy2).toBe(FAKE_POLICY_2);
    expect(policySpy).toHaveBeenCalledTimes(2);
  });
});

describe("performAuthorizationCheck", () => {
  type testcase = {
    name: string;
    subjectRoles: string[];
    authorizationCheck: SessionsAuthorizationCheck;
    expectedError?: Error;
  };

  const testCases: testcase[] = [
    {
      name: "Success case - exact match",
      subjectRoles: ["default", "reader"],
      authorizationCheck: {
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - wildcard match",
      subjectRoles: ["default", "wildcard_role"],
      authorizationCheck: {
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - multiple matches",
      subjectRoles: ["default", "reader", "editor"],
      authorizationCheck: {
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - multiple matches II",
      subjectRoles: ["default", "reader", "editor", "wildcard_role"],
      authorizationCheck: {
        resource_id: "images",
        action: "create",
      },
    },
    {
      name: "Failure case - invalid action",
      subjectRoles: ["default", "editor"],
      authorizationCheck: {
        resource_id: "documents",
        action: "delete",
      },
      expectedError: new ClientError(
        "invalid_permissions",
        "User does not have permission to perform the requested action"
      ),
    },
    {
      name: "Failure case - invalid resource",
      subjectRoles: ["default", "editor"],
      authorizationCheck: {
        resource_id: "images",
        action: "write",
      },
      expectedError: new ClientError(
        "invalid_permissions",
        "User does not have permission to perform the requested action"
      ),
    },
  ];

  testCases.forEach((tc) =>
    it(tc.name, () => {
      const fn = () =>
        performAuthorizationCheck({
          policy: MOCK_RBAC_POLICY,
          authorizationCheck: tc.authorizationCheck,
          subjectRoles: tc.subjectRoles,
        });

      if (tc.expectedError) {
        expect(fn).toThrow(tc.expectedError);
      } else {
        expect(fn).not.toThrow();
      }
    })
  );
});

describe("performScopeAuthorizationCheck", () => {
  type testcase = {
    name: string;
    tokenScopes: string[];
    authorizationCheck: SessionsAuthorizationCheck;
    expectedError?: Error;
  };

  const testCases: testcase[] = [
    {
      name: "Success case - exact match",
      tokenScopes: ["read:data"],
      authorizationCheck: {
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - wildcard match",
      tokenScopes: ["wildcard:data"],
      authorizationCheck: {
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - multiple matches",
      tokenScopes: ["read:data", "write:data"],
      authorizationCheck: {
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - multiple matches II",
      tokenScopes: ["read:data", "write:data", "crud:data"],
      authorizationCheck: {
        resource_id: "images",
        action: "create",
      },
    },
    {
      name: "Failure case - invalid action",
      tokenScopes: ["write:data"],
      authorizationCheck: {
        resource_id: "documents",
        action: "delete",
      },
      expectedError: new ClientError(
        "invalid_permissions",
        "User does not have permission to perform the requested action"
      ),
    },
    {
      name: "Failure case - invalid resource",
      tokenScopes: ["crud:data"],
      authorizationCheck: {
        resource_id: "images",
        action: "write",
      },
      expectedError: new ClientError(
        "invalid_permissions",
        "User does not have permission to perform the requested action"
      ),
    },
  ];

  testCases.forEach((tc) =>
    it(tc.name, () => {
      const fn = () =>
        performScopeAuthorizationCheck({
          policy: MOCK_RBAC_POLICY,
          authorizationCheck: tc.authorizationCheck,
          tokenScopes: tc.tokenScopes,
        });

      if (tc.expectedError) {
        expect(fn).toThrow(tc.expectedError);
      } else {
        expect(fn).not.toThrow();
      }
    })
  );
});
