import axios from "axios";
import { version } from "../package.json";
import * as envs from "./envs";
import { Users } from "./users";
import { MagicLinks } from "./magic_links";
import { OTPs } from "./otps";

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

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */
  createUser;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.get instead. */
  getUser;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.update instead. */
  updateUser;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.delete instead. */
  deleteUser;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deleteEmail instead. */
  deleteUserEmail;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deletePhoneNumber instead. */
  deleteUserPhoneNumber;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.getPending instead. */
  getPendingUsers;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.send instead. */
  sendMagicLinkByEmail;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.loginOrCreate instead. */
  loginOrCreate;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.invite instead. */
  inviteByEmail;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.revokeInvite instead. */
  revokePendingInvite;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.authenticate instead. */
  authenticateMagicLink;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.sms.send instead. */
  sendOTPBySMS;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.sms.loginOrCreate instead. */
  loginOrCreateUserBySMS;
  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.authenticate instead. */
  authenticateOTP;

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

    this.users = new Users(this.client);
    this.magicLinks = new MagicLinks(this.client);
    this.otps = new OTPs(this.client);

    // TODO(v4): Remove these deprecated methods.
    this.createUser = this.users.create;
    this.getUser = this.users.get;
    this.updateUser = this.users.update;
    this.deleteUser = this.users.delete;
    this.deleteUserEmail = this.users.deleteEmail;
    this.deleteUserPhoneNumber = this.users.deletePhoneNumber;
    this.getPendingUsers = this.users.getPending;
    this.sendMagicLinkByEmail = this.magicLinks.email.send;
    this.loginOrCreate = this.magicLinks.email.loginOrCreate;
    this.inviteByEmail = this.magicLinks.email.invite;
    this.revokePendingInvite = this.magicLinks.email.revokeInvite;
    this.authenticateMagicLink = this.magicLinks.authenticate;
    this.sendOTPBySMS = this.otps.sms.send;
    this.loginOrCreateUserBySMS = this.otps.sms.loginOrCreate;
    this.authenticateOTP = this.otps.authenticate;
  }
}
