import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
export interface B2BOrganizationsMembersConnectedAppsRevokeRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BOrganizationsMembersConnectedAppsRevokeRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id: string;
    connected_app_id: string;
}
export interface B2BOrganizationsMembersConnectedAppsRevokeResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    status_code: number;
}
export declare class ConnectedApps {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Revoke Connected App revokes a Connected App's access to a Member and revokes all active tokens that
     * have been created
     * on the Member's behalf. New tokens cannot be created until the Member completes a new authorization flow
     * with the
     * Connected App.
     * @param data {@link B2BOrganizationsMembersConnectedAppsRevokeRequest}
     * @param options {@link B2BOrganizationsMembersConnectedAppsRevokeRequestOptions}
     * @returns {@link B2BOrganizationsMembersConnectedAppsRevokeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    revoke(data: B2BOrganizationsMembersConnectedAppsRevokeRequest, options?: B2BOrganizationsMembersConnectedAppsRevokeRequestOptions): Promise<B2BOrganizationsMembersConnectedAppsRevokeResponse>;
}
