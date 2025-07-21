import { ConsumerRBACPolicy } from "./consumer_rbac";
import { fetchConfig } from "../shared";
export interface ConsumerRBACRBACPolicyResponse {
    request_id: string;
    status_code: number;
    policy?: ConsumerRBACPolicy;
}
export declare class RBAC {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param params {@link ConsumerRBACRBACPolicyRequest}
     * @returns {@link ConsumerRBACRBACPolicyResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    policy(): Promise<ConsumerRBACRBACPolicyResponse>;
}
