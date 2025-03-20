import { fetchConfig } from "../shared";
import { Fingerprint } from "./fraud_fingerprint";
import { Rules } from "./fraud_rules";
export interface ASNProperties {
    asn: string;
    name: string;
    network: string;
}
export interface BrowserProperties {
    user_agent: string;
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
     * possible Reasons, please [contact support](mailto:support@stytch.com).
     */
    reasons: string[];
    detected_device_type: string;
    /**
     * The assessment of whether this is an authentic device. It will be false if hardware or browser deception
     * is detected.
     */
    is_authentic_device: boolean;
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
export declare class Fraud {
    private fetchConfig;
    fingerprint: Fingerprint;
    rules: Rules;
    constructor(fetchConfig: fetchConfig);
}
