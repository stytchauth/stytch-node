import { Connection } from "./scim_connection";
import { fetchConfig } from "../shared";
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
