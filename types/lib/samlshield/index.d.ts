import type { Dispatcher } from "undici";
import { fetchConfig } from "../shared";
export interface ClientConfig {
    public_key: string;
    timeout?: number;
    dispatcher?: Dispatcher;
    custom_base_url?: string;
}
export interface SamlShieldValidateRequest {
    /**
     * The SAML response to validate. This should be the base64 encoded SAML response from the IdP
     * and not the raw XML.
     */
    SAMLResponse: string;
}
export interface SamlShieldValidateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    message: string;
}
export declare class SamlShield {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    validate(data: SamlShieldValidateRequest): Promise<SamlShieldValidateResponse>;
}
export declare class SamlShieldClient {
    saml: SamlShield;
    protected fetchConfig: fetchConfig;
    protected baseURL: string;
    constructor(config: ClientConfig);
}
