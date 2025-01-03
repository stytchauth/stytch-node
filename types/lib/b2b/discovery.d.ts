import { fetchConfig } from "../shared";
import { IntermediateSessions } from "./discovery_intermediate_sessions";
import { Member, Organization } from "./organizations";
import { MfaRequired } from "./mfa";
import { Organizations } from "./discovery_organizations";
import { PrimaryRequired } from "./sessions";
export interface DiscoveredOrganization {
    /**
     * Indicates whether the Member has all of the factors needed to fully authenticate to this Organization.
     * If false, the Member may need to complete an MFA step or complete a different primary authentication
     * flow. See the `primary_required` and `mfa_required` fields for more details on each.
     */
    member_authenticated: boolean;
    organization?: Organization;
    membership?: Membership;
    primary_required?: PrimaryRequired;
    mfa_required?: MfaRequired;
}
export interface Membership {
    /**
     * Either `active_member`, `pending_member`, `invited_member`, `eligible_to_join_by_email_domain`, or
     * `eligible_to_join_by_oauth_tenant`
     */
    type: string;
    details?: Record<string, any>;
    /**
     * The [Member object](https://stytch.com/docs/b2b/api/member-object) if one already exists, or null if one
     * does not.
     */
    member?: Member;
}
export declare class Discovery {
    private fetchConfig;
    intermediateSessions: IntermediateSessions;
    organizations: Organizations;
    constructor(fetchConfig: fetchConfig);
}
