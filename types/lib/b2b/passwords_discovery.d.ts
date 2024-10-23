import { DiscoveredOrganization } from "./discovery";
import { Email } from "./passwords_discovery_email";
import { fetchConfig } from "../shared";
export interface B2BPasswordsDiscoveryAuthenticateRequest {
    email_address: string;
    password: string;
}
export interface B2BPasswordsDiscoveryAuthenticateResponse {
    request_id: string;
    email_address: string;
    intermediate_session_token: string;
    discovered_organizations: DiscoveredOrganization[];
    status_code: number;
}
export declare class Discovery {
    private fetchConfig;
    email: Email;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BPasswordsDiscoveryAuthenticateRequest}
     * @returns {@link B2BPasswordsDiscoveryAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: B2BPasswordsDiscoveryAuthenticateRequest): Promise<B2BPasswordsDiscoveryAuthenticateResponse>;
}
