import {
  performAuthorizationCheck,
  RBACCacheManager,
} from "../../lib/b2b/rbac_local";
import { AuthorizationCheck, ClientError, Policy } from "../../lib";
import { MOCK_RBAC_POLICY } from "./rbac_policy";

describe("RBACCacheManager", () => {
  const FAKE_POLICY = { FAKE: "POLICY" };
  const FAKE_POLICY_2 = { FAKE: "POLICY", TWO: "YES" };

  let cacheManager: RBACCacheManager;
  let policySpy: jest.Mock;
  beforeEach(() => {
    policySpy = jest.fn();
    cacheManager = new RBACCacheManager({
      baseURL: "example.com",
      headers: {},
      timeout: 1000,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cacheManager.rbac = { policy: policySpy };
    jest.useFakeTimers().setSystemTime(new Date("2023-10-05T00:00:00.000Z"));
  });

  it("Retrieves a policy and caches it locally", async () => {
    policySpy.mockResolvedValue({ policy: FAKE_POLICY });
    const policy = await cacheManager.getPolicy();
    expect(policy).toBe(FAKE_POLICY);
    expect(policySpy).toHaveBeenCalledTimes(1);

    jest.setSystemTime(new Date("2023-10-05T00:05:00.000Z"));

    const policy2 = await cacheManager.getPolicy();
    expect(policy2).toBe(FAKE_POLICY);
    expect(policySpy).toHaveBeenCalledTimes(1);
  });

  it("Updates the cache after MAX_AGE_MS time elapses", async () => {
    policySpy
      .mockResolvedValueOnce({ policy: FAKE_POLICY })
      .mockResolvedValueOnce({ policy: FAKE_POLICY_2 });
    const policy = await cacheManager.getPolicy();
    expect(policy).toBe(FAKE_POLICY);
    expect(policySpy).toHaveBeenCalledTimes(1);

    jest.setSystemTime(new Date("2023-10-05T00:10:01.000Z"));

    const policy2 = await cacheManager.getPolicy();
    expect(policy2).toBe(FAKE_POLICY_2);
    expect(policySpy).toHaveBeenCalledTimes(2);
  });
});

describe("performAuthorizationCheck", () => {
  type testcase = {
    name: string;
    subjectRoles: string[];
    subjectOrgID: string;
    authzRequest: AuthorizationCheck;
    expectedError?: Error;
  };

  const testCases: testcase[] = [
    {
      name: "Success case - exact match",
      subjectRoles: ["default", "reader"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-123",
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - wildcard match",
      subjectRoles: ["default", "organization_admin"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-123",
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - multiple matches",
      subjectRoles: ["default", "reader", "editor", "organization_admin"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-123",
        resource_id: "documents",
        action: "read",
      },
    },
    {
      name: "Success case - multiple matches II",
      subjectRoles: ["default", "reader", "editor", "organization_admin"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-123",
        resource_id: "images",
        action: "create",
      },
    },
    {
      name: "Failure case - invalid action",
      subjectRoles: ["default", "editor"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-123",
        resource_id: "documents",
        action: "delete",
      },
      expectedError: new ClientError(
        "invalid_permissions",
        "Member does not have permission to perform the requested action"
      ),
    },
    {
      name: "Failure case - invalid resource",
      subjectRoles: ["default", "editor"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-123",
        resource_id: "images",
        action: "write",
      },
      expectedError: new ClientError(
        "invalid_permissions",
        "Member does not have permission to perform the requested action"
      ),
    },
    {
      name: "Failure case - invalid tenancy check",
      subjectRoles: ["default", "reader"],
      subjectOrgID: "organization-123",
      authzRequest: {
        organization_id: "organization-456",
        resource_id: "documents",
        action: "read",
      },
      expectedError: new ClientError(
        "tenancy_mismatch",
        "Member belongs to different organization"
      ),
    },
  ];

  testCases.forEach((tc) =>
    it(tc.name, () => {
      const fn = () =>
        performAuthorizationCheck({
          policy: MOCK_RBAC_POLICY,
          authzRequest: tc.authzRequest,
          subjectOrgID: tc.subjectOrgID,
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
