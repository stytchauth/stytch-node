import { Policy } from "./rbac";
import { fetchConfig } from "../shared";
export declare class RBACCacheManager {
    private rbac;
    private _policy?;
    private _timestamp?;
    constructor(fetchConfig: fetchConfig);
    private fresh;
    private reload;
    getPolicy(): Promise<Policy>;
}
export declare function performAuthorizationCheck({ policy, subjectRoles, subjectOrgID, authzRequest, }: {
    policy: Policy;
    subjectRoles: string[];
    subjectOrgID: string;
    authzRequest: {
        organization_id: string;
        resource_id: string;
        action: string;
    };
}): void;
