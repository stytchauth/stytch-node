import axios from "axios";
import { version } from "../package.json";
import * as envs from "./envs";
import { Users } from "./users";
import { MagicLinks } from "./magic_links";
import { OAuth } from "./oauth";
import { OTPs } from "./otps";
import { Sessions } from "./sessions";
import { TOTPs } from "./totps";
import { WebAuthn } from "./webauthn";
import type { AxiosInstance } from "axios";
import type * as users from "./users";
import type * as magicLinks from "./magic_links";
import type * as otps from "./otps";

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
    this.oauth = new OAuth(this.client);
    this.otps = new OTPs(this.client);
    this.sessions = new Sessions(this.client);
    this.totps = new TOTPs(this.client);
    this.webauthn = new WebAuthn(this.client);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */
  createUser(request: users.CreateRequest): Promise<users.CreateResponse> {
    return this.users.create(request);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.get instead. */
  getUser(userID: users.UserID): Promise<users.GetResponse> {
    return this.users.get(userID);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.update instead. */
  updateUser(
    userID: users.UserID,
    request: users.UpdateRequest
  ): Promise<users.UpdateResponse> {
    return this.users.update(userID, request);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.delete instead. */
  deleteUser(userID: users.UserID): Promise<users.DeleteResponse> {
    return this.users.delete(userID);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deleteEmail instead. */
  deleteUserEmail(emailID: string): Promise<users.DeleteEmailResponse> {
    return this.users.deleteEmail(emailID);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deletePhoneNumber instead. */
  deleteUserPhoneNumber(
    phoneID: string
  ): Promise<users.DeletePhoneNumberResponse> {
    return this.users.deletePhoneNumber(phoneID);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.getPending instead. */
  getPendingUsers(
    request?: users.GetPendingRequest
  ): Promise<users.GetPendingResponse> {
    return this.users.getPending(request);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.send instead. */
  sendMagicLinkByEmail(
    data: magicLinks.SendByEmailRequest
  ): Promise<magicLinks.SendByEmailResponse> {
    return this.magicLinks.email.send(data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.loginOrCreate instead. */
  loginOrCreate(
    data: magicLinks.LoginOrCreateByEmailRequest
  ): Promise<magicLinks.LoginOrCreateByEmailResponse> {
    return this.magicLinks.email.loginOrCreate(data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.invite instead. */
  inviteByEmail(
    data: magicLinks.InviteByEmailRequest
  ): Promise<magicLinks.InviteByEmailResponse> {
    return this.magicLinks.email.invite(data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.revokeInvite instead. */
  revokePendingInvite(
    data: magicLinks.RevokePendingInviteByEmailRequest
  ): Promise<magicLinks.RevokePendingInviteByEmailResponse> {
    return this.magicLinks.email.revokeInvite(data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.authenticate instead. */
  authenticateMagicLink(
    token: string,
    data?: magicLinks.AuthenticateRequest
  ): Promise<magicLinks.AuthenticateResponse> {
    return this.magicLinks.authenticate(token, data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.sms.send instead. */
  sendOTPBySMS(
    data: otps.SendOTPBySMSRequest
  ): Promise<otps.SendOTPBySMSResponse> {
    return this.otps.sms.send(data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.sms.loginOrCreate instead. */
  loginOrCreateUserBySMS(
    data: otps.LoginOrCreateUserBySMSRequest
  ): Promise<otps.LoginOrCreateUserBySMSResponse> {
    return this.otps.sms.loginOrCreate(data);
  }

  /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.authenticate instead. */
  authenticateOTP(
    data: otps.AuthenticateRequest
  ): Promise<otps.AuthenticateResponse> {
    return this.otps.authenticate(data);
  }
}
