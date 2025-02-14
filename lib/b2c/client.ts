import * as jose from "jose";
import { BaseClient, ClientConfig } from "../shared/client";
import { CryptoWallets } from "./crypto_wallets";
import { Fraud } from "./fraud";
import { Impersonation } from "./impersonation";
import { JwtConfig } from "../shared/sessions";
import { M2M } from "./m2m";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Passwords } from "./passwords";
import { Project } from "./project";
import { Sessions } from "./sessions";
import { TOTPs } from "./totps";
import { Users } from "./users";
import { WebAuthn } from "./webauthn";

export class Client extends BaseClient {
  protected jwtConfig: JwtConfig;
  cryptoWallets: CryptoWallets;
  fraud: Fraud;
  impersonation: Impersonation;
  m2m: M2M;
  magicLinks: MagicLinks;
  oauth: OAuth;
  otps: OTPs;
  passwords: Passwords;
  project: Project;
  sessions: Sessions;
  totps: TOTPs;
  users: Users;
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

    this.cryptoWallets = new CryptoWallets(this.fetchConfig);
    this.fraud = new Fraud(this.fetchConfig);
    this.impersonation = new Impersonation(this.fetchConfig);
    this.m2m = new M2M(this.fetchConfig, this.jwtConfig);
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.oauth = new OAuth(this.fetchConfig);
    this.otps = new OTPs(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
    this.project = new Project(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, this.jwtConfig);
    this.totps = new TOTPs(this.fetchConfig);
    this.users = new Users(this.fetchConfig);
    this.webauthn = new WebAuthn(this.fetchConfig);
  }
}
