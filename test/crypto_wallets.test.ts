import { CryptoWallets } from "../lib/crypto_wallets";
import { MOCK_FETCH_CONFIG, mockRequest } from "./helpers";

jest.mock("../lib/shared");

describe("cryptowallets.authenticateStart", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "crypto_wallets/authenticate/start",
        data: {
          crypto_wallet_address: "0x1234567890123456789012345678901234567890",
          crypto_wallet_type: "ethereum",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        status_code: 200,
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        user_created: false,
      };
      return { status: 200, data };
    });
    const cryptoWallets = new CryptoWallets(MOCK_FETCH_CONFIG);

    return expect(
      cryptoWallets.authenticateStart({
        crypto_wallet_address: "0x1234567890123456789012345678901234567890",
        crypto_wallet_type: "ethereum",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      status_code: 200,
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      user_created: false,
    });
  });
});

describe("cryptowallets.authenticate", () => {
  test("success", () => {
    mockRequest((req) => {
      expect(req).toEqual({
        method: "POST",
        path: "crypto_wallets/authenticate",
        data: {
          crypto_wallet_address: "0x1234567890123456789012345678901234567890",
          crypto_wallet_type: "ethereum",
          signature: "signature",
        },
      });

      const data = {
        request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
        user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
        status_code: 200,
      };
      return { status: 200, data };
    });
    const cryptoWallets = new CryptoWallets(MOCK_FETCH_CONFIG);

    return expect(
      cryptoWallets.authenticate({
        crypto_wallet_address: "0x1234567890123456789012345678901234567890",
        crypto_wallet_type: "ethereum",
        signature: "signature",
      })
    ).resolves.toMatchObject({
      request_id: "request-id-test-55555555-5555-4555-8555-555555555555",
      user_id: "user-test-d5a3b680-e8a3-40c0-b815-ab79986666d0",
      status_code: 200,
    });
  });
});
