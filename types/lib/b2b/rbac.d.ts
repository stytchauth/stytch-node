import { fetchConfig } from "../shared";
export interface Policy {
    roles: PolicyRole[];
    resources: PolicyResource[];
    scopes: PolicyScope[];
}
export interface PolicyResource {
    /**
     * A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.
     *
     *   A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch
     * default Resources with reserved  `resource_id`s. These include:
     *
     *   * `stytch.organization`
     *   * `stytch.member`
     *   * `stytch.sso`
     *   * `stytch.self`
     *
     *   Check out the
     * [guide on Stytch default Resources](https://stytch.com/docs/b2b/guides/rbac/stytch-default) for a more
     * detailed explanation.
     *
     *
     */
    resource_id: string;
    description: string;
    /**
     * A list of all possible actions for a provided Resource.
     *
     *   Reserved `actions` that are predefined by Stytch include:
     *
     *   * `*`
     *   * For the `stytch.organization` Resource:
     *     * `update.info.name`
     *     * `update.info.slug`
     *     * `update.info.untrusted_metadata`
     *     * `update.info.email_jit_provisioning`
     *     * `update.info.logo_url`
     *     * `update.info.email_invites`
     *     * `update.info.allowed_domains`
     *     * `update.info.default_sso_connection`
     *     * `update.info.sso_jit_provisioning`
     *     * `update.info.mfa_policy`
     *     * `update.info.implicit_roles`
     *     * `delete`
     *   * For the `stytch.member` Resource:
     *     * `create`
     *     * `update.info.name`
     *     * `update.info.untrusted_metadata`
     *     * `update.info.mfa-phone`
     *     * `update.info.delete.mfa-phone`
     *     * `update.settings.is-breakglass`
     *     * `update.settings.mfa_enrolled`
     *     * `update.settings.roles`
     *     * `search`
     *     * `delete`
     *   * For the `stytch.sso` Resource:
     *     * `create`
     *     * `update`
     *     * `delete`
     *   * For the `stytch.self` Resource:
     *     * `update.info.name`
     *     * `update.info.untrusted_metadata`
     *     * `update.info.mfa-phone`
     *     * `update.info.delete.mfa-phone`
     *     * `update.info.delete.password`
     *     * `update.settings.mfa_enrolled`
     *     * `delete`
     *
     */
    actions: string[];
}
export interface PolicyRole {
    /**
     * The unique identifier of the RBAC Role, provided by the developer and intended to be human-readable.
     *
     *   Reserved `role_id`s that are predefined by Stytch include:
     *
     *   * `stytch_member`
     *   * `stytch_admin`
     *
     *   Check out the [guide on Stytch default Roles](https://stytch.com/docs/b2b/guides/rbac/stytch-default)
     * for a more detailed explanation.
     *
     *
     */
    role_id: string;
    description: string;
    /**
     * A list of permissions that link a [Resource](https://stytch.com/docs/b2b/api/rbac-resource-object) to a
     * list of actions.
     */
    permissions: PolicyRolePermission[];
}
export interface PolicyRolePermission {
    /**
     * A unique identifier of the RBAC Resource, provided by the developer and intended to be human-readable.
     *
     *   A `resource_id` is not allowed to start with `stytch`, which is a special prefix used for Stytch
     * default Resources with reserved  `resource_id`s. These include:
     *
     *   * `stytch.organization`
     *   * `stytch.member`
     *   * `stytch.sso`
     *   * `stytch.self`
     *
     *   Check out the
     * [guide on Stytch default Resources](https://stytch.com/docs/docs/b2b/guides/rbac/stytch-default) for a
     * more detailed explanation.
     *
     *
     */
    resource_id: string;
    /**
     * A list of permitted actions the Scope is required to take with the provided Resource. You can use `*` as
     * a wildcard to require a Scope permission to use all possible actions related to the Resource.
     */
    actions: string[];
}
export interface PolicyScope {
    scope: string;
    description: string;
    permissions: PolicyScopePermission[];
}
export interface PolicyScopePermission {
    resource_id: string;
    actions: string[];
}
export interface B2BRBACPolicyResponse {
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
     * The RBAC Policy document that contains all defined Roles and Resources – which are managed in the
     * [Dashboard](https://stytch.com/docs/dashboard/rbac). Read more about these entities and how they work in
     * our [RBAC overview](https://stytch.com/docs/b2b/guides/rbac/overview).
     */
    policy?: Policy;
}
export declare class RBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Get the active RBAC Policy for your current Stytch Project. An RBAC Policy is the canonical document
     * that stores all defined Resources and Roles within your RBAC permissioning model.
     *
     * When using the backend SDKs, the RBAC Policy will be cached to allow for local evaluations, eliminating
     * the need for an extra request to Stytch. The policy will be refreshed if an authorization check is
     * requested and the RBAC policy was last updated more than 5 minutes ago.
     *
     * Resources and Roles can be created and managed within the
     * [Dashboard](https://stytch.com/docs/dashboard/rbac). Additionally,
     * [Role assignment](https://stytch.com/docs/b2b/guides/rbac/role-assignment) can be programmatically
     * managed through certain Stytch API endpoints.
     *
     * Check out the [RBAC overview](https://stytch.com/docs/b2b/guides/rbac/overview) to learn more about
     * Stytch's RBAC permissioning model.
     * @param params {@link B2BRBACPolicyRequest}
     * @returns {@link B2BRBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(): Promise<B2BRBACPolicyResponse>;
}
