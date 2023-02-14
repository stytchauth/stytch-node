/// <reference types="node" />
import * as http from "http";
import { MagicLinks } from "./magic_links";
import { Sessions } from "./sessions";
import { Organizations } from "./organizations";
import { SSO } from "./sso";
interface Config {
    project_id: string;
    secret: string;
    env: string;
    timeout?: number;
    agent?: http.Agent;
}
export declare class B2BClient {
    magicLinks: MagicLinks;
    sessions: Sessions;
    organizations: Organizations;
    sso: SSO;
    private fetchConfig;
    constructor(config: Config);
}
export {};
