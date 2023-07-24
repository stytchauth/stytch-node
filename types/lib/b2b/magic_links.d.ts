import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization } from "./organizations";
import { MfaRequired } from "./mfa";
export interface B2BMagicLinksLoginOrSignupByEmailRequest {
    organization_id: string;
    email_address: string;
    login_redirect_url?: string;
    signup_redirect_url?: string;
    pkce_code_challenge?: string;
    login_template_id?: string;
    signup_template_id?: string;
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BMagicLinksLoginOrSignupByEmailResponse extends ResponseWithMember {
    member_created: boolean;
}
export interface B2BMagicLinksInviteByEmailRequest {
    organization_id: string;
    email_address: string;
    name?: string;
    invite_redirect_url?: string;
    invited_by_member_id?: string;
    invite_template_id?: string;
    trusted_metadata?: Record<string, any>;
    untrusted_metadata?: Record<string, any>;
    locale?: "en" | "es" | "pt-br" | string;
}
export declare type B2BMagicLinksInviteByEmailResponse = ResponseWithMember;
export interface B2BMagicLinksAuthenticateRequest {
    magic_links_token: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    pkce_code_verifier?: string;
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BMagicLinksAuthenticateResponse extends ResponseWithMember {
    organization_id: string;
    method_id: string;
    member_session: MemberSession | null;
    session_token?: string;
    session_jwt?: string;
    reset_sessions: boolean;
    member_authenticated: boolean;
    intermediate_session_token: string;
    mfa_required: MfaRequired | null;
}
export interface B2BMagicLinksDiscoveryByEmailRequest {
    email_address: string;
    discovery_redirect_url?: string;
    pkce_code_challenge?: string;
    login_template_id?: string;
    locale?: "en" | "es" | "pt-br" | string;
}
export declare type B2BMagicLinksDiscoveryByEmailResponse = BaseResponse;
export interface B2BMagicLinksDiscoveryAuthenticateRequest {
    discovery_magic_links_token: string;
    pkce_code_verifier?: string;
}
export interface B2BMagicLinksDiscoveryAuthenticateResponse extends BaseResponse {
    intermediate_session_token: string;
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
}
declare class EmailDiscovery {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    send(data: B2BMagicLinksDiscoveryByEmailRequest): Promise<B2BMagicLinksDiscoveryByEmailResponse>;
}
declare class Discovery {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    authenticate(data: B2BMagicLinksDiscoveryAuthenticateRequest): Promise<B2BMagicLinksDiscoveryAuthenticateResponse>;
}
declare class Email {
    private base_path;
    private delivery;
    private fetchConfig;
    discovery: EmailDiscovery;
    constructor(fetchConfig: fetchConfig, parent_path: string);
    private endpoint;
    loginOrSignup(data: B2BMagicLinksLoginOrSignupByEmailRequest): Promise<B2BMagicLinksLoginOrSignupByEmailResponse>;
    invite(data: B2BMagicLinksInviteByEmailRequest): Promise<B2BMagicLinksInviteByEmailResponse>;
}
export declare class MagicLinks {
    private base_path;
    email: Email;
    discovery: Discovery;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(data: B2BMagicLinksAuthenticateRequest): Promise<B2BMagicLinksAuthenticateResponse>;
}
export {};
