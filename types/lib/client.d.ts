import { CryptoWallets } from "./crypto_wallets";
import { Users } from "./users";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Sessions } from "./sessions";
import { TOTPs } from "./totps";
import { WebAuthn } from "./webauthn";
interface Config {
    project_id: string;
    secret: string;
    env: string;
    timeout?: number;
}
export declare class Client {
    users: Users;
    magicLinks: MagicLinks;
    otps: OTPs;
    oauth: OAuth;
    sessions: Sessions;
    totps: TOTPs;
    webauthn: WebAuthn;
    cryptoWallets: CryptoWallets;
    private client;
    constructor(config: Config);
}
export {};
