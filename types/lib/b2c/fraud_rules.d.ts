import { fetchConfig } from "../shared";
export interface FraudRulesSetRequest {
    /**
     * The action that should be returned by a fingerprint lookup for that identifier with a `RULE_MATCH`
     * reason. The following values are valid: `ALLOW`, `BLOCK`, `CHALLENGE`, or `NONE`. For country codes,
     * `ALLOW` actions are not allowed. If a `NONE` action is specified, it will clear the stored rule.
     */
    action: "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE" | string;
    visitor_id?: string;
    browser_id?: string;
    visitor_fingerprint?: string;
    browser_fingerprint?: string;
    hardware_fingerprint?: string;
    network_fingerprint?: string;
    /**
     * The number of minutes until this rule expires. If no `expires_in_minutes` is specified, then the rule is
     * kept permanently.
     */
    expires_in_minutes?: number;
    description?: string;
    /**
     * The CIDR block we want to set a rule for. You may pass either an IP address or a CIDR block. The CIDR
     * block prefix must be between 16 and 32, inclusive. If an end user's IP address is within this CIDR
     * block, this rule will be applied. Only one identifier can be specified in the request.
     */
    cidr_block?: string;
    /**
     * The country code we want to set a rule for. The country code must be a valid ISO 3166-1 alpha-2 code.
     * You may not set `ALLOW` rules for country codes. Only one identifier can be specified in the request.
     */
    country_code?: string;
    /**
     * The ASN we want to set a rule for. The ASN must be the string representation of an integer between 0 and
     * 4294967295, inclusive. Only one identifier can be specified in the request.
     */
    asn?: string;
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
    /**
     * The CIDR block that a rule was set for. If an end user's IP address is within this CIDR block, this rule
     * will be applied.
     */
    cidr_block?: string;
    country_code?: string;
    asn?: string;
}
export declare class Rules {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Set a rule for a particular `visitor_id`, `browser_id`, `visitor_fingerprint`, `browser_fingerprint`,
     * `hardware_fingerprint`, `network_fingerprint`, `cidr_block`, `asn`, or `country_code`. This is helpful
     * in cases where you want to allow or block a specific user or fingerprint. You should be careful when
     * setting rules for `browser_fingerprint`, `hardware_fingerprint`, or `network_fingerprint` as they can be
     * shared across multiple users, and you could affect more users than intended.
     *
     * You may not set an `ALLOW` rule for a `country_code`.
     *
     * Rules are applied in the order specified above. For example, if an end user has an `ALLOW` rule set for
     * their `visitor_id` but a `BLOCK` rule set for their `hardware_fingerprint`, they will receive an `ALLOW`
     * verdict because the `visitor_id` rule takes precedence.
     *
     * If there are conflicts between multiple `cidr_block` rules (for example, if the `ip_address` of the end
     * user overlaps with multiple CIDR blocks that have rules set), the conflicts are resolved as follows:
     * - The smallest block size takes precedence. For example, if an `ip_address` overlaps with a `cidr_block`
     * rule of `ALLOW` for a block with a prefix of `/32` and a `cidr_block` rule of `BLOCK` with a prefix of
     * `/24`, the rule match verdict will be `ALLOW`.
     * - Among equivalent size blocks, `BLOCK` takes precedence over `CHALLENGE`, which takes precedence over
     * `ALLOW`. For example, if an `ip_address` overlaps with two `cidr_block` rules with blocks of the same
     * size that return `CHALLENGE` and `ALLOW`, the rule match verdict will be `CHALLENGE`.
     * @param data {@link FraudRulesSetRequest}
     * @returns {@link FraudRulesSetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    set(data: FraudRulesSetRequest): Promise<FraudRulesSetResponse>;
}
