import { request } from "./shared";

import type { AxiosInstance } from "axios";
import type {
  Attributes,
  BaseResponse,
  Email,
  Name,
  PhoneNumber,
  WebAuthnRegistration,
} from "./shared";

export type UserID = string;

export interface PendingUser {
  user_id: UserID;
  name: Name;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  status: string;
  invited_at: string;
}

export interface CreateRequest {
  email?: string;
  phone_number?: string;
  name?: Name;
  create_user_as_pending?: boolean;
  attributes?: Attributes;
}

export interface CreateResponse extends BaseResponse {
  user_id: UserID;
  email_id: string;
  phone_id: string;
  status: string;
}

export interface GetResponse extends BaseResponse {
  user_id: UserID;
  name: Name;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  webauthn_registrations: WebAuthnRegistration[];
  status: string;
}

export interface UpdateRequest {
  name?: Name;
  emails?: { email: string }[];
  phone_numbers?: { phone_number: string }[];
  attributes?: Attributes;
}

export interface UpdateResponse extends BaseResponse {
  user_id: UserID;
  emails: Email[];
  phone_numbers: PhoneNumber[];
}

export interface DeleteResponse extends BaseResponse {
  user_id: UserID;
}

export interface GetPendingRequest {
  starting_after_id?: string;
  limit?: number;
}

export interface GetPendingResponse extends BaseResponse {
  users: PendingUser[];
  has_more: boolean;
  starting_after_id: string;
  total: number;
}

export interface DeleteEmailResponse extends BaseResponse {
  user_id: UserID;
}

export interface DeletePhoneNumberResponse extends BaseResponse {
  user_id: UserID;
}

export interface DeleteWebAuthnRegistrationResponse extends BaseResponse {
  user_id: UserID;
}

export class Users {
  base_path = "users";
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

  get(userID: UserID): Promise<GetResponse> {
    return request(this.client, {
      method: "GET",
      url: this.endpoint(userID),
    });
  }

  update(userID: UserID, data: UpdateRequest): Promise<UpdateResponse> {
    return request(this.client, {
      method: "PUT",
      url: this.endpoint(userID),
      data,
    });
  }

  delete(userID: UserID): Promise<DeleteResponse> {
    return request(this.client, {
      method: "DELETE",
      url: this.endpoint(userID),
    });
  }

  getPending(params?: GetPendingRequest): Promise<GetPendingResponse> {
    return request(this.client, {
      method: "GET",
      url: this.endpoint("pending"),
      params,
    });
  }

  deleteEmail(emailID: string): Promise<DeleteEmailResponse> {
    return request(this.client, {
      method: "DELETE",
      url: this.endpoint(`emails/${emailID}`),
    });
  }

  deletePhoneNumber(phoneID: string): Promise<DeletePhoneNumberResponse> {
    return request(this.client, {
      method: "DELETE",
      url: this.endpoint(`phone_numbers/${phoneID}`),
    });
  }

  deleteWebAuthnRegistration(
    webAuthnRegistrationID: string
  ): Promise<DeleteWebAuthnRegistrationResponse> {
    return request(this.client, {
      method: "DELETE",
      url: this.endpoint(`webauthn_registrations/${webAuthnRegistrationID}`),
    });
  }
}
