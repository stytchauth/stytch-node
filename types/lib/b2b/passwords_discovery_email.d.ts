import { DiscoveredOrganization } from "./discovery";
import { fetchConfig } from "../shared";
export interface B2BPasswordsDiscoveryEmailResetRequest {
    password_reset_token: string;
    password: string;
    pkce_code_verifier?: string;
    locale?: string;
}
export interface B2BPasswordsDiscoveryEmailResetResponse {
    request_id: string;
    intermediate_session_token: string;
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
    status_code: number;
}
export interface B2BPasswordsDiscoveryEmailResetStartRequest {
    email_address: string;
    reset_password_redirect_url?: string;
    discovery_redirect_url?: string;
    reset_password_template_id?: string;
    reset_password_expiration_minutes?: number;
    pkce_code_challenge?: string;
    locale?: string;
}
export interface B2BPasswordsDiscoveryEmailResetStartResponse {
    request_id: string;
    status_code: number;
}
export declare class Email {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BPasswordsDiscoveryEmailResetStartRequest}
     * @returns {@link B2BPasswordsDiscoveryEmailResetStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    resetStart(data: B2BPasswordsDiscoveryEmailResetStartRequest): Promise<B2BPasswordsDiscoveryEmailResetStartResponse>;
    /**
     * @param data {@link B2BPasswordsDiscoveryEmailResetRequest}
     * @returns {@link B2BPasswordsDiscoveryEmailResetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    reset(data: B2BPasswordsDiscoveryEmailResetRequest): Promise<B2BPasswordsDiscoveryEmailResetResponse>;
}