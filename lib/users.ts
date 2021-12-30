import { OAuthProvider, request } from "./shared";

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

interface User {
  user_id: UserID;
  created_at: Date;
  status: string;
  name: Name;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  providers: OAuthProvider[];
  webauthn_registrations: WebAuthnRegistration[];
}

type UserRaw = Omit<User, "created_at"> & { created_at: string };

export type GetResponse = BaseResponse & User;

export enum UserSearchOperator {
  OR = "OR",
  AND = "AND",
}

export type UserSearchOperand =
  | {
      filter_name: "created_at_greater_than";
      // Timestamp in RFC 3339 Format
      filter_value: string;
    }
  | {
      filter_name: "created_at_less_than";
      // Timestamp in RFC 3339 Format
      filter_value: string;
    }
  | {
      filter_name: "created_at_between";
      filter_value: {
        // Timestamp in RFC 3339 Format
        greater_than: string;
        // Timestamp in RFC 3339 Format
        less_than: string;
      };
    }
  | {
      filter_name: "status";
      filter_value: "active" | "pending";
    }
  | {
      filter_name: "oauth_provider";
      filter_value: string[];
    }
  | {
      filter_name: "user_id";
      filter_value: string[];
    }
  | {
      filter_name: "full_name_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "phone_number";
      filter_value: string[];
    }
  | {
      filter_name: "phone_id";
      filter_value: string[];
    }
  | {
      filter_name: "phone_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "phone_number_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "email_address";
      filter_value: string[];
    }
  | {
      filter_name: "email_id";
      filter_value: string[];
    }
  | {
      filter_name: "email_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "email_address_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "webauthn_registration_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "webauthn_registration_id";
      filter_value: string[];
    };

export interface SearchRequest {
  limit?: number;
  query?: {
    operator: UserSearchOperator;
    operands: UserSearchOperand[];
  };
  cursor?: string | null;
}

interface SearchResponseRaw extends BaseResponse {
  results: UserRaw[];
  results_metadata: {
    next_cursor: string | null;
    total: number;
  };
}

export interface SearchResponse extends BaseResponse {
  results: User[];
  results_metadata: {
    next_cursor: string | null;
    total: number;
  };
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

enum mode {
  pending,
  inProgress,
  complete,
}

export class UserSearchIterator {
  private mode: mode;

  constructor(private client: Users, private data: SearchRequest) {
    this.mode = mode.pending;
  }

  async next(): Promise<User[]> {
    const res = await this.client.search(this.data);
    this.data = {
      ...this.data,
      cursor: res.results_metadata.next_cursor,
    };
    if (!this.data.cursor) {
      this.mode = mode.complete;
    } else {
      this.mode = mode.inProgress;
    }
    return res.results;
  }

  hasNext(): boolean {
    return this.mode !== mode.complete;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<User[]> {
    while (this.hasNext()) {
      yield this.next();
    }
  }
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
    return request<BaseResponse & UserRaw>(this.client, {
      method: "GET",
      url: this.endpoint(userID),
    }).then((res) => ({
      ...res,
      ...parseUser(res),
    }));
  }

  search(data: SearchRequest): Promise<SearchResponse> {
    return request<SearchResponseRaw>(this.client, {
      method: "POST",
      url: this.endpoint("search"),
      data,
    }).then((res) => {
      return {
        ...res,
        results: res.results.map(parseUser),
      };
    });
  }

  searchAll(data: SearchRequest): UserSearchIterator {
    return new UserSearchIterator(this, data);
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

function parseUser(user: UserRaw): User {
  console.log(user);
  return {
    ...user,
    created_at: new Date(user.created_at),
  };
}
