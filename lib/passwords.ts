import { parseUser, request, Session, User, WithRawUser } from "./shared";

import type { Attributes, BaseResponse, fetchConfig } from "./shared";

export interface CreateRequest {
  email: string;
  password: string;
  session_duration_minutes?: number;
}

export interface CreateResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface AuthenticateRequest {
  email: string;
  password: string;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
}

export interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  user: User;
  method_id: string;
  session_token?: string;
  session_jwt?: string;
  session?: Session;
}

export interface ResetByEmailStartRequest {
  email: string;
  reset_password_redirect_url?: string;
  reset_password_expiration_minutes?: number;
  attributes?: Attributes;
  code_challenge?: string;
}

export interface ResetByEmailStartResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface ResetByEmailRequest {
  password: string;
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
  attributes?: Attributes;
  session_token?: string;
  session_jwt?: string;
  session_duration_minutes?: number;
  code_verifier?: string;
}

export interface ResetByEmailResponse extends BaseResponse {
  user_id: string;
  email_id: string;
}

export interface CheckStrengthRequest {
  email: string;
  password: string;
}

export interface CheckStrengthResponse extends BaseResponse {
  valid_password: boolean;
  score: number;
  breached_password: boolean;
  feedback: {
    suggestions: string[];
    warning: string;
  };
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

  create(data: CreateRequest): Promise<CreateResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data: data,
    });
  }

  authenticate(data?: AuthenticateRequest): Promise<AuthenticateResponse> {
    return request<WithRawUser<AuthenticateResponse>>(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("authenticate"),
      data: data,
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
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
    data: ResetByEmailRequest
  ): Promise<ResetByEmailResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("email/reset"),
      data: { token, ...data },
    });
  }

  checkStrength(data: CheckStrengthRequest): Promise<CheckStrengthResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("strength_check"),
      data: data,
    });
  }
}
