import { request, Session } from "./shared";

import type { AxiosInstance } from "axios";
import type { BaseResponse } from "./shared";
import { UserID } from "./users";

export interface RegisterStartRequest {
  user_id: UserID;
  domain: string;
  user_agent?: string;
  authenticator_type?: string;
}

export interface RegisterStartResponse extends BaseResponse {
  user_id: UserID;
  public_key_credential_creation_options: string;
}

export interface RegisterRequest {
  user_id: UserID;
  public_key_credential: string;
}

export interface RegisterResponse extends BaseResponse {
  user_id: UserID;
  webauthn_registration_id: string;
}

export interface AuthenticateStartRequest {
  user_id: UserID;
  domain: string;
}

export interface AuthenticateStartResponse extends BaseResponse {
  user_id: UserID;
  public_key_credential_request_options: string;
}

export interface AuthenticateRequest {
  public_key_credential: string;
  session_token?: string;
  session_duration_minutes?: number;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: UserID;
  webauthn_registration_id: string;
  session_token?: string;
  session?: Session;
}

export class WebAuthn {
  base_path = "webauthn";
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  registerStart(data: RegisterStartRequest): Promise<RegisterStartResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("register/start"),
      data,
    });
  }

  register(data: RegisterRequest): Promise<RegisterResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("register"),
      data,
    });
  }

  authenticateStart(
    data: AuthenticateStartRequest
  ): Promise<AuthenticateStartResponse> {
    return request(this.client, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
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
}
