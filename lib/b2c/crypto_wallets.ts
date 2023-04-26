import { Session, User } from "./shared_b2c";
import { request, fetchConfig, BaseResponse } from "../shared";
import { UserID } from "./users";

export interface CryptoWalletsAuthenticateStartRequest {
  crypto_wallet_address: string;
  crypto_wallet_type: string;
  user_id?: UserID;
  session_token?: string;
  session_jwt?: string;
}

export interface CryptoWalletsAuthenticateStartResponse extends BaseResponse {
  user_id: UserID;
  challenge: string;
  user_created: boolean;
}

export interface CryptoWalletsAuthenticateRequest {
  crypto_wallet_address: string;
  crypto_wallet_type: string;
  signature: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface CryptoWalletsAuthenticateResponse extends BaseResponse {
  user_id: UserID;
  user: User;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export class CryptoWallets {
  base_path = "crypto_wallets";
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticateStart(
    data: CryptoWalletsAuthenticateStartRequest
  ): Promise<CryptoWalletsAuthenticateStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data,
    });
  }

  authenticate(
    data: CryptoWalletsAuthenticateRequest
  ): Promise<CryptoWalletsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
