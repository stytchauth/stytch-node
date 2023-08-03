import { OTPs } from "../../lib/b2b/otps";
import { MOCK_FETCH_CONFIG } from "../helpers";
import { request } from "../../lib/shared";

jest.mock("../../lib/shared");

beforeEach(() => {
  (request as jest.Mock).mockReset();
  (request as jest.Mock).mockImplementation((_, config) => {
    return Promise.resolve({
      method: config.method,
      path: config.url,
      data: config.data,
      params: config.params,
    });
  });
});

const otps = new OTPs(MOCK_FETCH_CONFIG);

describe("otps.sms.send", () => {
  test("success", () => {
    return expect(
      otps.sms.send({
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
        mfa_phone_number: "555-555-5555",
        locale: "es",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/sms/send",
      data: {
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
        mfa_phone_number: "555-555-5555",
        locale: "es",
      },
    });
  });
});

describe("otps.sms.authenticate", () => {
  test("intermediate session token", () => {
    return expect(
      otps.sms.authenticate({
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
        code: "1234",
        intermediate_session_token: "intermediate-session-token-1234",
        session_duration_minutes: 60,
        set_mfa_enrollment: "enroll",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/sms/authenticate",
      data: {
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
        code: "1234",
        intermediate_session_token: "intermediate-session-token-1234",
        session_duration_minutes: 60,
        set_mfa_enrollment: "enroll",
      },
    });
  });
  test("session", () => {
    return expect(
      otps.sms.authenticate({
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
        code: "1234",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
        set_mfa_enrollment: "unenroll",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "otps/sms/authenticate",
      data: {
        organization_id: "organization-id-1234",
        member_id: "member-id-1234",
        code: "1234",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
        set_mfa_enrollment: "unenroll",
      },
    });
  });
});
