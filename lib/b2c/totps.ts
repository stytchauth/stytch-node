import { Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";

export interface TOTP {
  totp_id: string;
  verified: boolean;
  recovery_codes: string[];
}

export interface TOTPsCreateRequest {
  user_id: string;
  expiration_minutes?: number;
}

export interface TOTPsCreateResponse extends BaseResponse {
  totp_id: string;
  secret: string;
  qr_code: string;
  recovery_codes: string[];
  user: User;
  user_id: string;
}

export interface TOTPsAuthenticateRequest {
  user_id: string;
  totp_code: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TOTPsAuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  totp_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface RecoveryCodesRequest {
  user_id: string;
}

export interface RecoveryCodesResponse extends BaseResponse {
  user_id: string;
  totps: TOTP[];
}

export interface RecoverRequest {
  user_id: string;
  recovery_code: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface RecoverResponse extends BaseResponse {
  user_id: string;
  user: User;
  totp_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export class TOTPs {
  base_path = "totps";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(data: TOTPsCreateRequest): Promise<TOTPsCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data,
    });
  }

  authenticate(
    data: TOTPsAuthenticateRequest
  ): Promise<TOTPsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }

  recoveryCodes(data: RecoveryCodesRequest): Promise<RecoveryCodesResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recovery_codes"),
      data,
    });
  }

  recover(data: RecoverRequest): Promise<RecoverResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recover"),
      data,
    });
  }
}
