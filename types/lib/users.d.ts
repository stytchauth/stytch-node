import { Password, User } from "./shared";
import type { Attributes, BaseResponse, CryptoWallet, Email, fetchConfig, Name, PhoneNumber, TOTP } from "./shared";
export declare type UserID = string;
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
}
export interface CreateResponse extends BaseResponse {
    user_id: UserID;
    user: User;
    email_id: string;
    phone_id: string;
    status: string;
}
export declare type GetResponse = BaseResponse & User;
export declare enum UserSearchOperator {
    OR = "OR",
    AND = "AND"
}
export declare type UserSearchOperand = {
    filter_name: "created_at_greater_than";
    filter_value: string;
} | {
    filter_name: "created_at_less_than";
    filter_value: string;
} | {
    filter_name: "created_at_between";
    filter_value: {
        greater_than: string;
        less_than: string;
    };
} | {
    filter_name: "status";
    filter_value: "active" | "pending";
} | {
    filter_name: "oauth_provider";
    filter_value: string[];
} | {
    filter_name: "user_id";
    filter_value: string[];
} | {
    filter_name: "full_name_fuzzy";
    filter_value: string;
} | {
    filter_name: "phone_number";
    filter_value: string[];
} | {
    filter_name: "phone_id";
    filter_value: string[];
} | {
    filter_name: "phone_verified";
    filter_value: boolean;
} | {
    filter_name: "phone_number_fuzzy";
    filter_value: string;
} | {
    filter_name: "email_address";
    filter_value: string[];
} | {
    filter_name: "email_id";
    filter_value: string[];
} | {
    filter_name: "email_verified";
    filter_value: boolean;
} | {
    filter_name: "email_address_fuzzy";
    filter_value: string;
} | {
    filter_name: "webauthn_registration_verified";
    filter_value: boolean;
} | {
    filter_name: "webauthn_registration_id";
    filter_value: string[];
} | {
    filter_name: "crypto_wallet_id";
    filter_value: string[];
} | {
    filter_name: "crypto_wallet_address";
    filter_value: string[];
} | {
    filter_name: "crypto_wallet_verified";
    filter_value: boolean;
} | {
    filter_name: "totp_id";
    filter_value: string[];
} | {
    filter_name: "totp_verified";
    filter_value: boolean;
} | {
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
export interface SearchResponse extends BaseResponse {
    results: User[];
    results_metadata: {
        next_cursor: string | null;
        total: number;
    };
}
export interface UpdateRequest {
    name?: Name;
    emails?: {
        email: string;
    }[];
    phone_numbers?: {
        phone_number: string;
    }[];
    crypto_wallets?: {
        crypto_wallet_address: string;
        crypto_wallet_type: string;
    }[];
    attributes?: Attributes;
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
export declare class UserSearchIterator {
    private client;
    private data;
    private mode;
    constructor(client: Users, data: SearchRequest);
    next(): Promise<User[]>;
    hasNext(): boolean;
    [Symbol.asyncIterator](): AsyncIterator<User[]>;
}
export declare class Users {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: CreateRequest): Promise<CreateResponse>;
    get(userID: UserID): Promise<GetResponse>;
    search(data: SearchRequest): Promise<SearchResponse>;
    searchAll(data: SearchRequest): UserSearchIterator;
    update(userID: UserID, data: UpdateRequest): Promise<UpdateResponse>;
    delete(userID: UserID): Promise<DeleteResponse>;
    getPending(params?: GetPendingRequest): Promise<GetPendingResponse>;
    deleteEmail(emailID: string): Promise<DeleteEmailResponse>;
    deletePhoneNumber(phoneID: string): Promise<DeletePhoneNumberResponse>;
    deleteWebAuthnRegistration(webAuthnRegistrationID: string): Promise<DeleteWebAuthnRegistrationResponse>;
    deleteBiometricRegistration(biometricRegistrationID: string): Promise<DeleteBiometricRegistrationResponse>;
    deleteTOTP(totpID: string): Promise<DeleteTOTPResponse>;
    deleteCryptoWallet(cryptoWalletID: string): Promise<DeleteCryptoWalletResponse>;
    deletePassword(passwordID: string): Promise<DeleteCryptoWalletResponse>;
}
