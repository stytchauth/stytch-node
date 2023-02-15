import { MagicLinks } from "./magic_links";
import { Sessions } from "./sessions";
import { Organizations } from "./organizations";
import { SSO } from "./sso";
import { BaseClient, ClientConfig } from "../shared/client";

export class B2BClient extends BaseClient {
  magicLinks: MagicLinks;
  sessions: Sessions;
  organizations: Organizations;
  sso: SSO;

  constructor(config: ClientConfig) {
    super(config)
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig);
    this.organizations = new Organizations(this.fetchConfig);
    this.sso = new SSO(this.fetchConfig);
  }
}
