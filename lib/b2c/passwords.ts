import { Attributes, Name, Session, User } from "./shared_b2c";
import { request, BaseResponse, fetchConfig } from "../shared";
import { UserMetadata } from "./users";
import * as shared from "../shared/passwords";

export interface PasswordsCreateRequest {
  email: string;
  password: string;
  name?: Name;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  trusted_metadata?: UserMetadata;
  untrusted_metadata?: UserMetadata;
}

export interface PasswordsCreateResponse extends BaseResponse {
  user_id: string;
  user: User;
  email_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface PasswordsAuthenticateRequest {
  email: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface PasswordsAuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface ResetByEmailStartRequest {
  email: string;
  login_redirect_url?: string;
  reset_password_redirect_url?: string;
  reset_password_expiration_minutes?: number;
  reset_password_template_id?: string;
  attributes?: Attributes;
  code_challenge?: string;
  locale?: string;
}

export interface ResetByEmailStartResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface ResetByEmailRequest {
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
  attributes?: Attributes;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface ResetByEmailResponse extends BaseResponse {
  user_id: string;
  user: User;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface ResetByExistingPasswordRequest {
  email: string;
  existing_password: string;
  new_password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ResetByExistingPasswordResponse extends BaseResponse {
  user_id: string;
  user: User;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface ResetBySessionRequest {
  password: string;
  session_token?: string;
  session_jwt?: string;
}

export interface ResetBySessionResponse extends BaseResponse {
  user_id: string;
  user: User;
  session: Session;
}

export interface StrengthCheckRequest {
  email?: string;
  password: string;
}

export interface StrengthCheckResponse extends BaseResponse {
  valid_password: boolean;
  score: number;
  breached_password: boolean;
  strength_policy: string;
  breach_detection_on_create: boolean;
  feedback: {
    suggestions: string[];
    warning: string;
    luds_requirements: {
      has_lower_case: boolean;
      has_upper_case: boolean;
      has_digit: boolean;
      has_symbol: boolean;
      missing_complexity: number;
      missing_characters: number;
    };
  };
}

interface MigrateRequestBase {
  email: string;
  hash: string;
  name?: Name;
  trusted_metadata?: UserMetadata;
  untrusted_metadata?: UserMetadata;
}

export type MigrateRequest =
  | (shared.MD5MigrateRequest & MigrateRequestBase)
  | (shared.BcryptMigrateRequest & MigrateRequestBase)
  | (shared.Argon2IMigrateRequest & MigrateRequestBase)
  | (shared.Argon2IDMigrateRequest & MigrateRequestBase)
  | (shared.SHA1MigrateRequest & MigrateRequestBase)
  | (shared.ScryptMigrateRequest & MigrateRequestBase)
  | (shared.PHPassMigrateRequest & MigrateRequestBase);

export interface MigrateResponse extends BaseResponse {
  user_id: string;
  email_id: string;
  user_created: boolean;
}

export class Passwords {
  base_path = "passwords";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(data: PasswordsCreateRequest): Promise<PasswordsCreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data: data,
    });
  }

  authenticate(
    data?: PasswordsAuthenticateRequest
  ): Promise<PasswordsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: data,
    });
  }

  resetByEmailStart(
    data: ResetByEmailStartRequest
  ): Promise<ResetByEmailStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset/start"),
      data: data,
    });
  }

  resetByEmail(
    token: string,
    password: string,
    data?: ResetByEmailRequest
  ): Promise<ResetByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset"),
      data: { token, password, ...data },
    });
  }

  resetByExistingPassword(
    data: ResetByExistingPasswordRequest
  ): Promise<ResetByExistingPasswordResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("existing_password/reset"),
      data: data,
    });
  }

  resetBySession(data: ResetBySessionRequest): Promise<ResetBySessionResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("session/reset"),
      data: data,
    });
  }

  strengthCheck(data: StrengthCheckRequest): Promise<StrengthCheckResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("strength_check"),
      data: data,
    });
  }

  migrate(data: MigrateRequest): Promise<MigrateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("migrate"),
      data: data,
    });
  }
}
