import { BaseResponse, fetchConfig, request, } from "../shared";

import {
  Attributes,
  CryptoWallet,
  Email,
  Name,
  PhoneNumber,
  TOTP,
  parseUser,
  Password,
  User,
  UserRaw,
  WithRawUser,
} from "./shared_b2c";

export type UserID = string;
export type UserMetadata = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface PendingUser {
  user_id: UserID;
  name: Name;
  emails: Email[];
  password?: Password;
  phone_numbers: PhoneNumber[];
  crypto_wallet: CryptoWallet[];
  status: string;
  invited_at: string;
  totps: TOTP[];
}

export interface CreateRequest {
  email?: string;
  phone_number?: string;
  name?: Name;
  create_user_as_pending?: boolean;
  attributes?: Attributes;
  trusted_metadata?: UserMetadata;
  untrusted_metadata?: UserMetadata;
}

export interface CreateResponse extends BaseResponse {
  user_id: UserID;
  user: User;
  email_id: string;
  phone_id: string;
  status: string;
}

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
    }
  | {
      filter_name: "crypto_wallet_id";
      filter_value: string[];
    }
  | {
      filter_name: "crypto_wallet_address";
      filter_value: string[];
    }
  | {
      filter_name: "crypto_wallet_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "totp_id";
      filter_value: string[];
    }
  | {
      filter_name: "totp_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "password_exists";
      filter_value: boolean;
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
  crypto_wallets?: {
    crypto_wallet_address: string;
    crypto_wallet_type: string;
  }[];
  attributes?: Attributes;
  trusted_metadata?: UserMetadata;
  untrusted_metadata?: UserMetadata;
}

export interface UpdateResponse extends BaseResponse {
  user_id: UserID;
  user: User;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  crypto_wallets: CryptoWallet[];
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
  user: User;
}

export interface DeletePhoneNumberResponse extends BaseResponse {
  user_id: UserID;
  user: User;
}

export interface DeleteWebAuthnRegistrationResponse extends BaseResponse {
  user_id: UserID;
  user: User;
}

export interface DeleteBiometricRegistrationResponse extends BaseResponse {
  user_id: UserID;
  user: User;
}

export interface DeleteTOTPResponse extends BaseResponse {
  user_id: UserID;
  user: User;
}

export interface DeleteCryptoWalletResponse extends BaseResponse {
  user_id: UserID;
  user: User;
}

export interface DeletePasswordResponse extends BaseResponse {
  user_id: UserID;
  user: User;
}

export interface DeleteOAuthUserRegistrationResponse extends BaseResponse {
  user_id: UserID;
  user: User;
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
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(data: CreateRequest): Promise<CreateResponse> {
    return request<WithRawUser<CreateResponse>>(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data,
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  get(userID: UserID): Promise<GetResponse> {
    return request<BaseResponse & UserRaw>(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(userID),
    }).then((res) => ({
      ...res,
      ...parseUser(res),
    }));
  }

  search(data: SearchRequest): Promise<SearchResponse> {
    return request<SearchResponseRaw>(this.fetchConfig, {
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
    return request<WithRawUser<UpdateResponse>>(this.fetchConfig, {
      method: "PUT",
      url: this.endpoint(userID),
      data,
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  delete(userID: UserID): Promise<DeleteResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(userID),
    });
  }

  getPending(params?: GetPendingRequest): Promise<GetPendingResponse> {
    return request(this.fetchConfig, {
      method: "GET",
      url: this.endpoint("pending"),
      params: { ...params },
    });
  }

  deleteEmail(emailID: string): Promise<DeleteEmailResponse> {
    return request<WithRawUser<DeleteEmailResponse>>(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`emails/${emailID}`),
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deletePhoneNumber(phoneID: string): Promise<DeletePhoneNumberResponse> {
    return request<WithRawUser<DeletePhoneNumberResponse>>(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`phone_numbers/${phoneID}`),
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deleteWebAuthnRegistration(
    webAuthnRegistrationID: string
  ): Promise<DeleteWebAuthnRegistrationResponse> {
    return request<WithRawUser<DeleteWebAuthnRegistrationResponse>>(
      this.fetchConfig,
      {
        method: "DELETE",
        url: this.endpoint(`webauthn_registrations/${webAuthnRegistrationID}`),
      }
    ).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deleteBiometricRegistration(
    biometricRegistrationID: string
  ): Promise<DeleteBiometricRegistrationResponse> {
    return request<WithRawUser<DeleteBiometricRegistrationResponse>>(
      this.fetchConfig,
      {
        method: "DELETE",
        url: this.endpoint(
          `biometric_registrations/${biometricRegistrationID}`
        ),
      }
    ).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deleteTOTP(totpID: string): Promise<DeleteTOTPResponse> {
    return request<WithRawUser<DeleteTOTPResponse>>(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`totps/${totpID}`),
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deleteCryptoWallet(
    cryptoWalletID: string
  ): Promise<DeleteCryptoWalletResponse> {
    return request<WithRawUser<DeleteCryptoWalletResponse>>(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`crypto_wallets/${cryptoWalletID}`),
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deletePassword(passwordID: string): Promise<DeleteCryptoWalletResponse> {
    return request<WithRawUser<DeletePasswordResponse>>(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(`passwords/${passwordID}`),
    }).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }

  deleteOAuthUserRegistration(
    oauthUserRegistrationID: string
  ): Promise<DeleteOAuthUserRegistrationResponse> {
    return request<WithRawUser<DeleteOAuthUserRegistrationResponse>>(
      this.fetchConfig,
      {
        method: "DELETE",
        url: this.endpoint(`oauth/${oauthUserRegistrationID}`),
      }
    ).then((res) => {
      return {
        ...res,
        user: parseUser(res.user),
      };
    });
  }
}
