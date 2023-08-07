import { BaseClient, ClientConfig } from "../shared/client";
import { Discovery } from "./discovery";
import { JwtConfig } from "../shared/sessions";
import { M2M } from "../b2c/m2m";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { Organizations } from "./organizations";
import { OTPs } from "./otp";
import { Passwords } from "./passwords";
import { Sessions } from "./sessions";
import { SSO } from "./sso";
export declare class B2BClient extends BaseClient {
    protected jwtConfig: JwtConfig;
    discovery: Discovery;
    m2m: M2M;
    magicLinks: MagicLinks;
    oauth: OAuth;
    otps: OTPs;
    organizations: Organizations;
    passwords: Passwords;
    sso: SSO;
    sessions: Sessions;
    constructor(config: ClientConfig);
}
