import { Email } from "./fraud_email";
import { fetchConfig } from "../shared";
import { Fingerprint } from "./fraud_fingerprint";
import { Rules } from "./fraud_rules";
import { VerdictReasons } from "./fraud_verdict_reasons";
export interface ASNProperties {
    asn: string;
    name: string;
    network: string;
}
export interface AddressInformation {
    has_known_bounces: boolean;
    has_valid_syntax: boolean;
    is_suspected_role_address: boolean;
    normalized_email: string;
    /**
     * The number of '.' and '+' characters in the email address. A higher tumbling count indicates a higher
     * potential for fraud.
     */
    tumbling_character_count: number;
}
export interface BrowserProperties {
    user_agent: string;
}
export interface DomainInformation {
    has_mx_or_a_record: boolean;
    is_disposable_domain: boolean;
}
export interface Fingerprints {
    network_fingerprint: string;
    hardware_fingerprint: string;
    browser_fingerprint: string;
    visitor_fingerprint: string;
    visitor_id?: string;
    browser_id?: string;
}
export interface IPGeoProperties {
    city: string;
    region: string;
    country: string;
}
export interface Metadata {
    external_id?: string;
    organization_id?: string;
    user_action?: string;
}
export interface NetworkProperties {
    ip_address: string;
    asn: ASNProperties;
    ip_geolocation: IPGeoProperties;
    is_proxy: boolean;
    is_vpn: boolean;
}
export interface Properties {
    network_properties: NetworkProperties;
    browser_properties: BrowserProperties;
}
export interface Rule {
    /**
     * The rule type. The possible values are `VISITOR_ID`, `BROWSER_ID`, `VISITOR_FINGERPRINT`,
     * `BROWSER_FINGERPRINT`, `HARDWARE_FINGERPRINT`, `NETWORK_FINGERPRINT`, `CIDR_BLOCK`, `ASN`, or
     * `COUNTRY_CODE`.
     */
    rule_type: "VISITOR_ID" | "BROWSER_ID" | "VISITOR_FINGERPRINT" | "BROWSER_FINGERPRINT" | "HARDWARE_FINGERPRINT" | "NETWORK_FINGERPRINT" | "CIDR_BLOCK" | "ASN" | "COUNTRY_CODE" | string;
    action: "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE" | string;
    /**
     * The time when the rule was created. Values conform to the RFC 3339 standard and are expressed in UTC,
     * e.g. `2021-12-29T12:33:09Z`.
     */
    created_at: string;
    visitor_id?: string;
    browser_id?: string;
    visitor_fingerprint?: string;
    browser_fingerprint?: string;
    hardware_fingerprint?: string;
    network_fingerprint?: string;
    /**
     * The CIDR block that a rule was set for. If an end user's IP address is within this CIDR block, this rule
     * will be applied.
     */
    cidr_block?: string;
    country_code?: string;
    asn?: string;
    description?: string;
    /**
     * The timestamp when the rule expires. Values conform to the RFC 3339 standard and are expressed in UTC,
     * e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at?: string;
    /**
     * The time when the rule was last updated. Will be null if the rule has never been updated. Values conform
     * to the RFC 3339 standard and are expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    last_updated_at?: string;
}
export interface Verdict {
    /**
     * The suggested action based on the fingerprint review. The available actions are:
     *   * `ALLOW` - This is a known valid device grouping or device profile that is part of the default ALLOW
     * listed set of known devices by Stytch. This grouping is made up of verified device profiles that match
     * the characteristics of known/authentic traffic origins
     *   * `BLOCK` - This is a known bad or malicious device profile that is undesirable and should be blocked
     * from completing the privileged action in question
     *   * `CHALLENGE` - This is an unknown or potentially malicious device that should be put through
     * increased friction such as 2FA or other forms of extended user verification before allowing the
     * privileged action to proceed
     *
     */
    action: "ALLOW" | "CHALLENGE" | "BLOCK" | string;
    /**
     * A set of contextual clues to inform why a `CHALLENGE` or `BLOCK` action was suggested. For a list of
     * possible Reasons, see
     * [Warning Flags (Verdict Reasons)](https://stytch.com/docs/docs/fraud/guides/device-fingerprinting/reference/warning-flags-verdict-reasons).
     */
    reasons: string[];
    detected_device_type: string;
    /**
     * The assessment of whether this is an authentic device. It will be false if hardware or browser deception
     * is detected.
     */
    is_authentic_device: boolean;
    verdict_reason_overrides: VerdictReasonOverride[];
    /**
     * The type of rule match that was applied (e.g. `VISITOR_ID`), if any. This field will only be present if
     * there is a `RULE_MATCH` reason in the list of verdict reasons.
     */
    rule_match_type?: "VISITOR_ID" | "BROWSER_ID" | "VISITOR_FINGERPRINT" | "BROWSER_FINGERPRINT" | "HARDWARE_FINGERPRINT" | "NETWORK_FINGERPRINT" | "CIDR_BLOCK" | "ASN" | "COUNTRY_CODE" | string;
    /**
     * The rule that was applied (e.g. a specific visitor ID value), if any. This field will only be present if
     * there is a `RULE_MATCH` reason in the list of verdict reasons.
     */
    rule_match_identifier?: string;
}
export interface VerdictReasonAction {
    verdict_reason: string;
    /**
     * The default action returned for the specified verdict reason in a fingerprint lookup when no overrides
     * are specified.
     */
    default_action: "ALLOW" | "CHALLENGE" | "BLOCK" | string;
    /**
     * If not null, this action will be returned for the specified verdict reason in a fingerprint lookup, in
     * place of the default action.
     */
    override_action?: "ALLOW" | "CHALLENGE" | "BLOCK" | string;
    /**
     * The time when the override was created, if one exists. Values conform to the RFC 3339 standard and are
     * expressed in UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    override_created_at?: string;
    override_description?: string;
}
export interface VerdictReasonOverride {
    verdict_reason: string;
    override_action: "ALLOW" | "CHALLENGE" | "BLOCK" | string;
}
export declare class Fraud {
    private fetchConfig;
    fingerprint: Fingerprint;
    rules: Rules;
    verdictReasons: VerdictReasons;
    email: Email;
    constructor(fetchConfig: fetchConfig);
}
