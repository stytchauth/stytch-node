import { fetchConfig } from "../shared";
import { IntermediateSessions } from "./discovery_intermediate_sessions";
import { Member, Organization } from "./organizations";
import { MfaRequired } from "./mfa";
import { Organizations } from "./discovery_organizations";
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
    type: string;
    details?: Record<string, any>;
    /**
     * The [Member object](https://stytch.com/docs/b2b/api/member-object) if one already exists, or null if one
     * does not.
     */
    member?: Member;
}
export interface PrimaryRequired {
    /**
     * If non-empty, indicates that the Organization restricts the authentication methods it allows for login
     * (such as `sso` or `password`), and the end user must complete one of those authentication methods to log
     * in. If empty, indicates that the Organization does not restrict the authentication method it allows for
     * login, but the end user does not have any transferrable primary factors. Only email magic link and OAuth
     * factors can be transferred between Organizations.
     */
    allowed_auth_methods: string[];
}
export declare class Discovery {
    private fetchConfig;
    intermediateSessions: IntermediateSessions;
    organizations: Organizations;
    constructor(fetchConfig: fetchConfig);
}
