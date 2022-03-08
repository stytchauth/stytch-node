import { OAuthProvider } from "./shared";
import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Email, Name, PhoneNumber, WebAuthnRegistration, TOTP, CryptoWallet } from "./shared";
export declare type UserID = string;
export interface PendingUser {
    user_id: UserID;
    name: Name;
    emails: Email[];
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
    totps: TOTP[];
    crypto_wallets: CryptoWallet[];
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
}
export interface DeletePhoneNumberResponse extends BaseResponse {
    user_id: UserID;
}
export interface DeleteWebAuthnRegistrationResponse extends BaseResponse {
    user_id: UserID;
}
export interface DeleteTOTPResponse extends BaseResponse {
    user_id: UserID;
}
export interface DeleteCryptoWalletResponse extends BaseResponse {
    user_id: UserID;
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
    private client;
    constructor(client: AxiosInstance);
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
    deleteTOTP(totpID: string): Promise<DeleteTOTPResponse>;
    deleteCryptoWallet(cryptoWalletID: string): Promise<DeleteCryptoWalletResponse>;
}
export {};
