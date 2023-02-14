import { WebAuthn } from "../lib/b2c/webauthn";
import { MOCK_FETCH_CONFIG, mockRequest } from "./helpers";

jest.mock("../lib/shared");

describe("webauthn.registerStart", () => {
  test("authenticator_type & user_agent", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "webauthn/register/start",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          domain: "example.com",
          authenticator_type: "platform",
          user_agent:
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        public_key_credential_creation_options:
          '{"attestation":"direct","challenge":"PJntHU5fMXJfF3ObL4Uzlq_eYEw9r_UtQNPYarOuZ2FR","excludeCredentials":[],"pubKeyCredParams":[{"alg":-7,"type":"public-key"}],"rp":{"id":"example.com","name":"Test Project"},"timeout":300000,"user":{"displayName":"Test Project User","id":"dXNlci10ZXN0LXN0YWdpbmctNzI2YWE0Y2MtNTJmNS00ZTU3LThhZjgtZmY3ZDQ5OGIxNTQz","name":"Test Project User"}}',
        status_code: 200,
      };
      return { status: 200, data };
    });
    const webauthn = new WebAuthn(MOCK_FETCH_CONFIG);

    return expect(
      webauthn.registerStart({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        domain: "example.com",
        authenticator_type: "platform",
        user_agent:
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      public_key_credential_creation_options:
        '{"attestation":"direct","challenge":"PJntHU5fMXJfF3ObL4Uzlq_eYEw9r_UtQNPYarOuZ2FR","excludeCredentials":[],"pubKeyCredParams":[{"alg":-7,"type":"public-key"}],"rp":{"id":"example.com","name":"Test Project"},"timeout":300000,"user":{"displayName":"Test Project User","id":"dXNlci10ZXN0LXN0YWdpbmctNzI2YWE0Y2MtNTJmNS00ZTU3LThhZjgtZmY3ZDQ5OGIxNTQz","name":"Test Project User"}}',
    });
  });
  test("only user_id & domain", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "webauthn/register/start",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          domain: "example.com",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        public_key_credential_creation_options:
          '{"attestation":"direct","challenge":"PJntHU5fMXJfF3ObL4Uzlq_eYEw9r_UtQNPYarOuZ2FR","excludeCredentials":[],"pubKeyCredParams":[{"alg":-7,"type":"public-key"}],"rp":{"id":"example.com","name":"Test Project"},"timeout":300000,"user":{"displayName":"Test Project User","id":"dXNlci10ZXN0LXN0YWdpbmctNzI2YWE0Y2MtNTJmNS00ZTU3LThhZjgtZmY3ZDQ5OGIxNTQz","name":"Test Project User"}}',
        status_code: 200,
      };
      return { status: 200, data };
    });
    const webauthn = new WebAuthn(MOCK_FETCH_CONFIG);

    return expect(
      webauthn.registerStart({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        domain: "example.com",
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      public_key_credential_creation_options:
        '{"attestation":"direct","challenge":"PJntHU5fMXJfF3ObL4Uzlq_eYEw9r_UtQNPYarOuZ2FR","excludeCredentials":[],"pubKeyCredParams":[{"alg":-7,"type":"public-key"}],"rp":{"id":"example.com","name":"Test Project"},"timeout":300000,"user":{"displayName":"Test Project User","id":"dXNlci10ZXN0LXN0YWdpbmctNzI2YWE0Y2MtNTJmNS00ZTU3LThhZjgtZmY3ZDQ5OGIxNTQz","name":"Test Project User"}}',
    });
  });
});

describe("webauthn.register", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "webauthn/register",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          public_key_credential:
            '{"type":"public-key","idxx":"AWuLy3DPlOkYijmcwOOLDezxd5TI_xmmrlHACfp8l4lEIzrt1LOTU9X6NYwtskdSii-_48MinrGfvRJOzzFj_qDkCE_s1p-oelqSXyNzlna8oal9M92dWn2nolXbTRp_yZdNpx9928NzEIVMaO6feYZZxs337VMM140","rawId":"AWuLy3DPlOkYijmcwOOLDezxd5TI_xmmrlHACfp8l4lEIzrt1LOTU9X6NYwtskdSii-_48MinrGfvRJOzzFj_qDkCE_s1p-oelqSXyNzlna8oal9M92dWn2nolXbTRp_yZdNpx9928NzEIVMaO6feYZZxs337VMM140","response":{"clientDataJSON":"eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiV2VxZXlCTDlXdGxIMW8tMER5Y1lNZ3FYODM4UHdZTHdwdDN1elFlb1E4SnkiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9","attestationObject":"o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEcwRQIhAPebfmzJVo-17PcBStxY3l9-ZqKhjUCyxtrFE9cxf1JpAiBOcX6dhUgVjUR9zaA890rLgBjpRUrv8t1YiJRFMhJIkmhhdXRoRGF0YVj-SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NFYXh_rq3OAAI1vMYKZIsLJfHwVQMAegFri8twz5TpGIo5nMDjiw3s8XeUyP8Zpq5RwAn6fJeJRCM67dSzk1PV-jWMLbJHUoovv-PDIp6xn70STs8xY_6g5AhP7NafqHpakl8jc5Z2vKGpfTPdnVp9p6JV200af8mXTacffdvDcxCFTGjun3mGWcbN9-1TDNeNpQECAyYgASFYIDs_uAPbmr1FO_nnAKqBHcYGcgOhgsPp-SbNHNrdnjlsIlggjAMm-M6rEpX5QnUppyFRDFFS01Nap5Au1fQVu21HM3s"},"clientExtensionResults":{}}',
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        webauthn_registration_id:
          "webauthn-registration-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        status_code: 200,
      };
      return { status: 200, data };
    });
    const webauthn = new WebAuthn(MOCK_FETCH_CONFIG);

    return expect(
      webauthn.register({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        public_key_credential:
          '{"type":"public-key","idxx":"AWuLy3DPlOkYijmcwOOLDezxd5TI_xmmrlHACfp8l4lEIzrt1LOTU9X6NYwtskdSii-_48MinrGfvRJOzzFj_qDkCE_s1p-oelqSXyNzlna8oal9M92dWn2nolXbTRp_yZdNpx9928NzEIVMaO6feYZZxs337VMM140","rawId":"AWuLy3DPlOkYijmcwOOLDezxd5TI_xmmrlHACfp8l4lEIzrt1LOTU9X6NYwtskdSii-_48MinrGfvRJOzzFj_qDkCE_s1p-oelqSXyNzlna8oal9M92dWn2nolXbTRp_yZdNpx9928NzEIVMaO6feYZZxs337VMM140","response":{"clientDataJSON":"eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiV2VxZXlCTDlXdGxIMW8tMER5Y1lNZ3FYODM4UHdZTHdwdDN1elFlb1E4SnkiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9","attestationObject":"o2NmbXRmcGFja2VkZ2F0dFN0bXSiY2FsZyZjc2lnWEcwRQIhAPebfmzJVo-17PcBStxY3l9-ZqKhjUCyxtrFE9cxf1JpAiBOcX6dhUgVjUR9zaA890rLgBjpRUrv8t1YiJRFMhJIkmhhdXRoRGF0YVj-SZYN5YgOjGh0NBcPZHZgW4_krrmihjLHmVzzuoMdl2NFYXh_rq3OAAI1vMYKZIsLJfHwVQMAegFri8twz5TpGIo5nMDjiw3s8XeUyP8Zpq5RwAn6fJeJRCM67dSzk1PV-jWMLbJHUoovv-PDIp6xn70STs8xY_6g5AhP7NafqHpakl8jc5Z2vKGpfTPdnVp9p6JV200af8mXTacffdvDcxCFTGjun3mGWcbN9-1TDNeNpQECAyYgASFYIDs_uAPbmr1FO_nnAKqBHcYGcgOhgsPp-SbNHNrdnjlsIlggjAMm-M6rEpX5QnUppyFRDFFS01Nap5Au1fQVu21HM3s"},"clientExtensionResults":{}}',
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      webauthn_registration_id:
        "webauthn-registration-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
    });
  });
});

describe("webauthn.authenticateStart", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "webauthn/authenticate/start",
        data: {
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
          domain: "example.com",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        public_key_credential_request_options:
          '{"allowCredentials": [{"id": "AUnfDtA+myCDdumkKnVp2Sk0MIWCPXQVL2mG3h+xQBvLEF+MmNqvj2ZwNIY8id5UHz7ogZKmGgc0mM9yYVhdJNU1n6nIwPBGUuZpr3N18trqXMKxejYYKwCO4BmSHA==","type": "public-key"},],"challenge": "hYZtLNT9SIgZqPnKfbnQX3nCJ7NavTT_S6oC9XREYv0F","rpId": "example.com","timeout": 300000}',
        status_code: 200,
      };
      return { status: 200, data };
    });
    const webauthn = new WebAuthn(MOCK_FETCH_CONFIG);

    return expect(
      webauthn.authenticateStart({
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        domain: "example.com",
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      public_key_credential_request_options:
        '{"allowCredentials": [{"id": "AUnfDtA+myCDdumkKnVp2Sk0MIWCPXQVL2mG3h+xQBvLEF+MmNqvj2ZwNIY8id5UHz7ogZKmGgc0mM9yYVhdJNU1n6nIwPBGUuZpr3N18trqXMKxejYYKwCO4BmSHA==","type": "public-key"},],"challenge": "hYZtLNT9SIgZqPnKfbnQX3nCJ7NavTT_S6oC9XREYv0F","rpId": "example.com","timeout": 300000}',
    });
  });
});

describe("webauthn.authenticate", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "webauthn/authenticate",
        data: {
          public_key_credential:
            '{"type": "public-key","id": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","rawId": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","response": {"authenticatorData": "SZYN5YgOjGh7NBcPZHZgW1_krrmihjLHmVzzuoNcl2MFYZKokg","clientDataJSON": "eyJ2eXBlOjopo2ViYBx0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiWEtEWDVJa25EWEU3by1KQlRkYTNfS1NiTXdmb3dMWDQxMldlNEFDY04tYWgiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9","signature": "MEYCIQDU1FGXEBrq3hsQ2ye1pBcYLMu7zmzLVVdcbs6R21hGyAIhAJmpdBo2Hd7P4Ks9VFKBUYbKSIioMdhl2XIIjWHNKD77","userHandle": "dXNlus1kZXZlbG9wLBC2M2E1MGI0LWEwMGEtNGU3NC89NTJmLTFlOGRhODE2nDBnMw"},"clientExtensionResults": {}}',
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        webauthn_registration_id:
          "webauthn-registration-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        status_code: 200,
      };
      return { status: 200, data };
    });
    const webauthn = new WebAuthn(MOCK_FETCH_CONFIG);

    return expect(
      webauthn.authenticate({
        public_key_credential:
          '{"type": "public-key","id": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","rawId": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","response": {"authenticatorData": "SZYN5YgOjGh7NBcPZHZgW1_krrmihjLHmVzzuoNcl2MFYZKokg","clientDataJSON": "eyJ2eXBlOjopo2ViYBx0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiWEtEWDVJa25EWEU3by1KQlRkYTNfS1NiTXdmb3dMWDQxMldlNEFDY04tYWgiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9","signature": "MEYCIQDU1FGXEBrq3hsQ2ye1pBcYLMu7zmzLVVdcbs6R21hGyAIhAJmpdBo2Hd7P4Ks9VFKBUYbKSIioMdhl2XIIjWHNKD77","userHandle": "dXNlus1kZXZlbG9wLBC2M2E1MGI0LWEwMGEtNGU3NC89NTJmLTFlOGRhODE2nDBnMw"},"clientExtensionResults": {}}',
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      webauthn_registration_id:
        "webauthn-registration-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
    });
  });
  test("session token & duration", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "webauthn/authenticate",
        data: {
          public_key_credential:
            '{"type": "public-key","id": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","rawId": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","response": {"authenticatorData": "SZYN5YgOjGh7NBcPZHZgW1_krrmihjLHmVzzuoNcl2MFYZKokg","clientDataJSON": "eyJ2eXBlOjopo2ViYBx0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiWEtEWDVJa25EWEU3by1KQlRkYTNfS1NiTXdmb3dMWDQxMldlNEFDY04tYWgiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9","signature": "MEYCIQDU1FGXEBrq3hsQ2ye1pBcYLMu7zmzLVVdcbs6R21hGyAIhAJmpdBo2Hd7P4Ks9VFKBUYbKSIioMdhl2XIIjWHNKD77","userHandle": "dXNlus1kZXZlbG9wLBC2M2E1MGI0LWEwMGEtNGU3NC89NTJmLTFlOGRhODE2nDBnMw"},"clientExtensionResults": {}}',
          session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
          session_duration_minutes: 60,
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        webauthn_registration_id:
          "webauthn-registration-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session: {
          started_at: new Date("2021-08-28T00:41:58.935673Z"),
          user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        },
        status_code: 200,
      };
      return { status: 200, data };
    });
    const webauthn = new WebAuthn(MOCK_FETCH_CONFIG);

    return expect(
      webauthn.authenticate({
        public_key_credential:
          '{"type": "public-key","id": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","rawId": "Ab6y28pCs5bVRIzSmrlufidfR57gRlEZ-KSTVGJYdkwAfR_SeaVXvdW6ND_XljM25cXYI-dSwrhjuNsj1L3uC0BHqN3mBQIzSswJneTv08RbDNZOLhjiwOEnQ03uPbL5eA7EcyinClOU_qwPMf5lowW1NSTWtaFvOlY","response": {"authenticatorData": "SZYN5YgOjGh7NBcPZHZgW1_krrmihjLHmVzzuoNcl2MFYZKokg","clientDataJSON": "eyJ2eXBlOjopo2ViYBx0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiWEtEWDVJa25EWEU3by1KQlRkYTNfS1NiTXdmb3dMWDQxMldlNEFDY04tYWgiLCJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJjcm9zc09yaWdpbiI6ZmFsc2V9","signature": "MEYCIQDU1FGXEBrq3hsQ2ye1pBcYLMu7zmzLVVdcbs6R21hGyAIhAJmpdBo2Hd7P4Ks9VFKBUYbKSIioMdhl2XIIjWHNKD77","userHandle": "dXNlus1kZXZlbG9wLBC2M2E1MGI0LWEwMGEtNGU3NC89NTJmLTFlOGRhODE2nDBnMw"},"clientExtensionResults": {}}',
        session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
        session_duration_minutes: 60,
      })
    ).resolves.toMatchObject({
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      webauthn_registration_id:
        "webauthn-registration-test-5c44cc6a-8af7-48d6-8da7-ea821342f5a6",
      session_token: "mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q",
      session: {
        started_at: new Date("2021-08-28T00:41:58.935673Z"),
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      },
    });
  });
});
