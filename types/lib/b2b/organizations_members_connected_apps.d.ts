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
    organization_id: string;
    member_id: string;
    connected_app_id: string;
}
export interface B2BOrganizationsMembersConnectedAppsRevokeResponse {
    request_id: string;
    status_code: number;
}
export declare class ConnectedApps {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param data {@link B2BOrganizationsMembersConnectedAppsRevokeRequest}
     * @param options {@link B2BOrganizationsMembersConnectedAppsRevokeRequestOptions}
     * @returns {@link B2BOrganizationsMembersConnectedAppsRevokeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    revoke(data: B2BOrganizationsMembersConnectedAppsRevokeRequest, options?: B2BOrganizationsMembersConnectedAppsRevokeRequestOptions): Promise<B2BOrganizationsMembersConnectedAppsRevokeResponse>;
}
