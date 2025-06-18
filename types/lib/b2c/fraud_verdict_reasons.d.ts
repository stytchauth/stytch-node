import { fetchConfig } from "../shared";
import { VerdictReasonAction } from "./fraud";
export interface FraudVerdictReasonsListRequest {
    overrides_only?: boolean;
}
export interface FraudVerdictReasonsListResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    verdict_reason_actions: VerdictReasonAction[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface FraudVerdictReasonsOverrideRequest {
    /**
     * The verdict reason that you wish to override. For a list of possible reasons to override, see
     * [Warning Flags (Verdict Reasons)](https://stytch.com/docs/docs/fraud/guides/device-fingerprinting/reference/warning-flags-verdict-reasons). You may not override the `RULE_MATCH` reason.
     */
    verdict_reason: string;
    /**
     * The action that you want to be returned for the specified verdict reason. The override action must be
     * one of `ALLOW`, `BLOCK`, or `CHALLENGE`.
     */
    override_action: "ALLOW" | "CHALLENGE" | "BLOCK" | "NONE" | string;
    override_description?: string;
}
export interface FraudVerdictReasonsOverrideResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    verdict_reason_action: VerdictReasonAction;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export declare class VerdictReasons {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Use this endpoint to override the action returned for a specific verdict reason during a fingerprint
     * lookup. For example, Stytch Device Fingerprinting returns a `CHALLENGE` verdict action by default for
     * the verdict reason `VIRTUAL_MACHINE`. You can use this endpoint to override that reason to return an
     * `ALLOW` verdict instead if you expect many legitimate users to be using a browser that runs in a virtual
     * machine.
     * @param data {@link FraudVerdictReasonsOverrideRequest}
     * @returns {@link FraudVerdictReasonsOverrideResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    override(data: FraudVerdictReasonsOverrideRequest): Promise<FraudVerdictReasonsOverrideResponse>;
    /**
     * Get the list of verdict reasons returned by the Stytch Device Fingerprinting product along with their
     * default actions and any overrides you may have defined. This is not an exhaustive list of verdict
     * reasons, but it contains all verdict reasons that you may set an override on.
     *
     * For a full list of possible verdict reasons, see
     * [Warning Flags (Verdict Reasons)](https://stytch.com/docs/docs/fraud/guides/device-fingerprinting/reference/warning-flags-verdict-reasons).
     * @param data {@link FraudVerdictReasonsListRequest}
     * @returns {@link FraudVerdictReasonsListResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    list(data: FraudVerdictReasonsListRequest): Promise<FraudVerdictReasonsListResponse>;
}
