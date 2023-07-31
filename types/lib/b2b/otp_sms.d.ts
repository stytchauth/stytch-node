import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BOTPSmsAuthenticateRequest {
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
export interface B2BOTPSmsAuthenticateResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    session_token: string;
    session_jwt: string;
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BOTPSmsSendRequest {
    organization_id: string;
    member_id: string;
    phone_number?: string;
    locale?: "en" | "es" | "pt-br" | string;
}
export interface B2BOTPSmsSendResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    status_code: number;
}
export declare class Sms {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BOTPSmsSendRequest}
     * @returns {@link B2BOTPSmsSendResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    send(data: B2BOTPSmsSendRequest): Promise<B2BOTPSmsSendResponse>;
    /**
     * @param data {@link B2BOTPSmsAuthenticateRequest}
     * @returns {@link B2BOTPSmsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BOTPSmsAuthenticateRequest): Promise<B2BOTPSmsAuthenticateResponse>;
}
