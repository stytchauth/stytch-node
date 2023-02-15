import { MagicLinks } from "./magic_links";
import { Sessions } from "./sessions";
import { Organizations } from "./organizations";
import { SSO } from "./sso";
import { BaseClient, ClientConfig } from "../shared/client";
export declare class B2BClient extends BaseClient {
    magicLinks: MagicLinks;
    sessions: Sessions;
    organizations: Organizations;
    sso: SSO;
    constructor(config: ClientConfig);
}
