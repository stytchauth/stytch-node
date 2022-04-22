import { URL } from "url";
import * as jose from "jose";
import axios from "axios";
import { version } from "../package.json";
import * as envs from "./envs";
import { CryptoWallets } from "./crypto_wallets";
import { Users } from "./users";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Sessions } from "./sessions";
import { TOTPs } from "./totps";
import { WebAuthn } from "./webauthn";
import type { AxiosInstance } from "axios";

const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes

interface Config {
  project_id: string;
  secret: string;
  env: string;
  timeout?: number;
}

export class Client {
  users: Users;
  magicLinks: MagicLinks;
  otps: OTPs;
  oauth: OAuth;
  sessions: Sessions;
  totps: TOTPs;
  webauthn: WebAuthn;
  cryptoWallets: CryptoWallets;

  private client: AxiosInstance;

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

    this.client = axios.create({
      baseURL: config.env,
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

    this.users = new Users(this.client);
    this.magicLinks = new MagicLinks(this.client);
    this.oauth = new OAuth(this.client);
    this.otps = new OTPs(this.client);
    this.sessions = new Sessions(this.client, jwtConfig);
    this.totps = new TOTPs(this.client);
    this.webauthn = new WebAuthn(this.client);
    this.cryptoWallets = new CryptoWallets(this.client);
  }
}
