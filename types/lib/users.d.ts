import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Email, Name, PhoneNumber } from "./shared";
declare type UserID = string;
interface PendingUser {
    user_id: UserID;
    name: Name;
    emails: Email[];
    phone_numbers: PhoneNumber[];
    status: string;
    invited_at: string;
}
interface CreateRequest {
    email?: string;
    phone_number?: string;
    name?: Name;
    create_user_as_pending?: boolean;
    attributes?: Attributes;
}
interface CreateResponse extends BaseResponse {
    user_id: UserID;
    email_id: string;
    phone_id: string;
    status: string;
}
interface GetResponse extends BaseResponse {
    user_id: UserID;
    name: Name;
    emails: Email[];
    phone_numbers: PhoneNumber[];
    status: string;
}
interface UpdateRequest {
    name?: Name;
    emails?: string[];
    phone_numbers?: string[];
    attributes?: Attributes;
}
interface UpdateResponse extends BaseResponse {
    user_id: UserID;
    emails: Email[];
    phone_numbers: PhoneNumber[];
}
interface DeleteResponse extends BaseResponse {
    user_id: UserID;
}
interface GetPendingRequest {
    starting_after_id?: string;
    limit?: bigint;
}
interface GetPendingResponse extends BaseResponse {
    users: PendingUser[];
    has_more: boolean;
    starting_after_id: string;
    total: bigint;
}
interface DeleteEmailResponse extends BaseResponse {
    user_id: UserID;
}
interface DeletePhoneNumberResponse extends BaseResponse {
    user_id: UserID;
}
export default class Users {
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
export {};
