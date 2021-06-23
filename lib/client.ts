import axios from "axios";
import { version } from "../package.json";
import Users from "./users";
import MagicLinks from "./magic_links";

import type { AxiosInstance } from "axios";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

interface Config {
  project_id: string;
  secret: string;
  env: "test" | "live";
  timeout?: number;
}

function baseURL(env: "test" | "live"): string {
  return {
    test: "https://test.stytch.com/v1/",
    live: "https://api.stytch.com/v1/",
  }[env];
}

export default class Client {
  users: Users;
  magicLinks: MagicLinks;

  private client: AxiosInstance;

  constructor(config: Config) {
    if (typeof config != "object") {
      throw new Error(
        "Unexpected config type. " +
          "Refer to https://github.com/stytchauth/stytch-node " +
          "for how to use the Node client library."
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

    if (config.env != "test" && config.env != "live") {
      throw new Error(
        `Expected env to be "test" or "live", got "${config.env}"`
      );
    }

    this.client = axios.create({
      baseURL: baseURL(config.env),
      timeout: config.timeout || DEFAULT_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `Stytch Node v${version}`,
      },
      auth: {
        username: config.project_id,
        password: config.secret,
      },
    });

    this.users = new Users(this.client);
    this.magicLinks = new MagicLinks(this.client);
  }
}
