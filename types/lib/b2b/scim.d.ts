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
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    identity_provider: string;
    base_url: string;
    bearer_token_last_four: string;
    scim_group_implicit_role_assignments: SCIMGroupImplicitRoleAssignments[];
    next_bearer_token_last_four: string;
    bearer_token_expires_at?: string;
    next_bearer_token_expires_at?: string;
}
export interface SCIMConnectionWithNextToken {
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    base_url: string;
    identity_provider: string;
    bearer_token_last_four: string;
    next_bearer_token: string;
    scim_group_implicit_role_assignments: SCIMGroupImplicitRoleAssignments[];
    bearer_token_expires_at?: string;
    next_bearer_token_expires_at?: string;
}
export interface SCIMConnectionWithToken {
    organization_id: string;
    connection_id: string;
    status: string;
    display_name: string;
    identity_provider: string;
    base_url: string;
    bearer_token: string;
    scim_group_implicit_role_assignments: SCIMGroupImplicitRoleAssignments[];
    bearer_token_expires_at?: string;
}
export interface SCIMGroup {
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
