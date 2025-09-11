import * as jose from "jose";
import { BaseClient, ClientConfig } from "../shared/client";
import { ConnectedApp } from "../b2c/connected_apps";
import { Debug } from "../b2c/debug";
import { Discovery } from "./discovery";
import { Fraud } from "../b2c/fraud";
import { IDP } from "./idp";
import { Impersonation } from "./impersonation";
import { JwtConfig, trimTrailingSlash } from "../shared/sessions";
import { M2M } from "../b2c/m2m";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { Organizations } from "./organizations";
import { OTPs } from "./otp";
import { Passwords } from "./passwords";
import { PolicyCache } from "./rbac_local";
import { Project } from "../b2c/project";
import { RBAC } from "./rbac";
import { RecoveryCodes } from "./recovery_codes";
import { SCIM } from "./scim";
import { Sessions } from "./sessions";
import { SSO } from "./sso";
import { TOTPs } from "./totps";

export class B2BClient extends BaseClient {
  protected jwtConfig: JwtConfig;
  connectedApp: ConnectedApp;
  debug: Debug;
  discovery: Discovery;
  fraud: Fraud;
  idp: IDP;
  impersonation: Impersonation;
  m2m: M2M;
  magicLinks: MagicLinks;
  oauth: OAuth;
  otps: OTPs;
  organizations: Organizations;
  passwords: Passwords;
  project: Project;
  rbac: RBAC;
  recoveryCodes: RecoveryCodes;
  scim: SCIM;
  sso: SSO;
  sessions: Sessions;
  totps: TOTPs;

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
      issuers: [
        `stytch.com/${config.project_id}`,
        trimTrailingSlash(this.fetchConfig.baseURL),
      ],
    };

    const policyCache = new PolicyCache(new RBAC(this.fetchConfig));

    this.connectedApp = new ConnectedApp(this.fetchConfig);
    this.debug = new Debug(this.fetchConfig);
    this.discovery = new Discovery(this.fetchConfig);
    this.fraud = new Fraud(this.fetchConfig);
    this.idp = new IDP(this.fetchConfig, this.jwtConfig, policyCache);
    this.impersonation = new Impersonation(this.fetchConfig);
    this.m2m = new M2M(this.fetchConfig, this.jwtConfig);
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.oauth = new OAuth(this.fetchConfig);
    this.otps = new OTPs(this.fetchConfig);
    this.organizations = new Organizations(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
    this.project = new Project(this.fetchConfig);
    this.rbac = new RBAC(this.fetchConfig);
    this.recoveryCodes = new RecoveryCodes(this.fetchConfig);
    this.scim = new SCIM(this.fetchConfig);
    this.sso = new SSO(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, this.jwtConfig, policyCache);
    this.totps = new TOTPs(this.fetchConfig);
  }
}
