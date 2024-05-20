import { fetchConfig } from "../shared";
export interface B2BOrganizationsMembersOAuthProvidersGoogleResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub
     * etc.
     */
    provider_type: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    /**
     * The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information
     * about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are
     * returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/)
     * specification, which is based on OAuth.
     */
    id_token: string;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    access_token?: string;
    access_token_expires_in?: number;
    /**
     * The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's
     * API.
     */
    refresh_token?: string;
}
export interface B2BOrganizationsMembersOAuthProvidersMicrosoftResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Microsoft, GitHub
     * etc.
     */
    provider_type: string;
    /**
     * The unique identifier for the User within a given OAuth provider. Also commonly called the `sub` or
     * "Subject field" in OAuth protocols.
     */
    provider_subject: string;
    access_token: string;
    access_token_expires_in: number;
    /**
     * The `id_token` returned by the OAuth provider. ID Tokens are JWTs that contain structured information
     * about a user. The exact content of each ID Token varies from provider to provider. ID Tokens are
     * returned from OAuth providers that conform to the [OpenID Connect](https://openid.net/foundation/)
     * specification, which is based on OAuth.
     */
    id_token: string;
    /**
     * The OAuth scopes included for a given provider. See each provider's section above to see which scopes
     * are included by default and how to add custom scopes.
     */
    scopes: string[];
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * The `refresh_token` that you may use to obtain a new `access_token` for the User within the provider's
     * API.
     */
    refresh_token?: string;
}
/**
 * Request type for `organizations.members.oauthProviders.google`,
 * `organizations.members.oauthProviders.microsoft`.
 */
export interface B2BOrganizationsMembersOAuthProvidersProviderInformationRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    /**
     * Globally unique UUID that identifies a specific Member. The `member_id` is critical to perform
     * operations on a Member, so be sure to preserve this value.
     */
    member_id: string;
    /**
     * Whether to return the refresh token Stytch has stored for the OAuth Provider. Defaults to false.
     * **Important:** If your application exchanges the refresh token, Stytch may not be able to automatically
     * refresh access tokens in the future.
     */
    include_refresh_token?: boolean;
}
/**
 * @deprecated Since version 10.11.0. Please use {@link B2BOrganizationsMembersOAuthProvidersProviderInformationRequest} instead.
 */
export declare type B2BOrganizationsMembersOAuthProvidersMicrosoftRequest = B2BOrganizationsMembersOAuthProvidersProviderInformationRequest;
export declare class OAuthProviders {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Retrieve the saved Google access token and ID token for a member. After a successful OAuth login, Stytch
     * will save the
     * issued access token and ID token from the identity provider. If a refresh token has been issued, Stytch
     * will refresh the
     * access token automatically.
     *
     * Google One Tap does not return access tokens. If the member has only authenticated through Google One
     * Tap and not through a regular Google OAuth flow, this endpoint will not return any tokens.
     *
     * __Note:__ Google does not issue a refresh token on every login, and refresh tokens may expire if unused.
     * To force a refresh token to be issued, pass the `?provider_prompt=consent` query param into the
     * [Start Google OAuth flow](https://stytch.com/docs/b2b/api/oauth-google-start) endpoint.
     * @param params {@link B2BOrganizationsMembersOAuthProvidersProviderInformationRequest}
     * @returns {@link B2BOrganizationsMembersOAuthProvidersGoogleResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    google(params: B2BOrganizationsMembersOAuthProvidersProviderInformationRequest): Promise<B2BOrganizationsMembersOAuthProvidersGoogleResponse>;
    /**
     * Retrieve the saved Microsoft access token and ID token for a member. After a successful OAuth login,
     * Stytch will save the
     * issued access token and ID token from the identity provider. If a refresh token has been issued, Stytch
     * will refresh the
     * access token automatically.
     * @param params {@link B2BOrganizationsMembersOAuthProvidersProviderInformationRequest}
     * @returns {@link B2BOrganizationsMembersOAuthProvidersMicrosoftResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    microsoft(params: B2BOrganizationsMembersOAuthProvidersProviderInformationRequest): Promise<B2BOrganizationsMembersOAuthProvidersMicrosoftResponse>;
}
