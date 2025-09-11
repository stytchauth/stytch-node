import { fetchConfig } from "../shared";
export interface DebugWhoamiResponse {
    request_id: string;
    project_id: string;
    name: string;
    status_code: number;
}
export declare class Debug {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param params {@link DebugWhoamiRequest}
     * @returns {@link DebugWhoamiResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    whoami(): Promise<DebugWhoamiResponse>;
}
