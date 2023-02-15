import { Sessions } from "../../lib/b2b/sessions";
import { MOCK_FETCH_CONFIG, mockRequest } from "../helpers";

jest.mock("../../lib/shared");

describe("sessions.get", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "GET",
        path: "sessions",
        params: {
          organization_id:
            "organization-test-11111111-1111-4111-8111-111111111111",
          member_id: "member-test-22222222-2222-4222-8222-222222222222",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        member_sessions: [
          {
            expires_at: "2021-08-30T18:16:53.370383Z",
            last_accessed_at: "2021-08-30T17:16:53.370383Z",
            member_session_id:
              "session-test-33333333-3333-4333-8333-333333333333",
            started_at: "2021-08-28T00:41:58.935673870Z",
            member_id: "member-test-22222222-2222-4222-8222-222222222222",
          },
        ],
        status_code: 200,
      };
      return { status: 200, data };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG);

    return expect(
      sessions.get({
        organization_id:
          "organization-test-11111111-1111-4111-8111-111111111111",
        member_id: "member-test-22222222-2222-4222-8222-222222222222",
      })
    ).resolves.toMatchObject({
      status_code: 200,
      member_sessions: [
        expect.objectContaining({
          expires_at: "2021-08-30T18:16:53.370383Z",
          last_accessed_at: "2021-08-30T17:16:53.370383Z",
          member_id: "member-test-22222222-2222-4222-8222-222222222222",
          member_session_id:
            "session-test-33333333-3333-4333-8333-333333333333",
          started_at: "2021-08-28T00:41:58.935673870Z",
        }),
      ],
    });
  });
});

describe("sessions.authenticate", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "sessions/authenticate",
        data: {
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
          session_duration_minutes: 60,
        },
      });

      const data = {
        request_id: "request-id-test-a8876db0-601a-4251-94bd-79dafe63f4dc",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        member_session: {
          expires_at: "2021-08-30T18:16:53.370383Z",
          last_accessed_at: "2021-08-30T17:16:53.370383Z",
          session_id: "session-test-eb94233f-8800-4ebd-8645-51dc15f9d028",
          started_at: "2021-08-28T00:41:58.935673870Z",
          member_id: "member-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        },
        status_code: 200,
      };
      return { status: 200, data };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG);

    return expect(
      sessions.authenticate({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      member_session: {
        started_at: "2021-08-28T00:41:58.935673870Z",
        member_id: "member-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
      },
    });
  });
});

describe("sessions.revoke", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "sessions/revoke",
        data: {
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        },
      });

      return { status: 200, data: {} };
    });
    const sessions = new Sessions(MOCK_FETCH_CONFIG);

    return expect(
      sessions.revoke({
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toEqual({
      status: 200,
    });
  });
});
