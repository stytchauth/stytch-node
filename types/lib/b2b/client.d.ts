import { MagicLinks } from "./magic_links";
import { Sessions } from "./sessions";
import { Organizations } from "./organizations";
import { SSO } from "./sso";
import { BaseClient, ClientConfig } from "../shared/client";
import { JwtConfig } from "../shared/sessions";
import { Discovery } from "./discovery";
import { Passwords } from "./passwords";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
export declare class B2BClient extends BaseClient {
    protected jwtConfig: JwtConfig;
    magicLinks: MagicLinks;
    sessions: Sessions;
    oauth: OAuth;
    organizations: Organizations;
    sso: SSO;
    discovery: Discovery;
    passwords: Passwords;
    otps: OTPs;
    constructor(config: ClientConfig);
}
