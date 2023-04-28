import { BaseResponse, fetchConfig } from "../shared";
import { Attributes, CryptoWallet, Email, Name, PhoneNumber, User } from "./shared_b2c";
export declare type UserID = string;
export declare type UserMetadata = Record<string, any>;
export interface B2CUsersCreateRequest {
    email?: string;
    phone_number?: string;
    name?: Name;
    create_user_as_pending?: boolean;
    attributes?: Attributes;
    trusted_metadata?: UserMetadata;
    untrusted_metadata?: UserMetadata;
}
export interface B2CUsersCreateResponse extends BaseResponse {
    user_id: UserID;
    user: User;
    email_id: string;
    phone_id: string;
    status: string;
}
export declare type B2CUsersGetResponse = BaseResponse & User;
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
export interface B2CUsersSearchRequest {
    limit?: number;
    query?: {
        operator: UserSearchOperator;
        operands: UserSearchOperand[];
    };
    cursor?: string | null;
}
export interface B2CUsersSearchResponse extends BaseResponse {
    results: User[];
    results_metadata: {
        next_cursor: string | null;
        total: number;
    };
}
export interface B2CUsersUpdateRequest {
    name?: Name;
    trusted_metadata?: UserMetadata;
    untrusted_metadata?: UserMetadata;
    attributes?: Attributes;
}
export interface B2CUsersUpdateResponse extends BaseResponse {
    user_id: UserID;
    user: User;
    emails: Email[];
    phone_numbers: PhoneNumber[];
    crypto_wallets: CryptoWallet[];
}
export interface B2CUsersDeleteResponse extends BaseResponse {
    user_id: UserID;
}
export interface B2CUsersDeleteEmailResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeletePhoneNumberResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeleteWebAuthnRegistrationResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeleteBiometricRegistrationResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeleteTOTPResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeleteCryptoWalletResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeletePasswordResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export interface B2CUsersDeleteOAuthUserRegistrationResponse extends BaseResponse {
    user_id: UserID;
    user: User;
}
export declare class UserSearchIterator {
    private client;
    private data;
    private mode;
    constructor(client: Users, data: B2CUsersSearchRequest);
    next(): Promise<User[]>;
    hasNext(): boolean;
    [Symbol.asyncIterator](): AsyncIterator<User[]>;
}
export declare class Users {
    base_path: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    create(data: B2CUsersCreateRequest): Promise<B2CUsersCreateResponse>;
    get(userID: UserID): Promise<B2CUsersGetResponse>;
    search(data: B2CUsersSearchRequest): Promise<B2CUsersSearchResponse>;
    searchAll(data: B2CUsersSearchRequest): UserSearchIterator;
    update(userID: UserID, data: B2CUsersUpdateRequest): Promise<B2CUsersUpdateResponse>;
    delete(userID: UserID): Promise<B2CUsersDeleteResponse>;
    deleteEmail(emailID: string): Promise<B2CUsersDeleteEmailResponse>;
    deletePhoneNumber(phoneID: string): Promise<B2CUsersDeletePhoneNumberResponse>;
    deleteWebAuthnRegistration(webAuthnRegistrationID: string): Promise<B2CUsersDeleteWebAuthnRegistrationResponse>;
    deleteBiometricRegistration(biometricRegistrationID: string): Promise<B2CUsersDeleteBiometricRegistrationResponse>;
    deleteTOTP(totpID: string): Promise<B2CUsersDeleteTOTPResponse>;
    deleteCryptoWallet(cryptoWalletID: string): Promise<B2CUsersDeleteCryptoWalletResponse>;
    deletePassword(passwordID: string): Promise<B2CUsersDeleteCryptoWalletResponse>;
    deleteOAuthUserRegistration(oauthUserRegistrationID: string): Promise<B2CUsersDeleteOAuthUserRegistrationResponse>;
}
