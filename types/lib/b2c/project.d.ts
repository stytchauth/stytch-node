import { fetchConfig } from "../shared";
export interface ProjectMetric {
    count: number;
    metric_type?: "UNKNOWN" | "USER_COUNT" | "ORGANIZATION_COUNT" | "MEMBER_COUNT" | "M2M_CLIENT_COUNT" | string;
}
export interface ProjectMetricsResponse {
    request_id: string;
    project_id: string;
    metrics: ProjectMetric[];
    status_code: number;
}
export declare class Project {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * @param params {@link ProjectMetricsRequest}
     * @returns {@link ProjectMetricsResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    metrics(): Promise<ProjectMetricsResponse>;
}
