import { request, BaseResponse, fetchConfig } from "../shared";
import { MemberSession, ResponseWithMember } from "./shared_b2b";
import * as shared from "../shared/passwords";

export interface PasswordsAuthenticateRequest {
  organization_id: string;
  email_address: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface PasswordsAuthenticateResponse extends ResponseWithMember {
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
}

export interface EmailResetStartRequest {
  organization_id: string;
  email_address: string;
  login_redirect_url?: string;
  reset_password_redirect_url?: string;
  reset_password_expiration_minutes?: number;
  reset_password_template_id?: string;
  code_challenge?: string;
  locale?: string;
}

export interface EmailResetStartResponse extends BaseResponse {
  member_id: string;
  member_email_id: string;
}

export interface EmailResetRequest {
  password_reset_token: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  code_verifier?: string;
}

export interface EmailResetResponse extends ResponseWithMember {
  member_email_id: string;
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
}

export interface ExistingPasswordResetRequest {
  email_address: string;
  existing_password: string;
  new_password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  organization_id: string;
}

export interface ExistingPasswordResetResponse extends ResponseWithMember {
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
}

export interface SessionResetRequest {
  password: string;
  organization_id: string;
  session_token?: string;
  session_jwt?: string;
}

export interface SessionResetResponse extends ResponseWithMember {
  member_session?: MemberSession;
}

export interface StrengthCheckRequest {
  email_address?: string;
  password: string;
}

export interface StrengthCheckResponse extends BaseResponse {
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

export type MigrateRequest =
  | (shared.MD5MigrateRequest & MigrateRequestBase)
  | (shared.BcryptMigrateRequest & MigrateRequestBase)
  | (shared.Argon2IMigrateRequest & MigrateRequestBase)
  | (shared.Argon2IDMigrateRequest & MigrateRequestBase)
  | (shared.SHA1MigrateRequest & MigrateRequestBase)
  | (shared.ScryptMigrateRequest & MigrateRequestBase)
  | (shared.PHPassMigrateRequest & MigrateRequestBase);

export interface MigrateResponse extends ResponseWithMember {
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
    data?: PasswordsAuthenticateRequest
  ): Promise<PasswordsAuthenticateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: data,
    });
  }

  resetByEmailStart(
    data: EmailResetStartRequest
  ): Promise<EmailResetStartResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset/start"),
      data: data,
    });
  }

  resetByEmail(data?: EmailResetRequest): Promise<EmailResetResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset"),
      data: data,
    });
  }

  resetByExistingPassword(
    data: ExistingPasswordResetRequest
  ): Promise<ExistingPasswordResetResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("existing_password/reset"),
      data: data,
    });
  }

  resetBySession(data: SessionResetRequest): Promise<SessionResetResponse> {
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
