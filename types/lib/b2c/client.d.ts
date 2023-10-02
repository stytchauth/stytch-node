import { BaseClient, ClientConfig } from "../shared/client";
import { CryptoWallets } from "./crypto_wallets";
import { JwtConfig } from "../shared/sessions";
import { M2M } from "./m2m";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Passwords } from "./passwords";
import { Sessions } from "./sessions";
import { TOTPs } from "./totps";
import { Users } from "./users";
import { WebAuthn } from "./webauthn";
export declare class Client extends BaseClient {
    protected jwtConfig: JwtConfig;
    cryptoWallets: CryptoWallets;
    m2m: M2M;
    magicLinks: MagicLinks;
    oauth: OAuth;
    otps: OTPs;
    passwords: Passwords;
    sessions: Sessions;
    totps: TOTPs;
    users: Users;
    webauthn: WebAuthn;
    constructor(config: ClientConfig);
}
