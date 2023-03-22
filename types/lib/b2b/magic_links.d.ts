import { MemberSession, Member } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization, Organization } from "./organizations";
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
    organization: Organization;
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
    organization: Organization;
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
    organization: Organization;
    organization_id: string;
    method_id: string;
    member_session?: MemberSession;
    session_token?: string;
    session_jwt?: string;
    reset_sessions: boolean;
}
export interface DiscoveryByEmailRequest {
    email_address: string;
    discovery_redirect_url?: string;
    pkce_code_challenge?: string;
    login_template_id?: string;
}
export declare type DiscoveryByEmailResponse = BaseResponse;
export interface DiscoveryAuthenticateRequest {
    intermediate_magic_links_token: string;
    pkce_code_verifier?: string;
}
export interface DiscoveryAuthenticateResponse extends BaseResponse {
    intermediate_session_token: string;
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
}
declare class Discovery {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    send(data: DiscoveryByEmailRequest): Promise<DiscoveryByEmailResponse>;
    authenticate(data: DiscoveryAuthenticateRequest): Promise<DiscoveryAuthenticateResponse>;
}
declare class Email {
    private base_path;
    private delivery;
    private fetchConfig;
    discovery: Discovery;
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
