import { request, BaseResponse, fetchConfig } from "../shared";
import { MemberSession, ResponseWithMember } from "./shared_b2b";
import * as shared from "../shared/passwords";

export interface B2BPasswordsAuthenticateRequest {
  organization_id: string;
  email_address: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface B2BPasswordsAuthenticateResponse extends ResponseWithMember {
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
}

export interface B2BPasswordsEmailResetStartRequest {
  organization_id: string;
  email_address: string;
  login_redirect_url?: string;
  reset_password_redirect_url?: string;
  reset_password_expiration_minutes?: number;
  reset_password_template_id?: string;
  code_challenge?: string;
  locale?: string;
}

export interface B2BPasswordsEmailResetStartResponse extends BaseResponse {
  member_id: string;
  member_email_id: string;
}

export interface B2BPasswordsEmailResetRequest {
  password_reset_token: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface B2BPasswordsEmailResetResponse extends ResponseWithMember {
  member_email_id: string;
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
}

export interface B2BPasswordsExistingPasswordResetRequest {
  email_address: string;
  existing_password: string;
  new_password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  organization_id: string;
}

export interface B2BPasswordsExistingPasswordResetResponse
  extends ResponseWithMember {
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
}

export interface B2BPasswordsSessionResetRequest {
  password: string;
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
}

export interface B2BPasswordsSessionResetResponse extends ResponseWithMember {
  member_session?: MemberSession;
}

export interface B2BPasswordsStrengthCheckRequest {
  email_address?: string;
  password: string;
}

export interface B2BPasswordsStrengthCheckResponse extends BaseResponse {
  valid_password: boolean;
  score: number;
  breached_password: boolean;
  strength_policy: string;
  breach_detection_on_create: boolean;
  zxcvbn_feedback: {
    suggestions: string[];
    warning: string;
  };
  luds_feedback: {
    has_lower_case: boolean;
    has_upper_case: boolean;
    has_digit: boolean;
    has_symbol: boolean;
    missing_complexity: number;
    missing_characters: number;
  };
}

interface MigrateRequestBase {
  organization_id: string;
  email_address: string;
  hash: string;
  name?: string;
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export type B2BPasswordsMigrateRequest =
  | (shared.MD5MigrateRequest & MigrateRequestBase)
  | (shared.BcryptMigrateRequest & MigrateRequestBase)
  | (shared.Argon2IMigrateRequest & MigrateRequestBase)
  | (shared.Argon2IDMigrateRequest & MigrateRequestBase)
  | (shared.SHA1MigrateRequest & MigrateRequestBase)
  | (shared.ScryptMigrateRequest & MigrateRequestBase)
  | (shared.PHPassMigrateRequest & MigrateRequestBase)
  | (shared.PBKDF2MigrateRequest & MigrateRequestBase);

export interface B2BPasswordsMigrateResponse extends ResponseWithMember {
  organization_id: string;
  member_created: boolean;
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

  authenticate(
    data?: B2BPasswordsAuthenticateRequest
  ): Promise<B2BPasswordsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: data,
    });
  }

  resetByEmailStart(
    data: B2BPasswordsEmailResetStartRequest
  ): Promise<B2BPasswordsEmailResetStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset/start"),
      data: data,
    });
  }

  resetByEmail(
    data?: B2BPasswordsEmailResetRequest
  ): Promise<B2BPasswordsEmailResetResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset"),
      data: data,
    });
  }

  resetByExistingPassword(
    data: B2BPasswordsExistingPasswordResetRequest
  ): Promise<B2BPasswordsExistingPasswordResetResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("existing_password/reset"),
      data: data,
    });
  }

  resetBySession(
    data: B2BPasswordsSessionResetRequest
  ): Promise<B2BPasswordsSessionResetResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("session/reset"),
      data: data,
    });
  }

  strengthCheck(
    data: B2BPasswordsStrengthCheckRequest
  ): Promise<B2BPasswordsStrengthCheckResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("strength_check"),
      data: data,
    });
  }

  migrate(
    data: B2BPasswordsMigrateRequest
  ): Promise<B2BPasswordsMigrateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("migrate"),
      data: data,
    });
  }
}
