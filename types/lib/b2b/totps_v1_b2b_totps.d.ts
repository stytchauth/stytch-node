import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BTOTPsV1B2BTOTPsAuthenticateRequest {
    organization_id: string;
    member_id: string;
    code: string;
    intermediate_session_token?: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    set_mfa_enrollment?: string;
    set_default_mfa?: boolean;
}
export interface B2BTOTPsV1B2BTOTPsAuthenticateResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    session_token: string;
    session_jwt: string;
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BTOTPsV1B2BTOTPsMigrateRequest {
    organization_id: string;
    member_id: string;
    secret: string;
    recovery_codes: string[];
}
export interface B2BTOTPsV1B2BTOTPsMigrateResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    totp_registration_id: string;
    recovery_codes: string[];
    status_code: number;
}
export declare class TOTPs {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BTOTPsV1B2BTOTPsAuthenticateRequest}
     * @returns {@link B2BTOTPsV1B2BTOTPsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BTOTPsV1B2BTOTPsAuthenticateRequest): Promise<B2BTOTPsV1B2BTOTPsAuthenticateResponse>;
    /**
     * @param data {@link B2BTOTPsV1B2BTOTPsMigrateRequest}
     * @returns {@link B2BTOTPsV1B2BTOTPsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: B2BTOTPsV1B2BTOTPsMigrateRequest): Promise<B2BTOTPsV1B2BTOTPsMigrateResponse>;
}
