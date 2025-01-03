import { fetchConfig } from "../shared";
import { Fingerprints, Metadata, Properties, Verdict } from "./fraud";
export interface FraudFingerprintLookupRequest {
    telemetry_id: string;
    /**
     * External identifiers that you wish to associate with the given telemetry ID. You will be able to search
     * for fingerprint results by these identifiers in the DFP analytics dashboard. External metadata fields
     * may not exceed 65 characters. They may only contain alphanumerics and the characters `_` `-` `+` `.` or
     * `@`.
     */
    external_metadata?: Metadata;
}
export interface FraudFingerprintLookupResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    telemetry_id: string;
    fingerprints: Fingerprints;
    verdict: Verdict;
    /**
     * External identifiers that you wish to associate with the given telemetry ID. You will be able to search
     * for fingerprint results by these identifiers in the DFP analytics dashboard. External metadata fields
     * may not exceed 65 characters. They may only contain alphanumerics and the characters `_` `-` `+` `.` or
     * `@`.
     */
    external_metadata: Metadata;
    /**
     * The time when the fingerprint was taken. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    created_at: string;
    /**
     * The timestamp when the fingerprint expires. Values conform to the RFC 3339 standard and are expressed in
     * UTC, e.g. `2021-12-29T12:33:09Z`.
     */
    expires_at: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    properties?: Properties;
}
export declare class Fingerprint {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Lookup the associated fingerprint for the `telemetry_id` returned from the `GetTelemetryID` function.
     * Learn more about the different fingerprint types and verdicts in our
     * [DFP guide](https://stytch.com/docs/fraud/guides/device-fingerprinting/overview).
     *
     * Make a decision based on the returned `verdict`:
     * * `ALLOW` - This is a known valid device grouping or device profile that is part of the default `ALLOW`
     * listed set of known devices by Stytch. This grouping is made up of  verified device profiles that match
     * the characteristics of known/authentic traffic origins.
     * * `BLOCK` - This is a known bad or malicious device profile that is undesirable and should be blocked
     * from completing the privileged action in question.
     * * `CHALLENGE` - This is an unknown or potentially malicious device that should be put through increased
     * friction such as 2FA or other forms of extended user verification before allowing the privileged action
     * to proceed.
     *
     * If the `telemetry_id` is not found, we will return a 404 `telemetry_id_not_found`
     * [error](https://stytch.com/docs/fraud/api/errors/404#telemetry_id_not_found). We recommend treating 404
     * errors as a `BLOCK`, since it could be a sign of an attacker trying to bypass DFP protections by
     * generating fake telemetry IDs.
     * @param data {@link FraudFingerprintLookupRequest}
     * @returns {@link FraudFingerprintLookupResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    lookup(data: FraudFingerprintLookupRequest): Promise<FraudFingerprintLookupResponse>;
}
