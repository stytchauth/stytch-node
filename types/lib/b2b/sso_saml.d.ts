import { fetchConfig } from "../shared";
import { SAMLConnection } from "./sso";
export interface B2BSAMLCreateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    display_name?: string;
}
export interface B2BSAMLCreateConnectionResponse {
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
export interface B2BSAMLDeleteVerificationCertificateRequest {
    organization_id: string;
    connection_id: string;
    certificate_id: string;
}
export interface B2BSAMLDeleteVerificationCertificateResponse {
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
export interface B2BSAMLUpdateConnectionRequest {
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
}
export interface B2BSAMLUpdateConnectionResponse {
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
    createConnection(data: B2BSAMLCreateConnectionRequest): Promise<B2BSAMLCreateConnectionResponse>;
    /**
     * Updates an existing SAML connection.
     *
     * Note that a newly created connection will not become active until all of the following are provided:
     * * `idp_sso_url`
     * * `attribute_mapping`
     * * `idp_entity_id`
     * * `x509_certificate`
     */
    updateConnection(data: B2BSAMLUpdateConnectionRequest): Promise<B2BSAMLUpdateConnectionResponse>;
    /**
     * Delete a SAML verification certificate.
     *
     * You may need to do this when rotating certificates from your IdP, since Stytch allows a maximum of 5
     * certificates per connection. There must always be at least one certificate per active connection.
     */
    deleteVerificationCertificate(data: B2BSAMLDeleteVerificationCertificateRequest): Promise<B2BSAMLDeleteVerificationCertificateResponse>;
}
