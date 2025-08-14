import { B2BIDPScopeResult } from "./idp";
import { ConnectedAppPublic } from "../b2c/connected_apps";
import { fetchConfig } from "../shared";
import { Member, Organization } from "./organizations";
export interface B2BIDPOAuthAuthorizeRequest {
    consent_granted: boolean;
    scopes: string[];
    client_id: string;
    /**
     * The callback URI used to redirect the user after authentication. This is the same URI provided at the
     * start of the OAuth flow.  This field is required when using the `authorization_code` grant.
     */
    redirect_uri: string;
    response_type: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id?: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id?: string;
    session_token?: string;
    session_jwt?: string;
    /**
     * Space separated list that specifies how the Authorization Server should prompt the user for
     * reauthentication and consent. Only `consent` is supported today.
     */
    prompt?: string;
    state?: string;
    nonce?: string;
    code_challenge?: string;
}
export interface B2BIDPOAuthAuthorizeResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The callback URI used to redirect the user after authentication. This is the same URI provided at the
     * start of the OAuth flow.  This field is required when using the `authorization_code` grant.
     */
    redirect_uri: string;
    status_code: number;
    authorization_code?: string;
}
export interface B2BIDPOAuthAuthorizeStartRequest {
    client_id: string;
    /**
     * The callback URI used to redirect the user after authentication. This is the same URI provided at the
     * start of the OAuth flow.  This field is required when using the `authorization_code` grant.
     */
    redirect_uri: string;
    response_type: string;
    scopes: string[];
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id?: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value. You may use an external_id here if one is set
     * for the member.
     */
    member_id?: string;
    session_token?: string;
    session_jwt?: string;
    /**
     * Space separated list that specifies how the Authorization Server should prompt the user for
     * reauthentication and consent. Only `consent` is supported today.
     */
    prompt?: string;
}
export interface B2BIDPOAuthAuthorizeStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    member_id: string;
    member: Member;
    organization: Organization;
    client: ConnectedAppPublic;
    consent_required: boolean;
    scope_results: B2BIDPScopeResult[];
    status_code: number;
}
export declare class OAuth {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiates a request for authorization of a Connected App to access a Member's account.
     *
     * Call this endpoint using the query parameters from an OAuth Authorization request.
     * This endpoint validates various fields (`scope`, `client_id`, `redirect_uri`, `prompt`, etc...) are
     * correct and returns
     * relevant information for rendering an OAuth Consent Screen.
     *
     * This endpoint returns:
     * - A public representation of the Connected App requesting authorization
     * - Whether _explicit_ consent must be granted before proceeding with the authorization
     * - A list of scopes the Member has the ability to grant the Connected App
     *
     * Use this response to prompt the Member for consent (if necessary) before calling the
     * [Submit OAuth Authorization](https://stytch.com/docs/b2b/api/connected-apps-oauth-authorize) endpoint.
     *
     * Exactly one of the following must be provided to identify the Member granting authorization:
     * - `organization_id` + `member_id`
     * - `session_token`
     * - `session_jwt`
     *
     * If a `session_token` or `session_jwt` is passed, the OAuth Authorization will be linked to the Member's
     * session for tracking purposes.
     * One of these fields must be used if the Connected App intends to complete the
     * [Exchange Access Token](https://stytch.com/docs/b2b/api/connected-app-access-token-exchange) flow.
     * @param data {@link B2BIDPOAuthAuthorizeStartRequest}
     * @returns {@link B2BIDPOAuthAuthorizeStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authorizeStart(data: B2BIDPOAuthAuthorizeStartRequest): Promise<B2BIDPOAuthAuthorizeStartResponse>;
    /**
     * Completes a request for authorization of a Connected App to access a Member's account.
     *
     * Call this endpoint using the query parameters from an OAuth Authorization request, after previously
     * validating those parameters using the
     * [Preflight Check](https://stytch.com/docs/b2b/api/connected-apps-oauth-authorize-start) API.
     * Note that this endpoint takes in a few additional parameters the preflight check does not- `state`,
     * `nonce`, and `code_challenge`.
     *
     * If the authorization was successful, the `redirect_uri` will contain a valid `authorization_code`
     * embedded as a query parameter.
     * If the authorization was unsuccessful, the `redirect_uri` will contain an OAuth2.1 `error_code`.
     * In both cases, redirect the Member to the location for the response to be consumed by the Connected App.
     *
     * Exactly one of the following must be provided to identify the Member granting authorization:
     * - `organization_id` + `member_id`
     * - `session_token`
     * - `session_jwt`
     *
     * If a `session_token` or `session_jwt` is passed, the OAuth Authorization will be linked to the Member's
     * session for tracking purposes.
     * One of these fields must be used if the Connected App intends to complete the
     * [Exchange Access Token](https://stytch.com/docs/b2b/api/connected-app-access-token-exchange) flow.
     * @param data {@link B2BIDPOAuthAuthorizeRequest}
     * @returns {@link B2BIDPOAuthAuthorizeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authorize(data: B2BIDPOAuthAuthorizeRequest): Promise<B2BIDPOAuthAuthorizeResponse>;
}
