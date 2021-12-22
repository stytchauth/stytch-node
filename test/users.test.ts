import axios from "axios";
import { Users, UserSearchIterator, UserSearchOperator } from "../lib/users";

import type { AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = (config: AxiosRequestConfig): Promise<any> => {
  return Promise.resolve({
    data: {
      method: config.method,
      path: config.url,
      data: config.data && JSON.parse(config.data),
      params: config.params,
    },
  });
};
const users = new Users(axios.create({ adapter }));

describe("users.create", () => {
  test("success", () => {
    return expect(
      users.create({
        email: "sandbox@stytch.com",
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "users",
      data: {
        email: "sandbox@stytch.com",
      },
    });
  });
});

describe("users.get", () => {
  test("success", () => {
    return expect(
      users.get("user-test-22222222-2222-4222-8222-222222222222")
    ).resolves.toMatchObject({
      method: "get",
      path: "users/user-test-22222222-2222-4222-8222-222222222222",
    });
  });
});

describe("users.search", () => {
  test("success", () => {
    return expect(
      users.search({
        limit: 200,
        query: {
          operator: UserSearchOperator.OR,
          operands: [
            { filter: "status", status: "active" },
            { filter: "phone_number_fuzzy", phone_number_fuzzy: "1234" }
          ]
        }
      })
    ).resolves.toMatchObject({
      method: "post",
      path: "users/search",
      data: {
        limit: 200,
        query: {
          operator: UserSearchOperator.OR,
          operands: [
            { filter: "status", status: "active" },
            { filter: "phone_number_fuzzy", phone_number_fuzzy: "1234" }
          ]
        }
      }
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
      results_metadata: { next_cursor: "cursor-1" }
    });
    expect(await iter.next()).toEqual([1]);
    expect(iter.hasNext()).toEqual(true);
    expect(clientMock.search).toHaveBeenCalledWith({});

    /* Second Call */
    clientMock.search.mockResolvedValueOnce({
      results: [2],
      results_metadata: { next_cursor: "cursor-2" }
    });
    expect(await iter.next()).toEqual([2]);
    expect(iter.hasNext()).toEqual(true);
    expect(clientMock.search).toHaveBeenCalledWith({cursor: "cursor-1"});

    /* Final Call */
    clientMock.search.mockResolvedValueOnce({
      results: [3],
      results_metadata: { next_cursor: null }
    });
    expect(await iter.next()).toEqual([3]);
    expect(iter.hasNext()).toEqual(false);
    expect(clientMock.search).toHaveBeenCalledWith({cursor: "cursor-2"});
  });

  test("success- async for loop syntax", async () => {
    const clientMock = { search: jest.fn() };
    const iter = new UserSearchIterator(clientMock as unknown as Users, {});

    clientMock.search
      .mockResolvedValueOnce({ results: [1], results_metadata: { next_cursor: "cursor-1" } })
      .mockResolvedValueOnce({ results: [2], results_metadata: { next_cursor: "cursor-2" } })
      .mockResolvedValueOnce({ results: [3], results_metadata: { next_cursor: null } });

    let allUsers: unknown[] = [];

    for await(const users of iter) {
      allUsers = allUsers.concat(users)
    }

    expect(allUsers).toEqual([1, 2, 3])
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
      method: "put",
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
      method: "delete",
      path: "users/user-test-22222222-2222-4222-8222-222222222222",
    });
  });
});

describe("users.getPending", () => {
  test("no arguments", () => {
    return expect(users.getPending()).resolves.toMatchObject({
      method: "get",
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
      method: "get",
      path: "users/pending",
      params: {
        starting_after_id: "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
        limit: 10,
      },
    });
  });

  test("empty params object", () => {
    return expect(users.getPending({})).resolves.toMatchObject({
      method: "get",
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
      method: "delete",
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
      method: "delete",
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
      method: "delete",
      path: "users/webauthn_registrations/webauthn-registration-test-33333333-3333-4333-8333-333333333333",
    });
  });
});
