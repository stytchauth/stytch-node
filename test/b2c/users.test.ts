import { Users, UserSearchIterator, UserSearchOperator } from "../../lib/b2c/users";

import { MOCK_FETCH_CONFIG, mockRequest } from "./helpers";
import { request } from "../../lib/shared";

const users = new Users(MOCK_FETCH_CONFIG);

jest.mock("../../lib/shared");
jest.mock("../../lib/b2c/shared_b2c");

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

describe("users.create", () => {
  test("success", () => {
    return expect(
      users.create({
        email: "sandbox@stytch.com",
        trusted_metadata: { key1: "value1" },
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "users",
      data: {
        email: "sandbox@stytch.com",
        trusted_metadata: { key1: "value1" },
      },
    });
  });
});

describe("users.get", () => {
  test("success", () => {
    return expect(
      users.get("user-test-22222222-2222-4222-8222-222222222222")
    ).resolves.toMatchObject({
      method: "GET",
      path: "users/user-test-22222222-2222-4222-8222-222222222222",
    });
  });
});

describe("users.search", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "users/search",
        data: {
          limit: 200,
          query: {
            operator: UserSearchOperator.OR,
            operands: [
              { filter_name: "status", filter_value: "active" },
              { filter_name: "phone_number_fuzzy", filter_value: "1234" },
            ],
          },
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        results: [
          {
            user_id: "user-live-94c8d0bf-e9bb-4bbf-bc5d-7d1dd035ba0a",
            name: {},
            emails: [],
            phone_numbers: [],
            status: "active",
            created_at: "2021-12-02T02:54:57Z",
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

    const users = new Users({} as any);

    return expect(
      users.search({
        limit: 200,
        query: {
          operator: UserSearchOperator.OR,
          operands: [
            { filter_name: "status", filter_value: "active" },
            { filter_name: "phone_number_fuzzy", filter_value: "1234" },
          ],
        },
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      results: [
        {
          user_id: "user-live-94c8d0bf-e9bb-4bbf-bc5d-7d1dd035ba0a",
          name: {},
          emails: [],
          phone_numbers: [],
          status: "active",
          created_at: new Date("2021-12-02T02:54:57Z"),
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

describe("User Search iteration", () => {
  test("success", async () => {
    const clientMock = { search: jest.fn() };
    const iter = new UserSearchIterator(clientMock as unknown as Users, {});
    /* Before First Call */
    expect(iter.hasNext()).toEqual(true);

    /* First Call */
    clientMock.search.mockResolvedValueOnce({
      results: [1],
      results_metadata: { next_cursor: "cursor-1" },
    });
    expect(await iter.next()).toEqual([1]);
    expect(iter.hasNext()).toEqual(true);
    expect(clientMock.search).toHaveBeenCalledWith({});

    /* Second Call */
    clientMock.search.mockResolvedValueOnce({
      results: [2],
      results_metadata: { next_cursor: "cursor-2" },
    });
    expect(await iter.next()).toEqual([2]);
    expect(iter.hasNext()).toEqual(true);
    expect(clientMock.search).toHaveBeenCalledWith({ cursor: "cursor-1" });

    /* Final Call */
    clientMock.search.mockResolvedValueOnce({
      results: [3],
      results_metadata: { next_cursor: null },
    });
    expect(await iter.next()).toEqual([3]);
    expect(iter.hasNext()).toEqual(false);
    expect(clientMock.search).toHaveBeenCalledWith({ cursor: "cursor-2" });
  });

  test("success- async for loop syntax", async () => {
    const clientMock = { search: jest.fn() };
    const iter = new UserSearchIterator(clientMock as unknown as Users, {});

    clientMock.search
      .mockResolvedValueOnce({
        results: [1],
        results_metadata: { next_cursor: "cursor-1" },
      })
      .mockResolvedValueOnce({
        results: [2],
        results_metadata: { next_cursor: "cursor-2" },
      })
      .mockResolvedValueOnce({
        results: [3],
        results_metadata: { next_cursor: null },
      });

    let allUsers: unknown[] = [];

    for await (const users of iter) {
      allUsers = allUsers.concat(users);
    }

    expect(allUsers).toEqual([1, 2, 3]);
  });
});

describe("users.update", () => {
  test("success", () => {
    return expect(
      users.update("user-test-22222222-2222-4222-8222-222222222222", {
        name: {
          first_name: "First",
          last_name: "Last",
        },
        emails: [{ email: "sandbox@stytch.com" }],
        phone_numbers: [{ phone_number: "+12025550162" }],
      })
    ).resolves.toMatchObject({
      method: "PUT",
      path: "users/user-test-22222222-2222-4222-8222-222222222222",
      data: {
        name: {
          first_name: "First",
          last_name: "Last",
        },
        emails: [{ email: "sandbox@stytch.com" }],
        phone_numbers: [{ phone_number: "+12025550162" }],
      },
    });
  });
});

describe("users.delete", () => {
  test("success", () => {
    return expect(
      users.delete("user-test-22222222-2222-4222-8222-222222222222")
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/user-test-22222222-2222-4222-8222-222222222222",
    });
  });
});

describe("users.getPending", () => {
  test("no arguments", () => {
    return expect(users.getPending()).resolves.toMatchObject({
      method: "GET",
      path: "users/pending",
      params: {},
    });
  });

  test("both arguments", () => {
    return expect(
      users.getPending({
        starting_after_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        limit: 10,
      })
    ).resolves.toMatchObject({
      method: "GET",
      path: "users/pending",
      params: {
        starting_after_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        limit: 10,
      },
    });
  });

  test("empty params object", () => {
    return expect(users.getPending({})).resolves.toMatchObject({
      method: "GET",
      path: "users/pending",
      params: {},
    });
  });
});

describe("users.deleteEmail", () => {
  test("success", () => {
    return expect(
      users.deleteEmail("email-test-33333333-3333-4333-8333-333333333333")
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/emails/email-test-33333333-3333-4333-8333-333333333333",
    });
  });
});

describe("users.deletePhoneNumber", () => {
  test("success", () => {
    return expect(
      users.deletePhoneNumber(
        "phone-number-test-33333333-3333-4333-8333-333333333333"
      )
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/phone_numbers/phone-number-test-33333333-3333-4333-8333-333333333333",
    });
  });
});

describe("users.deleteWebAuthnRegistration", () => {
  test("success", () => {
    return expect(
      users.deleteWebAuthnRegistration(
        "webauthn-registration-test-33333333-3333-4333-8333-333333333333"
      )
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/webauthn_registrations/webauthn-registration-test-33333333-3333-4333-8333-333333333333",
    });
  });
});

describe("users.deleteBiometricRegistration", () => {
  test("success", () => {
    return expect(
      users.deleteBiometricRegistration(
        "biometric-registration-test-33333333-3333-4333-8333-333333333333"
      )
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/biometric_registrations/biometric-registration-test-33333333-3333-4333-8333-333333333333",
    });
  });
});

describe("users.deleteTOTP", () => {
  test("success", () => {
    return expect(
      users.deleteTOTP("totp-test-33333333-3333-4333-8333-333333333333")
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/totps/totp-test-33333333-3333-4333-8333-333333333333",
    });
  });
});

describe("users.deleteCryptoWallet", () => {
  test("success", () => {
    return expect(
      users.deleteCryptoWallet(
        "crypto-wallet-test-33333333-3333-4333-8333-333333333333"
      )
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/crypto_wallets/crypto-wallet-test-33333333-3333-4333-8333-333333333333",
    });
  });
});

describe("users.deletePassword", () => {
  test("success", () => {
    return expect(
      users.deletePassword("password-test-33333333-3333-4333-8333-333333333333")
    ).resolves.toMatchObject({
      method: "DELETE",
      path: "users/passwords/password-test-33333333-3333-4333-8333-333333333333",
    });
  });
});
