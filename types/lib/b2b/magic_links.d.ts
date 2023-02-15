import { MemberSession, Member } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
export interface LoginOrSignupByEmailRequest {
    organization_id: string;
    email_address: string;
    login_redirect_url?: string;
    signup_redirect_url?: string;
    pkce_code_challenge?: string;
    login_template_id?: string;
    signup_template_id?: string;
}
export interface LoginOrSignupByEmailResponse extends BaseResponse {
    member_id: string;
    member: Member;
    member_created: boolean;
}
export interface InviteByEmailRequest {
    organization_id: string;
    email_address: string;
    name?: string;
    invite_redirect_url?: string;
    invited_by_member_id?: string;
    invite_template_id?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
}
export interface InviteByEmailResponse extends BaseResponse {
    member_id: string;
    member: Member;
}
export interface AuthenticateRequest {
    magic_links_token: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    pkce_code_verifier?: string;
}
export interface AuthenticateResponse extends BaseResponse {
    member_id: string;
    member: Member;
    organization_id: string;
    method_id: string;
    member_session?: MemberSession;
    session_token?: string;
    session_jwt?: string;
    reset_sessions: boolean;
}
declare class Email {
    private base_path;
    private delivery;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, parent_path: string);
    private endpoint;
    loginOrSignup(data: LoginOrSignupByEmailRequest): Promise<LoginOrSignupByEmailResponse>;
    invite(data: InviteByEmailRequest): Promise<InviteByEmailResponse>;
}
export declare class MagicLinks {
    private base_path;
    email: Email;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
export {};
