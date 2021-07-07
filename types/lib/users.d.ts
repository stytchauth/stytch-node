import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Email, Name, PhoneNumber } from "./shared";
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
export interface GetResponse extends BaseResponse {
    user_id: UserID;
    name: Name;
    emails: Email[];
    phone_numbers: PhoneNumber[];
    status: string;
}
export interface UpdateRequest {
    name?: Name;
    emails?: string[];
    phone_numbers?: string[];
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
    limit?: bigint;
}
export interface GetPendingResponse extends BaseResponse {
    users: PendingUser[];
    has_more: boolean;
    starting_after_id: string;
    total: bigint;
}
export interface DeleteEmailResponse extends BaseResponse {
    user_id: UserID;
}
export interface DeletePhoneNumberResponse extends BaseResponse {
    user_id: UserID;
}
export declare class Users {
    base_path: string;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    create(request: CreateRequest): Promise<CreateResponse>;
    get(userID: UserID): Promise<GetResponse>;
    update(userID: UserID, request: UpdateRequest): Promise<UpdateResponse>;
    delete(userID: UserID): Promise<DeleteResponse>;
    getPending(request?: GetPendingRequest): Promise<GetPendingResponse>;
    deleteEmail(emailID: string): Promise<DeleteEmailResponse>;
    deletePhoneNumber(phoneID: string): Promise<DeletePhoneNumberResponse>;
}
