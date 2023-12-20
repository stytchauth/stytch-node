import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
export interface B2BTOTPsAuthenticateRequest {
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
export interface B2BTOTPsAuthenticateResponse {
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    session_token: string;
    session_jwt: string;
    status_code: number;
    member_session?: MemberSession;
}
export interface B2BTOTPsCreateRequest {
    organization_id: string;
    member_id: string;
    expiration_minutes?: number;
}
export interface B2BTOTPsCreateResponse {
    request_id: string;
    member_id: string;
    totp_registration_id: string;
    secret: string;
    qr_code: string;
    recovery_codes: string[];
    member: Member;
    organization: Organization;
    status_code: number;
}
export interface B2BTOTPsMigrateRequest {
    organization_id: string;
    member_id: string;
    secret: string;
    recovery_codes: string[];
}
export interface B2BTOTPsMigrateResponse {
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
     * @param data {@link B2BTOTPsCreateRequest}
     * @returns {@link B2BTOTPsCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BTOTPsCreateRequest): Promise<B2BTOTPsCreateResponse>;
    /**
     * @param data {@link B2BTOTPsAuthenticateRequest}
     * @returns {@link B2BTOTPsAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BTOTPsAuthenticateRequest): Promise<B2BTOTPsAuthenticateResponse>;
    /**
     * @param data {@link B2BTOTPsMigrateRequest}
     * @returns {@link B2BTOTPsMigrateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    migrate(data: B2BTOTPsMigrateRequest): Promise<B2BTOTPsMigrateResponse>;
}
