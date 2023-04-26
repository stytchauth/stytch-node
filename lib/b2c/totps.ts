import { Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";

export interface TOTP {
  totp_id: string;
  verified: boolean;
  recovery_codes: string[];
}

export interface B2CTOTPsCreateRequest {
  user_id: string;
  expiration_minutes?: number;
}

export interface B2CTOTPsCreateResponse extends BaseResponse {
  totp_id: string;
  secret: string;
  qr_code: string;
  recovery_codes: string[];
  user: User;
  user_id: string;
}

export interface B2CTOTPsAuthenticateRequest {
  user_id: string;
  totp_code: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface B2CTOTPsAuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  totp_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface B2CTOTPsRecoveryCodesRequest {
  user_id: string;
}

export interface B2CTOTPsRecoveryCodesResponse extends BaseResponse {
  user_id: string;
  totps: TOTP[];
}

export interface B2CTOTPsRecoverRequest {
  user_id: string;
  recovery_code: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface B2CTOTPsRecoverResponse extends BaseResponse {
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

  create(data: B2CTOTPsCreateRequest): Promise<B2CTOTPsCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data,
    });
  }

  authenticate(
    data: B2CTOTPsAuthenticateRequest
  ): Promise<B2CTOTPsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }

  recoveryCodes(data: B2CTOTPsRecoveryCodesRequest): Promise<B2CTOTPsRecoveryCodesResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recovery_codes"),
      data,
    });
  }

  recover(data: B2CTOTPsRecoverRequest): Promise<B2CTOTPsRecoverResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("recover"),
      data,
    });
  }
}
