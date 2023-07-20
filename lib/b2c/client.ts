import * as jose from "jose";
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

export class Client extends BaseClient {
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

  constructor(config: ClientConfig) {
    super(config);

    this.jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(
        new URL(
          `/v1/sessions/jwks/${config.project_id}`,
          this.fetchConfig.baseURL
        )
      ),
    };

    this.users = new Users(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, this.jwtConfig);
    this.cryptoWallets = new CryptoWallets(this.fetchConfig);
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
    this.oauth = new OAuth(this.fetchConfig);
    this.otps = new OTPs(this.fetchConfig);
    this.totps = new TOTPs(this.fetchConfig);
    this.webauthn = new WebAuthn(this.fetchConfig);
  }
}
