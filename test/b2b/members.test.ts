import { MOCK_FETCH_CONFIG, mockRequest } from "../helpers";
import { Organizations } from "../../lib/b2b/organizations";

jest.mock("../../lib/shared");

const members = new Organizations(MOCK_FETCH_CONFIG).members;

describe("members.create", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "/v1/b2b/organizations/organization-id-1234/members",
        data: {
          email_address: "test@stytch.com",
          create_member_as_pending: true,
          is_breakglass: false,
          mfa_enrolled: true,
          mfa_phone_number: "+1234567890",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_id: "member-id-1234",
        status_code: 200,
      };
      return { status: 200, data };
    });

    return expect(
      members.create({
        organization_id: "organization-id-1234",
        email_address: "test@stytch.com",
        create_member_as_pending: true,
        is_breakglass: false,
        mfa_enrolled: true,
        mfa_phone_number: "+1234567890",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      member_id: "member-id-1234",
      status_code: 200,
    });
  });
});

describe("members.get", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "GET",
        path: "/v1/b2b/organizations/organization-id-1234/member",
        params: {
          organization_id: "organization-id-1234",
          email_address: "test@stytch.com",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_id: "member-id-1234",
        status_code: 200,
      };
      return { status: 200, data };
    });

    return expect(
      members.get({
        organization_id: "organization-id-1234",
        email_address: "test@stytch.com",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      member_id: "member-id-1234",
      status_code: 200,
    });
  });
});

describe("members.update", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "PUT",
        path: "/v1/b2b/organizations/organization-id-1234/members/member-id-1234",
        data: {
          name: "new name",
          is_breakglass: true,
          mfa_enrolled: true,
          mfa_phone_number: "+1234567890",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_id: "member-id-1234",
        status_code: 200,
      };
      return { status: 200, data };
    });

    return expect(
      members.update({
        member_id: "member-id-1234",
        organization_id: "organization-id-1234",
        name: "new name",
        is_breakglass: true,
        mfa_enrolled: true,
        mfa_phone_number: "+1234567890",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      member_id: "member-id-1234",
      status_code: 200,
    });
  });
});

describe("members.search", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "/v1/b2b/organizations/members/search",
        data: {
          organization_ids: ["organization_id"],
          limit: 200,
          query: {
            operator: "OR",
            operands: [
              { filter_name: "member_ids", filter_value: ["member-id-1234"] },
              { filter_name: "statuses", filter_value: ["active", "invited"] },
            ],
          },
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        results: [
          {
            member_id: "member-id-1234",
          },
        ],
        results_metadata: {
          total: 0,
          next_cursor: null,
        },
        status_code: 200,
      };
      return { status: 200, data };
    });

    return expect(
      members.search({
        organization_ids: ["organization_id"],
        limit: 200,
        query: {
          operator: "OR",
          operands: [
            { filter_name: "member_ids", filter_value: ["member-id-1234"] },
            { filter_name: "statuses", filter_value: ["active", "invited"] },
          ],
        },
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      results: [
        {
          member_id: "member-id-1234",
        },
      ],
      results_metadata: {
        total: 0,
        next_cursor: null,
      },
      status_code: 200,
    });
  });
});

describe("members.delete", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "DELETE",
        path: "/v1/b2b/organizations/organization-id-1234/members/member-id-1234",
        data: {},
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_id: "member-id-1234",
        status_code: 200,
      };
      return { status: 200, data };
    });

    return expect(
      members.delete({
        member_id: "member-id-1234",
        organization_id: "organization-id-1234",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      member_id: "member-id-1234",
      status_code: 200,
    });
  });
});

describe("members.deletePhoneNumber", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "DELETE",
<<<<<<< HEAD
        path: "organizations/organization-id-1234/members/mfa_phone_numbers/member-id-1234",
=======
        path: "organizations/organization-id-1234/members/phone_numbers/member-id-1234",
        data: {},
>>>>>>> 473fa55 (Generate stytch-node completely from API definitions + docs)
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_id: "member-id-1234",
        status_code: 200,
      };
      return { status: 200, data };
    });

    return expect(
      members.deletePhoneNumber({
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      member_id: "member-id-1234",
      status_code: 200,
    });
  });
});
