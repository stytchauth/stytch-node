import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BRecoveryCodesGetRequest {
    organization_id: string;
    member_id: string;
}
export interface B2BRecoveryCodesGetResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    recovery_codes: string[];
    status_code: number;
}
export interface B2BRecoveryCodesRecoverRequest {
    organization_id: string;
    member_id: string;
    recovery_code: string;
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
}
export interface B2BRecoveryCodesRecoverResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    session_token: string;
    session_jwt: string;
    recovery_codes_remaining: number;
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BRecoveryCodesRotateRequest {
    organization_id: string;
    member_id: string;
}
export interface B2BRecoveryCodesRotateResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    recovery_codes: string[];
    status_code: number;
}
export declare class RecoveryCodes {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BRecoveryCodesRecoverRequest}
     * @returns {@link B2BRecoveryCodesRecoverResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    recover(data: B2BRecoveryCodesRecoverRequest): Promise<B2BRecoveryCodesRecoverResponse>;
    /**
     * @param params {@link B2BRecoveryCodesGetRequest}
     * @returns {@link B2BRecoveryCodesGetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    get(params: B2BRecoveryCodesGetRequest): Promise<B2BRecoveryCodesGetResponse>;
    /**
     * @param data {@link B2BRecoveryCodesRotateRequest}
     * @returns {@link B2BRecoveryCodesRotateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    rotate(data: B2BRecoveryCodesRotateRequest): Promise<B2BRecoveryCodesRotateResponse>;
}
