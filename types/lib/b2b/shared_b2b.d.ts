import { GoogleOAuthFactor, MicrosoftOAuthFactor } from "../b2c/shared_b2c";
import { BaseResponse } from "../shared";
import { Organization } from "./organizations";
export interface EmailFactor {
    delivery_method: "email";
    type: string;
    last_authenticated_at: string;
    email_factor: {
        email_id: string;
        email_address: string;
    };
}
export declare type B2BAuthenticationFactor = EmailFactor | GoogleOAuthFactor | MicrosoftOAuthFactor;
export interface MemberSession {
    member_session_id: string;
    member_id: string;
    organization_id: string;
    started_at: string;
    last_accessed_at: string;
    expires_at: string;
    authentication_factors: B2BAuthenticationFactor[];
    custom_claims?: Record<string, any>;
}
export interface Member {
    organization_id: string;
    member_id: string;
    email_address: string;
    status: string;
    name: string;
    oauth_registrations: OAuthRegistration[];
    sso_registrations: SSORegistration[];
    trusted_metadata: Record<string, any>;
    untrusted_metadata: Record<string, any>;
    is_breakglass: boolean;
    member_password_id: string;
}
export interface SSORegistration {
    connection_id: string;
    external_id: string;
    registration_id: string;
    sso_attributes: Record<string, any>;
}
export interface OAuthRegistration {
    provider_subject: string;
    provider_type: string;
    member_oauth_registration_id: string;
    locale?: string;
    profile_picture_url?: string;
}
export interface ResultsMetadata {
    total: number;
    next_cursor: string;
}
export declare enum SearchOperator {
    OR = "OR",
    AND = "AND"
}
export interface ResponseWithMember extends BaseResponse {
    member_id: string;
    member: Member;
    organization: Organization;
}
