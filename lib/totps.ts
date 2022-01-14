import { request } from "./shared";

import type { AxiosInstance } from "axios";
import type { BaseResponse, Session } from "./shared";

export interface TOTP {
  totp_id: string;
  verified: boolean;
  recovery_codes: string[];
}

export interface CreateRequest {
  user_id: string;
  expiration_minutes?: number;
}

export interface CreateResponse extends BaseResponse {
  totp_id: string;
  secret: string;
  qr_code: string;
  recovery_codes: string[];
}

export interface AuthenticateRequest {
  user_id: string;
  totp_code: string;
  session_token?: string;
  session_duration_minutes?: number;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  totp_id: string;
  session_token?: string;
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
}

export interface RecoverResponse extends BaseResponse {
  user_id: string;
  totp_id: string;
}

export class TOTPs {
  base_path = "totps";

  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(data: CreateRequest): Promise<CreateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.base_path,
      data,
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }

  recoveryCodes(data: RecoveryCodesRequest): Promise<RecoveryCodesResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("recovery_codes"),
      data,
    });
  }

  recover(data: RecoverRequest): Promise<RecoverResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("recover"),
      data,
    });
  }
}
