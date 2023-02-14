import { parseUser, Session, User, WithRawUser } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";
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
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthenticateResponse extends BaseResponse {
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

  registerStart(data: RegisterStartRequest): Promise<RegisterStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register/start"),
      data,
    });
  }

  register(data: RegisterRequest): Promise<RegisterResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("register"),
      data,
    });
  }

  authenticateStart(
    data: AuthenticateStartRequest
  ): Promise<AuthenticateStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate/start"),
      data,
    });
  }

  authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<WithRawUser<AuthenticateResponse>>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data,
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }
}
