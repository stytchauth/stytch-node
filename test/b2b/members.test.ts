import { Members } from "../../lib/b2b/members";
import { MOCK_FETCH_CONFIG, mockRequest } from "../helpers";
import { SearchOperator } from "../../lib/b2b/shared_b2b";

jest.mock("../../lib/shared");

const members = new Members(MOCK_FETCH_CONFIG, "organizations");

describe("members.create", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "organizations/organization-id-1234/members",
        data: {
          organization_id: "organization-id-1234",
          email_address: "test@stytch.com",
          create_member_as_pending: true,
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
        path: "organizations/organization-id-1234/members/member-id-1234",
        data: {
          member_id: "member-id-1234",
          organization_id: "organization-id-1234",
          name: "new name",
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
        path: "organizations/members/search",
        data: {
          organization_ids: ["organization_id"],
          limit: 200,
          query: {
            operator: SearchOperator.OR,
            operands: [
              { filter_name: "member_ids", filter_value: ["member-id-1234"] },
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
          operator: SearchOperator.OR,
          operands: [
            { filter_name: "member_ids", filter_value: ["member-id-1234"] },
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
        path: "organizations/organization-id-1234/members/member-id-1234",
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
