import { AddressInformation, DomainInformation } from "./fraud";
import { fetchConfig } from "../shared";
export interface FraudEmailRiskRequest {
    email_address: string;
}
export interface FraudEmailRiskResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    address_information: AddressInformation;
    domain_information: DomainInformation;
    /**
     * The suggested action based on the attributes of the email address. The available actions are:
     *   * `ALLOW` - This email is most likely safe to send to and not fraudulent.
     *   * `BLOCK` - This email is invalid or exhibits signs of fraud. We recommend blocking the end user.
     *   * `CHALLENGE` - This email has some potentially fraudulent attributes. We recommend increased friction
     * such as 2FA or other forms of extended user verification before allowing the privileged action to
     * proceed.
     *
     */
    action: "ALLOW" | "CHALLENGE" | "BLOCK" | string;
    risk_score: number;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class Email {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get risk information for a specific email address.
     * The response will contain a recommended action (`ALLOW`, `BLOCK`, or `CHALLENGE`) and a more granular
     * `risk_score`.
     * You can also check the `address_information` and `domain_information` fields for more information about
     * the email address and email domain.
     *
     * This feature is in beta. Reach out to us
     * [here](mailto:fraud-team@stytch.com?subject=Email_Intelligence_Early_Access) if you'd like to request
     * early access.
     * @param data {@link FraudEmailRiskRequest}
     * @returns {@link FraudEmailRiskResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    risk(data: FraudEmailRiskRequest): Promise<FraudEmailRiskResponse>;
}
