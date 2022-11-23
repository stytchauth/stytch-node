
import { Passwords } from "../lib/passwords";
import { request } from "../lib/shared";
import { MOCK_FETCH_CONFIG } from "./helpers";

jest.mock('../lib/shared');
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

describe("passwords.create", () => {
  test("basic", () => {
    return expect(
      passwords.create({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords",
      data: {
        password: "not-a-real-password",
        email: "Ada_Lovelace@example.com",
      },
    });
  })
})

describe("passwords.authenticate", () => {
  test("session", () => {
    return expect(
      passwords.authenticate({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/authenticate",
      data: {
        password: "not-a-real-password",
        email: "Ada_Lovelace@example.com",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      },
    });
  });
  test("no session", () => {
    return expect(
      passwords.authenticate({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/authenticate",
      data: {
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      },
    });
  });
});

describe("passwords.resetByEmailStart", () => {
  test("basic", () => {
    return expect(
      passwords.resetByEmailStart({
        email: "Ada_Lovelace@example.com",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset/start",
      data: {
        email: "Ada_Lovelace@example.com",
      },
    });
  })
  test("pkce", () => {
    return expect(
      passwords.resetByEmailStart({
        email: "Ada_Lovelace@example.com",
        code_challenge: "exmaple_code_challenge",
        locale: "en",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset/start",
      data: {
        code_challenge: "exmaple_code_challenge",
        email: "Ada_Lovelace@example.com",
      },
    });
  })
})

describe("passwords.resetByEmail", () => {
  test("basic", () => {
    return expect(
      passwords.resetByEmail('example-token', "not-a-real-password"))
      .resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset",
      data: {
        token: 'example-token',
        password: "not-a-real-password",
      },
    });
  })
  test("pkce", () => {
    return expect(
      passwords.resetByEmail('example-token', "not-a-real-password",
      {
        code_verifier: "exmaple_code_verifier",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/email/reset",
      data: {
        token: 'example-token',
        password: "not-a-real-password",
        code_verifier: "exmaple_code_verifier",
      },
    });
  })
})

describe("passwords.resetByExistingPassword", () => {
  test("basic", () => {
    return expect(
      passwords.resetByExistingPassword({
        email: "Ada_Lovelace@example.com",
        existing_password: "existing_password",
        new_password: "new_password",
      })
    ).resolves.toMatchObject({
        method: "POST",
        path: "passwords/existing_password/reset",
        data: {
          email: "Ada_Lovelace@example.com",
          existing_password: "existing_password",
          new_password: "new_password",
        },
      });
  })
})

describe("passwords.resetBySession", () => {
  test("basic", () => {
    return expect(
      passwords.resetBySession({
        password: "new_password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/session/reset",
      data: {
        password: "new_password",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      },
    });
  })
})

describe("passwords.strengthCheck", () => {
  test("basic", () => {
    return expect(
      passwords.strengthCheck({
        email: "Ada_Lovelace@example.com",
        password: "not-a-real-password",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/strength_check",
      data: {
        password: "not-a-real-password",
        email: "Ada_Lovelace@example.com",
      },
    });
  })
})

describe("passwords.migrate", () => {
  test("bcrypt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "bcrypt",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "bcrypt",
        hash: "not-a-real-password-hash",
      },
    });
  })
  test("sha1 with appended salt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          append_salt: "not-a-real-salt",
        },
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          append_salt: "not-a-real-salt",
        },
      },
    });
  })
  test("sha1 with prepended salt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          prepend_salt: "not-a-real-salt",
        },
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
        sha_1_config: {
          prepend_salt: "not-a-real-salt",
        },
      },
    });
  })
  test("sha1 with no salt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "sha_1",
        hash: "not-a-real-password-hash",
      },
    });
  })
  test("md5 with appended salt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          append_salt: "not-a-real-salt",
        },
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          append_salt: "not-a-real-salt",
        },
      },
    });
  })
  test("md5 with prepended salt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          prepend_salt: "not-a-real-salt",
        },
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
        md_5_config: {
          prepend_salt: "not-a-real-salt",
        },
      },
    });
  })
  test("md5 with no salt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
      })
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
        hash_type: "md_5",
        hash: "not-a-real-password-hash",
      },
    });
  })
  test("argon2i", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
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
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
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
    });
  }),
  test("argon2id", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
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
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
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
    });
  }),
  test("scrypt", () => {
    return expect(
      passwords.migrate({
        email: "Ada_Lovelace@example.com",
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
    ).resolves.toMatchObject({
      method: "POST",
      path: "passwords/migrate",
      data: {
        email: "Ada_Lovelace@example.com",
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
    });
  })
})
