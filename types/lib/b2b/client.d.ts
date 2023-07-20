import { BaseClient, ClientConfig } from "../shared/client";
import { Discovery } from "./discovery";
import { JwtConfig } from "../shared/sessions";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { Organizations } from "./organizations";
import { OTPs } from "./otp";
import { Passwords } from "./passwords";
import { Sessions } from "./sessions";
import { SSO } from "./sso";
export declare class B2BClient extends BaseClient {
    protected jwtConfig: JwtConfig;
    organizations: Organizations;
    sessions: Sessions;
    discovery: Discovery;
    magicLinks: MagicLinks;
    oauth: OAuth;
    otps: OTPs;
    passwords: Passwords;
    sso: SSO;
    constructor(config: ClientConfig);
}
