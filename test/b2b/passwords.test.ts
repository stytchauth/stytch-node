import { Passwords } from "../../lib/b2b/passwords";
import { request } from "../../lib/shared";
import { MOCK_FETCH_CONFIG } from "../helpers";

jest.mock("../../lib/shared");
jest.mock("../../lib/b2b/shared_b2b");

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

const passwords = new Passwords(MOCK_FETCH_CONFIG);

describe("passwords.authenticate", () => {
  test("session", () => {
    return expect(
      passwords.authenticate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/authenticate",
      data: {
        organization_id: "organization-id-1234",
        password: "not-a-real-password",
        email_address: "Ada_Lovelace@example.com",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      },
      params: undefined,
    });
  });
  test("no session", () => {
    return expect(
      passwords.authenticate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/authenticate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      },
      params: undefined,
    });
  });
});

describe("passwords.emailResetStart", () => {
  test("basic", () => {
    return expect(
      passwords.resetByEmailStart({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/email/reset/start",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
      },
      params: undefined,
    });
  });
  test("pkce", () => {
    return expect(
      passwords.resetByEmailStart({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        code_challenge: "example_code_challenge",
        locale: "en",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/email/reset/start",
      data: {
        organization_id: "organization-id-1234",
        code_challenge: "example_code_challenge",
        email_address: "Ada_Lovelace@example.com",
        locale: "en",
      },
      params: undefined,
    });
  });
});

describe("passwords.emailReset", () => {
  test("basic", () => {
    return expect(
      passwords.resetByEmail({
        password_reset_token: "example-token",
        password: "not-a-real-password",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/email/reset",
      data: {
        password_reset_token: "example-token",
        password: "not-a-real-password",
      },
      params: undefined,
    });
  });
  test("pkce", () => {
    return expect(
      passwords.resetByEmail({
        password_reset_token: "example-token",
        password: "not-a-real-password",
        code_verifier: "example_code_verifier",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/email/reset",
      data: {
        password_reset_token: "example-token",
        password: "not-a-real-password",
        code_verifier: "example_code_verifier",
      },
      params: undefined,
    });
  });
});

describe("passwords.existingPasswordReset", () => {
  test("basic", () => {
    return expect(
      passwords.resetByExistingPassword({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        existing_password: "existing_password",
        new_password: "new_password",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/existing_password/reset",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        existing_password: "existing_password",
        new_password: "new_password",
      },
      params: undefined,
    });
  });
});

describe("passwords.sessionReset", () => {
  test("basic", () => {
    return expect(
      passwords.resetBySession({
        organization_id: "organization-id-1234",
        password: "new_password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/session/reset",
      data: {
        organization_id: "organization-id-1234",
        password: "new_password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      },
      params: undefined,
    });
  });
});

describe("passwords.strengthCheck", () => {
  test("basic", () => {
    return expect(
      passwords.strengthCheck({
        email_address: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/strength_check",
      data: {
        password: "not-a-real-password",
        email_address: "Ada_Lovelace@example.com",
      },
      params: undefined,
    });
  });
});

describe("passwords.migrate", () => {
  test("phpass", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "phpass",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "phpass",
        hash: "not-a-real-password-hash",
      },
      params: undefined,
    });
  });
  test("bcrypt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "bcrypt",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "bcrypt",
        hash: "not-a-real-password-hash",
      },
      params: undefined,
    });
  });
  test("sha1 with appended salt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          append_salt: "not-a-real-salt",
        },
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          append_salt: "not-a-real-salt",
        },
      },
      params: undefined,
    });
  });
  test("sha1 with prepended salt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          prepend_salt: "not-a-real-salt",
        },
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          prepend_salt: "not-a-real-salt",
        },
      },
      params: undefined,
    });
  });
  test("sha1 with no salt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
      },
      params: undefined,
    });
  });
  test("md5 with appended salt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          append_salt: "not-a-real-salt",
        },
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          append_salt: "not-a-real-salt",
        },
      },
      params: undefined,
    });
  });
  test("md5 with prepended salt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          prepend_salt: "not-a-real-salt",
        },
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          prepend_salt: "not-a-real-salt",
        },
      },
      params: undefined,
    });
  });
  test("md5 with no salt", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
      },
      params: undefined,
    });
  });
  test("argon2i", () => {
    return expect(
      passwords.migrate({
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "argon_2i",
        hash: "not-a-real-password-hash",
        argon_2_config: {
          salt: "not-a-real-salt",
          iteration_amount: 2,
          memory: 1048576,
          threads: 1,
          key_length: 32,
        },
      })
    ).resolves.toEqual({
      method: "POST",
      path: "passwords/migrate",
      data: {
        organization_id: "organization-id-1234",
        email_address: "Ada_Lovelace@example.com",
        hash_type: "argon_2i",
        hash: "not-a-real-password-hash",
        argon_2_config: {
          salt: "not-a-real-salt",
          iteration_amount: 2,
          memory: 1048576,
          threads: 1,
          key_length: 32,
        },
      },
      params: undefined,
    });
  }),
    test("argon2id", () => {
      return expect(
        passwords.migrate({
          organization_id: "organization-id-1234",
          email_address: "Ada_Lovelace@example.com",
          hash_type: "argon_2id",
          hash: "not-a-real-password-hash",
          argon_2_config: {
            salt: "not-a-real-salt",
            iteration_amount: 2,
            memory: 1048576,
            threads: 1,
            key_length: 32,
          },
        })
      ).resolves.toEqual({
        method: "POST",
        path: "passwords/migrate",
        data: {
          organization_id: "organization-id-1234",
          email_address: "Ada_Lovelace@example.com",
          hash_type: "argon_2id",
          hash: "not-a-real-password-hash",
          argon_2_config: {
            salt: "not-a-real-salt",
            iteration_amount: 2,
            memory: 1048576,
            threads: 1,
            key_length: 32,
          },
        },
        params: undefined,
      });
    }),
    test("scrypt", () => {
      return expect(
        passwords.migrate({
          organization_id: "organization-id-1234",
          email_address: "Ada_Lovelace@example.com",
          hash_type: "scrypt",
          hash: "not-a-real-password-hash",
          scrypt_config: {
            salt: "not-a-real-salt",
            n_parameter: 16384,
            r_parameter: 8,
            p_parameter: 1,
            key_length: 32,
          },
        })
      ).resolves.toEqual({
        method: "POST",
        path: "passwords/migrate",
        data: {
          organization_id: "organization-id-1234",
          email_address: "Ada_Lovelace@example.com",
          hash_type: "scrypt",
          hash: "not-a-real-password-hash",
          scrypt_config: {
            salt: "not-a-real-salt",
            n_parameter: 16384,
            r_parameter: 8,
            p_parameter: 1,
            key_length: 32,
          },
        },
        params: undefined,
      });
    }),
    test("pbkdf_2", () => {
      return expect(
        passwords.migrate({
          organization_id: "organization-id-1234",
          email_address: "Ada_Lovelace@example.com",
          hash_type: "pbkdf_2",
          hash: "not-a-real-password-hash",
          pbkdf_2_config: {
            salt: "not-a-real-salt",
            iteration_amount: 10000,
            key_length: 32,
          },
        })
      ).resolves.toMatchObject({
        method: "POST",
        path: "passwords/migrate",
        data: {
          organization_id: "organization-id-1234",
          email_address: "Ada_Lovelace@example.com",
          hash_type: "pbkdf_2",
          hash: "not-a-real-password-hash",
          pbkdf_2_config: {
            salt: "not-a-real-salt",
            iteration_amount: 10000,
            key_length: 32,
          },
        },
      });
    });
});
