import { CryptoWallets } from "./crypto_wallets";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Passwords } from "./passwords";
import { Sessions } from "./sessions";
import { TOTPs } from "./totps";
import { Users } from "./users";
import { WebAuthn } from "./webauthn";
import { BaseClient, ClientConfig } from "../shared/client";
export declare class Client extends BaseClient {
    users: Users;
    magicLinks: MagicLinks;
    otps: OTPs;
    oauth: OAuth;
    passwords: Passwords;
    sessions: Sessions;
    totps: TOTPs;
    webauthn: WebAuthn;
    cryptoWallets: CryptoWallets;
    constructor(config: ClientConfig);
}
