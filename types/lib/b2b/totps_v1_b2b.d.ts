import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { TOTPs } from "./totps_v1_b2b_totps";
export interface B2BTOTPsV1B2BCreateRequest {
    organization_id: string;
    member_id: string;
    expiration_minutes?: number;
}
export interface B2BTOTPsV1B2BCreateResponse {
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
export declare class B2B {
    private fetchConfig;
    totps: TOTPs;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BTOTPsV1B2BCreateRequest}
     * @returns {@link B2BTOTPsV1B2BCreateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    create(data: B2BTOTPsV1B2BCreateRequest): Promise<B2BTOTPsV1B2BCreateResponse>;
}
