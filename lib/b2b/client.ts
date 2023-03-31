import { MagicLinks } from "./magic_links";
import { Sessions } from "./sessions";
import { Organizations } from "./organizations";
import { SSO } from "./sso";
import { BaseClient, ClientConfig } from "../shared/client";
import * as jose from "jose";
import { JwtConfig } from "../shared/sessions";
import { Discovery } from "./discovery";
import { Passwords } from "./passwords";

export class B2BClient extends BaseClient {
  protected jwtConfig: JwtConfig;
  magicLinks: MagicLinks;
  sessions: Sessions;
  organizations: Organizations;
  sso: SSO;
  discovery: Discovery;
  passwords: Passwords;

  constructor(config: ClientConfig) {
    super(config);

    if (!this.fetchConfig.baseURL.endsWith("b2b/")) {
      this.fetchConfig.baseURL += "b2b/";
    }

    this.jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(
        new URL(`sessions/jwks/${config.project_id}`, this.fetchConfig.baseURL)
      ),
    };

    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, this.jwtConfig);
    this.organizations = new Organizations(this.fetchConfig);
    this.sso = new SSO(this.fetchConfig);
    this.discovery = new Discovery(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
  }
}
