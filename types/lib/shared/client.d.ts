/// <reference types="node" />
import * as http from "http";
import { fetchConfig } from ".";
export interface ClientConfig {
    project_id: string;
    secret: string;
    env: string;
    timeout?: number;
    agent?: http.Agent;
}
export declare class BaseClient {
    protected fetchConfig: fetchConfig;
    protected baseURL: string;
    constructor(config: ClientConfig);
}
