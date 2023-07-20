import { BaseClient, ClientConfig } from "../shared/client";
import { CryptoWallets } from "./crypto_wallets";
import { JwtConfig } from "../shared/sessions";
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
    users: Users;
    sessions: Sessions;
    cryptoWallets: CryptoWallets;
    magicLinks: MagicLinks;
    passwords: Passwords;
    oauth: OAuth;
    otps: OTPs;
    totps: TOTPs;
    webauthn: WebAuthn;
    constructor(config: ClientConfig);
}
