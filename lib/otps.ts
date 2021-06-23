import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse } from "./shared";

interface SendOTPBySMSRequest {
  phone_number: string;
  expiration_minutes?: bigint;
  attributes?: Attributes;
}

interface SendOTPBySMSResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
}

interface LoginOrCreateUserBySMSRequest {
  phone_number: string;
  expiration_minutes?: bigint;
  attributes?: Attributes;
  create_user_as_pending?: boolean;
}

interface LoginOrCreateUserBySMSResponse extends BaseResponse {
  user_id: string;
  phone_id: string;
  user_created: boolean;
}

interface AuthenticateRequest {
  method_id: string;
  code: string;
  attributes?: Attributes;
  options?: {
    ip_match_required?: boolean;
    user_agent_match_required?: boolean;
  };
}

interface AuthenticateResponse extends BaseResponse {
  user_id: string;
  method_id: string;
}

class SMS {
  base_path: string;
  delivery = "sms";

  private client: AxiosInstance;

  constructor(client: AxiosInstance, base_path: string) {
    this.client = client;
    this.base_path = base_path;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${this.delivery}/${path}`;
  }

  send(request: SendOTPBySMSRequest): Promise<SendOTPBySMSResponse> {
    return this.client.post(this.endpoint("send_by_sms"), { body: request });
  }

  loginOrCreate(
    request: LoginOrCreateUserBySMSRequest
  ): Promise<LoginOrCreateUserBySMSResponse> {
    return this.client.post(this.endpoint("login_or_create"), {
      body: request,
    });
  }
}

export default class OTPs {
  base_path = "otps";
  sms: SMS;

  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.sms = new SMS(client, this.base_path);
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  authenticate(request: AuthenticateRequest): Promise<AuthenticateResponse> {
    return this.client.post(this.endpoint("authenticate"), { body: request });
  }
}
