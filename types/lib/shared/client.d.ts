import type { Dispatcher } from "undici";
import { fetchConfig } from ".";
export interface ClientConfig {
    project_id: string;
    secret: string;
    env?: string;
    timeout?: number;
    dispatcher?: Dispatcher;
    fraud_env?: string;
    custom_base_url?: string;
}
export declare class BaseClient {
    protected fetchConfig: fetchConfig;
    protected baseURL: string;
    constructor(config: ClientConfig);
}
