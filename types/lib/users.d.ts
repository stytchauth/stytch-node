import { OAuthProvider } from "./shared";
import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Email, Name, PhoneNumber, WebAuthnRegistration } from "./shared";
export declare type UserID = string;
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
    name: Name;
    emails: Email[];
    phone_numbers: PhoneNumber[];
    webauthn_registrations: WebAuthnRegistration[];
    providers: OAuthProvider[];
    status: string;
    created_at: Date;
}
export declare type GetResponse = BaseResponse & User;
export declare enum UserSearchOperator {
    OR = "OR",
    AND = "AND"
}
export declare type UserSearchOperand = {
    filter: "created_at_greater_than";
    created_at_greater_than: string;
} | {
    filter: "created_at_less_than";
    created_at_less_than: string;
} | {
    filter: "created_at_between";
    created_at_greater_than: string;
    created_at_less_than: string;
} | {
    filter: "status";
    status: "active" | "pending";
} | {
    filter: "oauth_provider";
    oauth_providers: string[];
} | {
    filter: "user_id";
    user_ids: string[];
} | {
    filter: "full_name_fuzzy";
    full_name_fuzzy: string;
} | {
    filter: "phone_number";
    phone_numbers: string[];
} | {
    filter: "phone_id";
    phone_ids: string[];
} | {
    filter: "phone_verified";
    phone_verified: boolean;
} | {
    filter: "phone_number_fuzzy";
    phone_number_fuzzy: string;
} | {
    filter: "email_address";
    email_addresses: string[];
} | {
    filter: "email_id";
    email_ids: string[];
} | {
    filter: "email_verified";
    email_verified: boolean;
} | {
    filter: "email_address_fuzzy";
    email_address_fuzzy: string;
} | {
    filter: "webauthn_registration_verified";
    webauthn_registration_verified: boolean;
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
}
export {};
