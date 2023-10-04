import type { Dispatcher } from "undici";
import * as envs from "./envs";
import { version } from "../../package.json";
import { fetchConfig } from ".";
import { base64Encode } from "./base64";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

export interface ClientConfig {
  project_id: string;
  secret: string;
  env?: string;
  timeout?: number;
  dispatcher?: Dispatcher;
}

export class BaseClient {
  protected fetchConfig: fetchConfig;
  protected baseURL: string;

  constructor(config: ClientConfig) {
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
      if (config.project_id.startsWith("project-live-")) {
        config.env = envs.live;
      } else {
        config.env = envs.test;
      }
    }

    if (config.env != envs.test && config.env != envs.live) {
      // TODO: warn about non-production configuration
    }

    const headers = {
      "Content-Type": "application/json",
      "User-Agent": `Stytch Node v${version}`,
      Authorization:
        "Basic " + base64Encode(config.project_id + ":" + config.secret),
    };

    this.fetchConfig = {
      baseURL: config.env,
      headers,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      dispatcher: config.dispatcher,
    };

    // Get a baseURL that ends with a slash to make building route URLs easier.
    this.baseURL = config.env;
    if (!this.baseURL.endsWith("/")) {
      this.baseURL += "/";
    }
  }
}
