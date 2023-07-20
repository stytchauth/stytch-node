import { fetchConfig } from "../shared";
import { IntermediateSessions } from "./discovery_intermediate_sessions";
import { Member, Organization } from "./organizations";
import { MfaRequired } from "./mfa";
import { Organizations } from "./discovery_organizations";
export interface DiscoveredOrganization {
    /**
     * Indicates whether or not the discovery magic link initiated session is valid for the organization's
     * allowed auth method settings.
     *   If not, the member needs to perform additional authentication before logging in - such as password or
     * SSO auth.
     */
    member_authenticated: boolean;
    organization?: Organization;
    membership?: Membership;
    primary_required?: PrimaryRequired;
    mfa_required?: MfaRequired;
}
export interface Membership {
    type: string;
    details?: Record<string, any>;
    /**
     * The [Member object](https://stytch.com/docs/b2b/api/member-object) if one already exists, or null if one
     * does not.
     */
    member?: Member;
}
export interface PrimaryRequired {
    allowed_auth_methods: string[];
}
export declare class Discovery {
    private fetchConfig;
    intermediateSessions: IntermediateSessions;
    organizations: Organizations;
    constructor(fetchConfig: fetchConfig);
}
