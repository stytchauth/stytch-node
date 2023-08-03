import { MemberSession, ResponseWithMember } from "./shared_b2b";
import { fetchConfig } from "../shared";
export interface B2BOTPsSMSSendRequest {
    organization_id: string;
    member_id: string;
    mfa_phone_number?: string;
    locale?: "en" | "es" | "pt-br" | string;
}
export declare type B2BOTPsSMSSendResponse = ResponseWithMember;
export interface B2BOTPsSMSAuthenticateRequest {
    organization_id: string;
    member_id: string;
    code: string;
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    set_mfa_enrollment?: "enroll" | "unenroll";
}
export interface B2BOTPsSMSAuthenticateResponse extends ResponseWithMember {
    session_token: string;
    session_jwt: string;
    member_session: MemberSession;
}
declare class SMS {
    base_path: string;
    delivery: string;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig, base_path: string);
    private endpoint;
    send(data: B2BOTPsSMSSendRequest): Promise<B2BOTPsSMSSendResponse>;
    authenticate(data: B2BOTPsSMSAuthenticateRequest): Promise<B2BOTPsSMSAuthenticateResponse>;
}
export declare class OTPs {
    base_path: string;
    sms: SMS;
    constructor(fetchConfig: fetchConfig);
}
export {};
