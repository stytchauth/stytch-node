import { request, BaseResponse, fetchConfig } from "../shared";
import { Member, MemberSession } from "./shared_b2b";
import { Organization } from "./organizations";

export interface AuthenticateRequest {
  email_address: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  session_custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AuthenticateResponse extends BaseResponse {
  member_id: string;
  organization_id: string;
  member: Member;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
  organization: Organization;
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

export interface EmailResetResponse extends BaseResponse {
  member_id: string;
  member_email_id: string;
  organization_id: string;
  member: Member;
  session_token?: string;
  session_jwt?: string;
  member_session?: MemberSession;
  organization: Organization;
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

export interface ExistingPasswordResetResponse extends BaseResponse {
  member_id: string;
  organization: Organization;
  member: Member;
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

export interface SessionResetResponse extends BaseResponse {
  member_id: string;
  organization: Organization;
  member: Member;
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

interface MD5MigrateRequest extends MigrateRequestBase {
  hash_type: "md_5";
  md_5_config?: {
    prepend_salt?: string;
    append_salt?: string;
  };
}

interface BcryptMigrateRequest extends MigrateRequestBase {
  hash_type: "bcrypt";
}

interface Argon2IMigrateRequest extends MigrateRequestBase {
  hash_type: "argon_2i";
  argon_2_config?: {
    salt: string;
    iteration_amount: number;
    memory: number;
    threads: number;
    key_length: number;
  };
}

interface Argon2IDMigrateRequest extends MigrateRequestBase {
  hash_type: "argon_2id";
  argon_2_config?: {
    salt: string;
    iteration_amount: number;
    memory: number;
    threads: number;
    key_length: number;
  };
}

interface SHA1MigrateRequest extends MigrateRequestBase {
  hash_type: "sha_1";
  sha_1_config?: {
    prepend_salt?: string;
    append_salt?: string;
  };
}

interface PHPassMigrateRequest extends MigrateRequestBase {
  hash_type: "phpass";
}

interface ScryptMigrateRequest extends MigrateRequestBase {
  hash_type: "scrypt";
  scrypt_config?: {
    salt: string;
    n_parameter: number;
    r_parameter: number;
    p_parameter: number;
    key_length: number;
  };
}

export type MigrateRequest =
  | MD5MigrateRequest
  | BcryptMigrateRequest
  | Argon2IMigrateRequest
  | Argon2IDMigrateRequest
  | SHA1MigrateRequest
  | ScryptMigrateRequest
  | PHPassMigrateRequest;

export interface MigrateResponse extends BaseResponse {
  member_id: string;
  organization_id: string;
  member_created: boolean;
}

export class Passwords {
  base_path = "b2b/passwords";

  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(data?: AuthenticateRequest): Promise<AuthenticateResponse> {
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

  resetByEmail(
    token: string,
    password: string,
    data?: EmailResetRequest
  ): Promise<EmailResetResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset"),
      data: { token, password, ...data },
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
