import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BSmsAuthenticateRequest {
    organization_id: string;
    member_id: string;
    code: string;
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    set_mfa_enrollment?: string;
}
export interface B2BSmsAuthenticateResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    session_token: string;
    session_jwt: string;
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BSmsSendRequest {
    organization_id: string;
    member_id: string;
    phone_number?: string;
    locale?: "en" | "es" | "pt-br";
}
export interface B2BSmsSendResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    status_code: number;
}
export declare class Sms {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    send(data: B2BSmsSendRequest): Promise<B2BSmsSendResponse>;
    authenticate(data: B2BSmsAuthenticateRequest): Promise<B2BSmsAuthenticateResponse>;
}
