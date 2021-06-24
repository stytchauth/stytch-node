import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse, Name } from "./shared";
interface SendByEmailRequest {
    email: string;
    login_magic_link_url: string;
    signup_magic_link_url: string;
    login_expiration_minutes?: bigint;
    signup_expiration_minutes?: bigint;
    attributes?: Attributes;
}
interface SendByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
interface LoginOrCreateByEmailRequest {
    email: string;
    login_magic_link_url: string;
    signup_magic_link_url: string;
    login_expiration_minutes?: bigint;
    signup_expiration_minutes?: bigint;
    create_user_as_pending?: boolean;
    attributes?: Attributes;
}
interface LoginOrCreateByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
    user_created: boolean;
}
interface InviteByEmailRequest {
    email: string;
    invite_magic_link_url: string;
    invite_expiration_minutes?: bigint;
    name?: Name;
    attributes?: Attributes;
}
interface InviteByEmailResponse extends BaseResponse {
    user_id: string;
    email_id: string;
}
interface AuthenticateRequest {
    token: string;
    options?: {
        ip_match_required?: boolean;
        user_agent_match_required?: boolean;
    };
    attributes?: Attributes;
}
interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    method_id: string;
}
interface RevokePendingInviteByEmailRequest {
    email: string;
}
interface RevokePendingInviteByEmailResponse extends BaseResponse {
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
    revokePendingInvite(data: RevokePendingInviteByEmailRequest): Promise<RevokePendingInviteByEmailResponse>;
}
export default class MagicLinks {
    base_path: string;
    email: Email;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
export {};
