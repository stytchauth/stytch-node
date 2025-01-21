// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { fetchConfig } from "../shared";
import { Fingerprint } from "./fraud_fingerprint";
import { Rules } from "./fraud_rules";

export interface ASNProperties {
  // The Autonomous System Number of the user's network.
  asn: string;
  // Public name associated with the ASN.
  name: string;
  // The CIDR block associated with the ASN.
  network: string;
}

export interface BrowserProperties {
  // The user agent of the user's browser.
  user_agent: string;
}

export interface Fingerprints {
  // Combination of signals associated with a specific network commonly known as TLS fingerprinting.
  network_fingerprint: string;
  // Combinations of signals to identify an operating system and architecture.
  hardware_fingerprint: string;
  // Combination of signals to identify a browser and its specific version.
  browser_fingerprint: string;
  // Cookie-less way of identifying a unique user.
  visitor_fingerprint: string;
  // The cookie stored on the user's device that uniquely identifies them.
  visitor_id?: string;
  // Combination of VisitorID and NetworkFingerprint to create a clear identifier of a browser.
  browser_id?: string;
}

export interface IPGeoProperties {
  // The city where the IP is located.
  city: string;
  // The region where the IP is located.
  region: string;
  // The country where the IP is located.
  country: string;
}

export interface Metadata {
  // An external ID, such as a user ID, that you wish to associate with the telemetry ID.
  external_id?: string;
  // The organization ID you wish to associate with the telemetry ID.
  organization_id?: string;
  // The user action, such as 'login', that you wish to associate with the telemetry ID.
  user_action?: string;
}

export interface NetworkProperties {
  // The IP address of the user.
  ip_address: string;
  // Information about the network's ASN (Autonomous System Number).
  asn: ASNProperties;
  // Information about the geolocation of the user's IP address.
  ip_geolocation: IPGeoProperties;
  // Whether the user is using a proxy.
  is_proxy: boolean;
  // Whether the user is using a VPN.
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
  // The operating system and architecture that took the fingerprint.
  detected_device_type: string;
  /**
   * The assessment of whether this is an authentic device. It will be false if hardware or browser deception
   * is detected.
   */
  is_authentic_device: boolean;
}

export class Fraud {
  private fetchConfig: fetchConfig;
  fingerprint: Fingerprint;
  rules: Rules;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.fingerprint = new Fingerprint(this.fetchConfig);
    this.rules = new Rules(this.fetchConfig);
  }
}