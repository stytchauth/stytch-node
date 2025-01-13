import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
import { MemberSession } from "./sessions";
import { MfaRequired } from "./mfa";
export interface B2BImpersonationAuthenticateRequest {
    token: string;
}
export interface B2BImpersonationAuthenticateResponse {
    request_id: string;
    member_id: string;
    organization_id: string;
    member: Member;
    session_token: string;
    session_jwt: string;
    organization: Organization;
    intermediate_session_token: string;
    member_authenticated: boolean;
    status_code: number;
    member_session?: MemberSession;
    mfa_required?: MfaRequired;
}
export declare class Impersonation {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BImpersonationAuthenticateRequest}
     * @returns {@link B2BImpersonationAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BImpersonationAuthenticateRequest): Promise<B2BImpersonationAuthenticateResponse>;
}
