import { Session } from "./shared";
import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Name } from "./shared";
export interface SendByEmailRequest {
    email: string;
    login_magic_link_url?: string;
    signup_magic_link_url?: string;
    login_expiration_minutes?: number;
    signup_expiration_minutes?: number;
    attributes?: Attributes;
}
export interface SendByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
export interface LoginOrCreateByEmailRequest {
    email: string;
    login_magic_link_url?: string;
    signup_magic_link_url?: string;
    login_expiration_minutes?: number;
    signup_expiration_minutes?: number;
    create_user_as_pending?: boolean;
    attributes?: Attributes;
}
export interface LoginOrCreateByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
    user_created: boolean;
}
export interface InviteByEmailRequest {
    email: string;
    invite_magic_link_url?: string;
    invite_expiration_minutes?: number;
    name?: Name;
    attributes?: Attributes;
}
export interface InviteByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
export interface CreateRequest {
    user_id: string;
    expiration_minutes?: number;
    attributes?: Attributes;
}
export interface CreateResponse extends BaseResponse {
    token: string;
    user_id: string;
}
export interface AuthenticateRequest {
    options?: {
        ip_match_required?: boolean;
        user_agent_match_required?: boolean;
    };
    attributes?: Attributes;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
}
export interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    method_id: string;
    session_token?: string;
    session_jwt?: string;
    session?: Session;
}
export interface RevokePendingInviteByEmailRequest {
    email: string;
}
export interface RevokePendingInviteByEmailResponse extends BaseResponse {
}
declare class Email {
    base_path: string;
    delivery: string;
    private client;
    constructor(client: AxiosInstance, parent_path: string);
    private endpoint;
    send(data: SendByEmailRequest): Promise<SendByEmailResponse>;
    loginOrCreate(data: LoginOrCreateByEmailRequest): Promise<LoginOrCreateByEmailResponse>;
    invite(data: InviteByEmailRequest): Promise<InviteByEmailResponse>;
    revokeInvite(data: RevokePendingInviteByEmailRequest): Promise<RevokePendingInviteByEmailResponse>;
}
export declare class MagicLinks {
    base_path: string;
    email: Email;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    create(data: CreateRequest): Promise<CreateResponse>;
    authenticate(token: string, data?: AuthenticateRequest): Promise<AuthenticateResponse>;
}
export {};
