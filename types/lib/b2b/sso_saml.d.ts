import { fetchConfig } from "../shared";
import { SAMLConnection } from "./sso";
export interface B2BSSOSAMLCreateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    display_name?: string;
}
export interface B2BSSOSAMLCreateConnectionResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * The `SAML Connection` object affected by this API call. See the
     * [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) for complete response
     * field details.
     */
    connection?: SAMLConnection;
}
export interface B2BSSOSAMLDeleteVerificationCertificateRequest {
    organization_id: string;
    connection_id: string;
    certificate_id: string;
}
export interface B2BSSOSAMLDeleteVerificationCertificateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    certificate_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
}
export interface B2BSSOSAMLUpdateByURLRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
    metadata_url: string;
}
export interface B2BSSOSAMLUpdateByURLResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * The `SAML Connection` object affected by this API call. See the
     * [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) for complete response
     * field details.
     */
    connection?: SAMLConnection;
}
export interface B2BSSOSAMLUpdateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
    idp_entity_id?: string;
    display_name?: string;
    /**
     * An object that represents the attributes used to identify a Member. This object will map the IdP-defined
     * User attributes to Stytch-specific values. Required attributes: `email` and one of `full_name` or
     * `first_name` and `last_name`.
     */
    attribute_mapping?: Record<string, any>;
    /**
     * A certificate that Stytch will use to verify the sign-in assertion sent by the IdP, in
     * [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) format. See our
     * [X509 guide](https://stytch.com/docs/b2b/api/saml-certificates) for more info.
     */
    x509_certificate?: string;
    idp_sso_url?: string;
    /**
     * An alternative URL to use for the Audience Restriction. This value can be used when you wish to migrate
     * an existing SAML integration to Stytch with zero downtime.
     */
    alternative_audience_uri?: string;
}
export interface B2BSSOSAMLUpdateConnectionResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * The `SAML Connection` object affected by this API call. See the
     * [SAML Connection Object](https://stytch.com/docs/b2b/api/saml-connection-object) for complete response
     * field details.
     */
    connection?: SAMLConnection;
}
export declare class SAML {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Create a new SAML Connection.
     * @param data {@link B2BSSOSAMLCreateConnectionRequest}
     * @returns {@link B2BSSOSAMLCreateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createConnection(data: B2BSSOSAMLCreateConnectionRequest): Promise<B2BSSOSAMLCreateConnectionResponse>;
    /**
     * Updates an existing SAML connection.
     *
     * Note that a newly created connection will not become active until all of the following are provided:
     * * `idp_sso_url`
     * * `attribute_mapping`
     * * `idp_entity_id`
     * * `x509_certificate`
     * @param data {@link B2BSSOSAMLUpdateConnectionRequest}
     * @returns {@link B2BSSOSAMLUpdateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateConnection(data: B2BSSOSAMLUpdateConnectionRequest): Promise<B2BSSOSAMLUpdateConnectionResponse>;
    /**
     * Used to update an existing SAML connection using an IDP metadata URL.
     *
     * A newly created connection will not become active until all the following are provided:
     * * `idp_sso_url`
     * * `idp_entity_id`
     * * `x509_certificate`
     * * `attribute_mapping` (must be supplied using [Update SAML Connection](update-saml-connection))
     * @param data {@link B2BSSOSAMLUpdateByURLRequest}
     * @returns {@link B2BSSOSAMLUpdateByURLResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateByURL(data: B2BSSOSAMLUpdateByURLRequest): Promise<B2BSSOSAMLUpdateByURLResponse>;
    /**
     * Delete a SAML verification certificate.
     *
     * You may need to do this when rotating certificates from your IdP, since Stytch allows a maximum of 5
     * certificates per connection. There must always be at least one certificate per active connection.
     * @param data {@link B2BSSOSAMLDeleteVerificationCertificateRequest}
     * @returns {@link B2BSSOSAMLDeleteVerificationCertificateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteVerificationCertificate(data: B2BSSOSAMLDeleteVerificationCertificateRequest): Promise<B2BSSOSAMLDeleteVerificationCertificateResponse>;
}
