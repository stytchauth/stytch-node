import { Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";
import { UserID } from "./users";

export interface B2CWebAuthnRegisterStartRequest {
  user_id: UserID;
  domain: string;
  user_agent?: string;
  authenticator_type?: string;
}

export interface B2CWebAuthnRegisterStartResponse extends BaseResponse {
  user_id: UserID;
  public_key_credential_creation_options: string;
}

export interface B2CWebAuthnRegisterRequest {
  user_id: UserID;
  public_key_credential: string;
}

export interface B2CWebAuthnRegisterResponse extends BaseResponse {
  user_id: UserID;
  webauthn_registration_id: string;
}

export interface B2CWebAuthnAuthenticateStartRequest {
  user_id: UserID;
  domain: string;
}

export interface B2CWebAuthnAuthenticateStartResponse extends BaseResponse {
  user_id: UserID;
  public_key_credential_request_options: string;
}

export interface B2CWebAuthnAuthenticateRequest {
  public_key_credential: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface B2CWebAuthnAuthenticateResponse extends BaseResponse {
  user_id: UserID;
  user: User;
  webauthn_registration_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export class WebAuthn {
  base_path = "webauthn";
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  registerStart(
    data: B2CWebAuthnRegisterStartRequest
  ): Promise<B2CWebAuthnRegisterStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register/start"),
      data,
    });
  }

  register(
    data: B2CWebAuthnRegisterRequest
  ): Promise<B2CWebAuthnRegisterResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register"),
      data,
    });
  }

  authenticateStart(
    data: B2CWebAuthnAuthenticateStartRequest
  ): Promise<B2CWebAuthnAuthenticateStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data,
    });
  }

  authenticate(
    data: B2CWebAuthnAuthenticateRequest
  ): Promise<B2CWebAuthnAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    });
  }
}
