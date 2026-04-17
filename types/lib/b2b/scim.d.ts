import { Connection } from "./scim_connection";
import { fetchConfig } from "../shared";
export interface Address {
    formatted: string;
    street_address: string;
    locality: string;
    region: string;
    postal_code: string;
    country: string;
    type: string;
    primary: boolean;
}
export interface B2BSCIMEmail {
    value: string;
    type: string;
    primary: boolean;
}
export interface B2BSCIMName {
    formatted: string;
    family_name: string;
    given_name: string;
    middle_name: string;
    honorific_prefix: string;
    honorific_suffix: string;
}
export interface B2BSCIMPhoneNumber {
    value: string;
    type: string;
    primary: boolean;
}
export interface B2BSCIMX509Certificate {
    value: string;
    type: string;
    primary: boolean;
}
export interface EnterpriseExtension {
    employee_number: string;
    cost_center: string;
    division: string;
    department: string;
    organization: string;
    manager?: Manager;
}
export interface Entitlement {
    value: string;
    type: string;
    primary: boolean;
}
export interface Group {
    value: string;
    display: string;
}
export interface IMs {
    value: string;
    type: string;
    primary: boolean;
}
export interface Manager {
    value: string;
    ref: string;
    display_name: string;
}
export interface Photo {
    value: string;
    type: string;
    primary: boolean;
}
export interface Role {
    value: string;
    type: string;
    primary: boolean;
}
export interface SCIMAttributes {
    user_name: string;
    id: string;
    external_id: string;
    active: boolean;
    groups: Group[];
    display_name: string;
    nick_name: string;
    profile_url: string;
    user_type: string;
    title: string;
    preferred_language: string;
    locale: string;
    timezone: string;
    emails: B2BSCIMEmail[];
    phone_numbers: B2BSCIMPhoneNumber[];
    addresses: Address[];
    ims: IMs[];
    photos: Photo[];
    entitlements: Entitlement[];
    roles: Role[];
    x509certificates: B2BSCIMX509Certificate[];
    name?: B2BSCIMName;
    enterprise_extension?: EnterpriseExtension;
}
export interface SCIMConnection {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    /**
     * Name of the IdP. Enum with possible values: `okta`, `microsoft-entra`, `cyberark`, `jumpcloud`,
     * `onelogin`, `pingfederate`, `rippling` or `generic`.
     *
     * Specifying a known provider allows Stytch to handle any provider-specific logic, such as automatically
     * appending `?aadOptscim062020` to the returned BaseURL for `microsoft-entra` SCIM Connections to
     * [enable the SCIM 2.0 compliant flag](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#scim-20-compliance-issues-and-status).
     */
    identity_provider: string;
    /**
     * The URL supplied to the Identity Provider (IdP) alongside the bearer token enabling access to Stytch's
     * SCIM API endpoints
     */
    base_url: string;
    /**
     * The last four digits of the bearer token. If you've lost access to your `bearer_token` and need to
     * generate a new one, use the
     * [SCIM rotate token start endpoint](https://stytch.com/docs/b2b/api/scim-rotate-token-start).
     */
    bearer_token_last_four: string;
    /**
     * An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and
     * a `role_id`.
     */
    scim_group_implicit_role_assignments: SCIMGroupImplicitRoleAssignments[];
    next_bearer_token_last_four: string;
    bearer_token_expires_at?: string;
    /**
     * This field is supplied only during
     * [token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start). The next bearer token expiry
     * time.
     */
    next_bearer_token_expires_at?: string;
}
export interface SCIMConnectionWithNextToken {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    /**
     * The URL supplied to the Identity Provider (IdP) alongside the bearer token enabling access to Stytch's
     * SCIM API endpoints
     */
    base_url: string;
    /**
     * Name of the IdP. Enum with possible values: `okta`, `microsoft-entra`, `cyberark`, `jumpcloud`,
     * `onelogin`, `pingfederate`, `rippling` or `generic`.
     *
     * Specifying a known provider allows Stytch to handle any provider-specific logic, such as automatically
     * appending `?aadOptscim062020` to the returned BaseURL for `microsoft-entra` SCIM Connections to
     * [enable the SCIM 2.0 compliant flag](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#scim-20-compliance-issues-and-status).
     */
    identity_provider: string;
    /**
     * The last four digits of the bearer token. If you've lost access to your `bearer_token` and need to
     * generate a new one, use the
     * [SCIM rotate token start endpoint](https://stytch.com/docs/b2b/api/scim-rotate-token-start).
     */
    bearer_token_last_four: string;
    /**
     * This field is supplied only during
     * [token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start). This token should be used as
     * the new bearer token for the SCIM connection after token rotation has been completed using the
     * [SCIM rotate token complete endpoint](https://stytch.com/docs/b2b/api/scim-rotate-token-complete).
     */
    next_bearer_token: string;
    /**
     * An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and
     * a `role_id`.
     */
    scim_group_implicit_role_assignments: SCIMGroupImplicitRoleAssignments[];
    bearer_token_expires_at?: string;
    /**
     * This field is supplied only during
     * [token rotation](https://stytch.com/docs/b2b/api/scim-rotate-token-start). The next bearer token expiry
     * time.
     */
    next_bearer_token_expires_at?: string;
}
export interface SCIMConnectionWithToken {
    /**
     * Globally unique UUID that identifies a specific Organization. The `organization_id` is critical to
     * perform operations on an Organization, so be sure to preserve this value. You may also use the
     * organization_slug or organization_external_id here as a convenience.
     */
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    /**
     * Name of the IdP. Enum with possible values: `okta`, `microsoft-entra`, `cyberark`, `jumpcloud`,
     * `onelogin`, `pingfederate`, `rippling` or `generic`.
     *
     * Specifying a known provider allows Stytch to handle any provider-specific logic, such as automatically
     * appending `?aadOptscim062020` to the returned BaseURL for `microsoft-entra` SCIM Connections to
     * [enable the SCIM 2.0 compliant flag](https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#scim-20-compliance-issues-and-status).
     */
    identity_provider: string;
    /**
     * The URL supplied to the Identity Provider (IdP) alongside the bearer token enabling access to Stytch's
     * SCIM API endpoints
     */
    base_url: string;
    /**
     * The token supplied to the Identity Provider (IdP) alongside the base URL that grants access to Stytch's
     * SCIM API endpoints. It should be included in HTTP authorization headers. This field is supplied only on
     * creation of the SCIM connection.
     */
    bearer_token: string;
    /**
     * An array of SCIM group implicit role assignments. Each object in the array must contain a `group_id` and
     * a `role_id`.
     */
    scim_group_implicit_role_assignments: SCIMGroupImplicitRoleAssignments[];
    bearer_token_expires_at?: string;
}
export interface SCIMGroup {
    /**
     * Stytch-issued, globally unique UUID that identifies a specific SCIM Group. The entity `id` in the SCIM
     * specification is issued by the Service Provider (SP) and returned to the Identity Provider (IdP) to
     * store and use for uniquely identify and updating the Group moving forward.
     */
    group_id: string;
    group_name: string;
    /**
     * Globally unique UUID that identifies a specific Organization. The organization_id is critical to perform
     * operations on an Organization, so be sure to preserve this value.
     */
    organization_id: string;
    connection_id: string;
}
export interface SCIMGroupImplicitRoleAssignments {
    role_id: string;
    group_id: string;
    group_name: string;
}
export declare class SCIM {
    private fetchConfig;
    connection: Connection;
    constructor(fetchConfig: fetchConfig);
}
