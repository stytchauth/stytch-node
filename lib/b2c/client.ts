import * as http from "http";
import { btoa } from "isomorphic-base64";
import * as jose from "jose";
import { version } from "../../package.json";
import { CryptoWallets } from "./crypto_wallets";
import * as envs from "./envs";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Passwords } from "./passwords";
import { Sessions } from "./sessions";
import { fetchConfig } from "./shared";
import { TOTPs } from "./totps";
import { Users } from "./users";
import { WebAuthn } from "./webauthn";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

interface Config {
  project_id: string;
  secret: string;
  env: string;
  timeout?: number;
  agent?: http.Agent;
}

export class Client {
  users: Users;
  magicLinks: MagicLinks;
  otps: OTPs;
  oauth: OAuth;
  passwords: Passwords;
  sessions: Sessions;
  totps: TOTPs;
  webauthn: WebAuthn;
  cryptoWallets: CryptoWallets;

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

    const jwtConfig = {
      // Only allow JWTs that were meant for this project.
      projectID: config.project_id,
      // Fetch the signature verification keys for this project as needed.
      jwks: jose.createRemoteJWKSet(
        new URL(`sessions/jwks/${config.project_id}`, baseURL)
      ),
    };

    this.users = new Users(this.fetchConfig);
    this.magicLinks = new MagicLinks(this.fetchConfig);
    this.oauth = new OAuth(this.fetchConfig);
    this.otps = new OTPs(this.fetchConfig);
    this.passwords = new Passwords(this.fetchConfig);
    this.sessions = new Sessions(this.fetchConfig, jwtConfig);
    this.totps = new TOTPs(this.fetchConfig);
    this.webauthn = new WebAuthn(this.fetchConfig);
    this.cryptoWallets = new CryptoWallets(this.fetchConfig);
  }
}
