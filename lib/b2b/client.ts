import * as jose from "jose";
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

export class B2BClient extends BaseClient {
  protected jwtConfig: JwtConfig;
  discovery: Discovery;
  magicLinks: MagicLinks;
  oauth: OAuth;
  otps: OTPs;
  organizations: Organizations;
  passwords: Passwords;
  sso: SSO;
  sessions: Sessions;

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

    this.discovery = new Discovery(this.fetchConfig);
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.oauth = new OAuth(this.fetchConfig);
    this.otps = new OTPs(this.fetchConfig);
    this.organizations = new Organizations(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
    this.sso = new SSO(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, this.jwtConfig);
  }
}
