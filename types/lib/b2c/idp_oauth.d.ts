import { ConnectedAppPublic } from "./connected_apps";
import { fetchConfig } from "../shared";
import { IDPScopeResult } from "./idp";
import { User } from "./users";
export interface IDPOAuthAuthorizeRequest {
    consent_granted: boolean;
    scopes: string[];
    client_id: string;
    /**
     * The callback URI used to redirect the user after authentication. This is the same URI provided at the
     * start of the OAuth flow.  This field is required when using the `authorization_code` grant.
     */
    redirect_uri: string;
    response_type: string;
    user_id?: string;
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
export interface IDPOAuthAuthorizeResponse {
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
export interface IDPOAuthAuthorizeStartRequest {
    client_id: string;
    /**
     * The callback URI used to redirect the user after authentication. This is the same URI provided at the
     * start of the OAuth flow.  This field is required when using the `authorization_code` grant.
     */
    redirect_uri: string;
    response_type: string;
    scopes: string[];
    user_id?: string;
    session_token?: string;
    session_jwt?: string;
    /**
     * Space separated list that specifies how the Authorization Server should prompt the user for
     * reauthentication and consent. Only `consent` is supported today.
     */
    prompt?: string;
}
export interface IDPOAuthAuthorizeStartResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    client: ConnectedAppPublic;
    consent_required: boolean;
    scope_results: IDPScopeResult[];
    status_code: number;
}
export declare class OAuth {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Initiates a request for authorization of a Connected App to access a User's account.
     *
     * Call this endpoint using the query parameters from an OAuth Authorization request.
     * This endpoint validates various fields (`scope`, `client_id`, `redirect_uri`, `prompt`, etc...) are
     * correct and returns
     * relevant information for rendering an OAuth Consent Screen.
     *
     * This endpoint returns:
     * - A public representation of the Connected App requesting authorization
     * - Whether _explicit_ user consent must be granted before proceeding with the authorization
     * - A list of scopes the user has the ability to grant the Connected App
     *
     * Use this response to prompt the user for consent (if necessary) before calling the
     * [Submit OAuth Authorization](https://stytch.com/docs/api/connected-apps-oauth-authorize) endpoint.
     *
     * Exactly one of the following must be provided to identify the user granting authorization:
     * - `user_id`
     * - `session_token`
     * - `session_jwt`
     *
     * If a `session_token` or `session_jwt` is passed, the OAuth Authorization will be linked to the user's
     * session for tracking purposes.
     * One of these fields must be used if the Connected App intends to complete the
     * [Exchange Access Token](https://stytch.com/docs/api/connected-app-access-token-exchange) flow.
     * @param data {@link IDPOAuthAuthorizeStartRequest}
     * @returns {@link IDPOAuthAuthorizeStartResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authorizeStart(data: IDPOAuthAuthorizeStartRequest): Promise<IDPOAuthAuthorizeStartResponse>;
    /**
     * Completes a request for authorization of a Connected App to access a User's account.
     *
     * Call this endpoint using the query parameters from an OAuth Authorization request, after previously
     * validating those parameters using the
     * [Preflight Check](https://stytch.com/docs/api/connected-apps-oauth-authorize-start) API.
     * Note that this endpoint takes in a few additional parameters the preflight check does not- `state`,
     * `nonce`, and `code_challenge`.
     *
     * If the authorization was successful, the `redirect_uri` will contain a valid `authorization_code`
     * embedded as a query parameter.
     * If the authorization was unsuccessful, the `redirect_uri` will contain an OAuth2.1 `error_code`.
     * In both cases, redirect the user to the location for the response to be consumed by the Connected App.
     *
     * Exactly one of the following must be provided to identify the user granting authorization:
     * - `user_id`
     * - `session_token`
     * - `session_jwt`
     *
     * If a `session_token` or `session_jwt` is passed, the OAuth Authorization will be linked to the user's
     * session for tracking purposes.
     * One of these fields must be used if the Connected App intends to complete the
     * [Exchange Access Token](https://stytch.com/docs/api/connected-app-access-token-exchange) flow.
     * @param data {@link IDPOAuthAuthorizeRequest}
     * @returns {@link IDPOAuthAuthorizeResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authorize(data: IDPOAuthAuthorizeRequest): Promise<IDPOAuthAuthorizeResponse>;
}
