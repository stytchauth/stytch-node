import * as jose from "jose";
import { BaseClient, ClientConfig } from "../shared/client";
import { Discovery } from "./discovery";
import { JwtConfig } from "../shared/sessions";
import { M2M } from "../b2c/m2m";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { Organizations } from "./organizations";
import { OTPs } from "./otp";
import { Passwords } from "./passwords";
import { PolicyCache } from "./rbac_local";
import { RBAC } from "./rbac";
import { Sessions } from "./sessions";
import { SSO } from "./sso";

export class B2BClient extends BaseClient {
  protected jwtConfig: JwtConfig;
  discovery: Discovery;
  m2m: M2M;
  magicLinks: MagicLinks;
  oauth: OAuth;
  otps: OTPs;
  organizations: Organizations;
  passwords: Passwords;
  rbac: RBAC;
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
          `/v1/b2b/sessions/jwks/${config.project_id}`,
          this.fetchConfig.baseURL
        )
      ),
    };

    const policyCache = new PolicyCache(new RBAC(this.fetchConfig));

    this.discovery = new Discovery(this.fetchConfig);
    this.m2m = new M2M(this.fetchConfig, this.jwtConfig);
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.oauth = new OAuth(this.fetchConfig);
    this.otps = new OTPs(this.fetchConfig);
    this.organizations = new Organizations(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
    this.rbac = new RBAC(this.fetchConfig);
    this.sso = new SSO(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, this.jwtConfig, policyCache);
  }
}
