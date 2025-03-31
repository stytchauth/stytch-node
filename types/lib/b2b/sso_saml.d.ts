import { Authorization } from "../shared/method_options";
import { fetchConfig } from "../shared";
import { SAMLConnection, SAMLConnectionImplicitRoleAssignment, SAMLGroupImplicitRoleAssignment } from "./sso";
export interface B2BSSOSAMLCreateConnectionRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOSAMLDeleteVerificationCertificateRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOSAMLUpdateByURLRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOSAMLUpdateConnectionRequestOptions {
    /**
     * Optional authorization object.
     * Pass in an active Stytch Member session token or session JWT and the request
     * will be run using that member's permissions.
     */
    authorization?: Authorization;
}
export interface B2BSSOSAMLCreateConnectionRequest {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
     */
    organization_id: string;
    display_name?: string;
    /**
     * Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`,
     * `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`,
     * `rippling`, `salesforce`, `shibboleth`, or `generic`.
     *
     * Specifying a known provider allows Stytch to handle any provider-specific logic.
     */
    identity_provider?: "classlink" | "cyberark" | "duo" | "generic" | "google-workspace" | "jumpcloud" | "keycloak" | "miniorange" | "microsoft-entra" | "okta" | "onelogin" | "pingfederate" | "rippling" | "salesforce" | "shibboleth" | string;
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
    /**
     * The organization ID that the SAML connection belongs to. You may also use the organization_slug here as
     * a convenience.
     */
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
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
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
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug here as a convenience.
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
     * All Members who log in with this SAML connection will implicitly receive the specified Roles. See the
     * [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role
     * assignment.
     */
    saml_connection_implicit_role_assignments?: SAMLConnectionImplicitRoleAssignment[];
    /**
     * Defines the names of the SAML groups
     *  that grant specific role assignments. For each group-Role pair, if a Member logs in with this SAML
     * connection and
     *  belongs to the specified SAML group, they will be granted the associated Role. See the
     *  [RBAC guide](https://stytch.com/docs/b2b/guides/rbac/role-assignment) for more information about role
     * assignment. Before adding any group implicit role assignments, you must add a "groups" key to your SAML
     * connection's
     *          `attribute_mapping`. Make sure that your IdP is configured to correctly send the group
     * information.
     */
    saml_group_implicit_role_assignments?: SAMLGroupImplicitRoleAssignment[];
    /**
     * An alternative URL to use for the Audience Restriction. This value can be used when you wish to migrate
     * an existing SAML integration to Stytch with zero downtime. Read our
     * [SSO migration guide](https://stytch.com/docs/b2b/guides/migrations/additional-migration-considerations)
     * for more info.
     */
    alternative_audience_uri?: string;
    /**
     * Name of the IdP. Enum with possible values: `classlink`, `cyberark`, `duo`, `google-workspace`,
     * `jumpcloud`, `keycloak`, `miniorange`, `microsoft-entra`, `okta`, `onelogin`, `pingfederate`,
     * `rippling`, `salesforce`, `shibboleth`, or `generic`.
     *
     * Specifying a known provider allows Stytch to handle any provider-specific logic.
     */
    identity_provider?: "classlink" | "cyberark" | "duo" | "generic" | "google-workspace" | "jumpcloud" | "keycloak" | "miniorange" | "microsoft-entra" | "okta" | "onelogin" | "pingfederate" | "rippling" | "salesforce" | "shibboleth" | string;
    /**
     * A PKCS1 format RSA private key used for signing SAML requests. Only PKCS1 format (starting with
     * "-----BEGIN RSA PRIVATE KEY-----") is supported. When provided, Stytch will generate a new x509
     * certificate from this key and return it in the signing_certificates array.
     */
    signing_private_key?: string;
    /**
     * The NameID format the SAML Connection expects to use. Defaults to
     * `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.
     */
    nameid_format?: string;
    /**
     * An alternative URL to use for the `AssertionConsumerServiceURL` in SP initiated SAML AuthNRequests. This
     * value can be used when you wish to migrate an existing SAML integration to Stytch with zero downtime.
     * Note that you will be responsible for proxying requests sent to the Alternative ACS URL to Stytch. Read
     * our
     * [SSO migration guide](https://stytch.com/docs/b2b/guides/migrations/additional-migration-considerations)
     * for more info.
     */
    alternative_acs_url?: string;
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
     * @param options {@link B2BSSOSAMLCreateConnectionRequestOptions}
     * @returns {@link B2BSSOSAMLCreateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    createConnection(data: B2BSSOSAMLCreateConnectionRequest, options?: B2BSSOSAMLCreateConnectionRequestOptions): Promise<B2BSSOSAMLCreateConnectionResponse>;
    /**
     * Updates an existing SAML connection.
     *
     * Note that a newly created connection will not become active until all of the following are provided:
     * * `idp_sso_url`
     * * `attribute_mapping`
     * * `idp_entity_id`
     * * `x509_certificate`
     * @param data {@link B2BSSOSAMLUpdateConnectionRequest}
     * @param options {@link B2BSSOSAMLUpdateConnectionRequestOptions}
     * @returns {@link B2BSSOSAMLUpdateConnectionResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateConnection(data: B2BSSOSAMLUpdateConnectionRequest, options?: B2BSSOSAMLUpdateConnectionRequestOptions): Promise<B2BSSOSAMLUpdateConnectionResponse>;
    /**
     * Used to update an existing SAML connection using an IDP metadata URL.
     *
     * A newly created connection will not become active until all the following are provided:
     * * `idp_sso_url`
     * * `idp_entity_id`
     * * `x509_certificate`
     * * `attribute_mapping` (must be supplied using [Update SAML Connection](update-saml-connection))
     * @param data {@link B2BSSOSAMLUpdateByURLRequest}
     * @param options {@link B2BSSOSAMLUpdateByURLRequestOptions}
     * @returns {@link B2BSSOSAMLUpdateByURLResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    updateByURL(data: B2BSSOSAMLUpdateByURLRequest, options?: B2BSSOSAMLUpdateByURLRequestOptions): Promise<B2BSSOSAMLUpdateByURLResponse>;
    /**
     * Delete a SAML verification certificate.
     *
     * You may need to do this when rotating certificates from your IdP, since Stytch allows a maximum of 5
     * certificates per connection. There must always be at least one certificate per active connection.
     * @param data {@link B2BSSOSAMLDeleteVerificationCertificateRequest}
     * @param options {@link B2BSSOSAMLDeleteVerificationCertificateRequestOptions}
     * @returns {@link B2BSSOSAMLDeleteVerificationCertificateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    deleteVerificationCertificate(data: B2BSSOSAMLDeleteVerificationCertificateRequest, options?: B2BSSOSAMLDeleteVerificationCertificateRequestOptions): Promise<B2BSSOSAMLDeleteVerificationCertificateResponse>;
}
