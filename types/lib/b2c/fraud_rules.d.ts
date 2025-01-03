import { fetchConfig } from "../shared";
export interface FraudRulesSetRequest {
    /**
     * The action that should be returned by a fingerprint lookup for that fingerprint or ID with a
     * `RULE_MATCH` reason. The following values are valid: `ALLOW`, `BLOCK`, `CHALLENGE`, or `NONE`. If a
     * `NONE` action is specified, it will clear the stored rule.
     */
    action: "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE" | string;
    visitor_id?: string;
    browser_id?: string;
    /**
     * The visitor fingerprint we want to set a rule for. Only one fingerprint or ID can be specified in the
     * request.
     */
    visitor_fingerprint?: string;
    /**
     * The browser fingerprint we want to set a rule for. Only one fingerprint or ID can be specified in the
     * request.
     */
    browser_fingerprint?: string;
    /**
     * The hardware fingerprint we want to set a rule for. Only one fingerprint or ID can be specified in the
     * request.
     */
    hardware_fingerprint?: string;
    /**
     * The network fingerprint we want to set a rule for. Only one fingerprint or ID can be specified in the
     * request.
     */
    network_fingerprint?: string;
    /**
     * The number of minutes until this rule expires. If no `expires_in_minutes` is specified, then the rule is
     * kept permanently.
     */
    expires_in_minutes?: number;
    description?: string;
}
export interface FraudRulesSetResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    action: "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE" | string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    visitor_id?: string;
    browser_id?: string;
    visitor_fingerprint?: string;
    browser_fingerprint?: string;
    hardware_fingerprint?: string;
    network_fingerprint?: string;
    /**
     * The timestamp when the rule expires. Values conform to the RFC 3339 standard and are expressed in UTC,
     * e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at?: string;
}
export declare class Rules {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Set a rule for a particular `visitor_id`, `browser_id`, `visitor_fingerprint`, `browser_fingerprint`,
     * `hardware_fingerprint`, or `network_fingerprint`. This is helpful in cases where you want to allow or
     * block a specific user or fingerprint. You should be careful when setting rules for
     * `browser_fingerprint`, `hardware_fingerprint`, or `network_fingerprint` as they can be shared across
     * multiple users, and you could affect more users than intended.
     *
     * Rules are applied in the order specified above. For example, if an end user has an `ALLOW` rule set for
     * their `visitor_id` but a `BLOCK` rule set for their `hardware_fingerprint`, they will receive an `ALLOW`
     * verdict because the `visitor_id` rule takes precedence.
     * @param data {@link FraudRulesSetRequest}
     * @returns {@link FraudRulesSetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    set(data: FraudRulesSetRequest): Promise<FraudRulesSetResponse>;
}
