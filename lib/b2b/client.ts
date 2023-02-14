import * as http from "http";
import { btoa } from "isomorphic-base64";
import * as envs from "../shared/envs";
import { MagicLinks } from "./magic_links";
import { Sessions } from "./sessions";
import { Organizations } from "./organizations";
import { fetchConfig } from "../shared";
import { SSO } from "./sso";
import { version } from "../../package.json";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

interface Config {
  project_id: string;
  secret: string;
  env: string;
  timeout?: number;
  agent?: http.Agent;
}

export class B2BClient {
  magicLinks: MagicLinks;
  sessions: Sessions;
  organizations: Organizations;
  sso: SSO;

  private fetchConfig: fetchConfig;

  constructor(config: Config) {
    if (typeof config != "object") {
      throw new Error(
        "Unexpected config type. Refer to https://github.com/stytchauth/stytch-node for how to use the Node client library."
      );
    }

    if (!config.project_id) {
      throw new Error('Missing "project_id" in config');
    }

    if (!config.secret) {
      throw new Error('Missing "secret" in config');
    }

    if (!config.env) {
      throw new Error('Missing "env" in config');
    }

    if (config.env != envs.test && config.env != envs.live) {
      // TODO: warn about non-production configuration
    }

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": `Stytch Node v${version}`,
      Authorization: "Basic " + btoa(config.project_id + ":" + config.secret),
    };

    this.fetchConfig = {
      baseURL: config.env,
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      agent: config.agent,
    };

    // Get a baseURL that ends with a slash to make building route URLs easier.
    let baseURL = config.env;
    if (!baseURL.endsWith("/")) {
      baseURL += "/";
    }

    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig);
    this.organizations = new Organizations(this.fetchConfig);
    this.sso = new SSO(this.fetchConfig);
  }
}
