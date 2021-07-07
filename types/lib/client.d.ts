import { Users } from "./users";
import { MagicLinks } from "./magic_links";
import { OTPs } from "./otps";
interface Config {
    project_id: string;
    secret: string;
    env: string;
    timeout?: number;
}
export declare class Client {
    users: Users;
    magicLinks: MagicLinks;
    otps: OTPs;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */
    createUser: (request: import("./users").CreateRequest) => Promise<import("./users").CreateResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.get instead. */
    getUser: (userID: string) => Promise<import("./users").GetResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.update instead. */
    updateUser: (userID: string, request: import("./users").UpdateRequest) => Promise<import("./users").UpdateResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.delete instead. */
    deleteUser: (userID: string) => Promise<import("./users").DeleteResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deleteEmail instead. */
    deleteUserEmail: (emailID: string) => Promise<import("./users").DeleteEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deletePhoneNumber instead. */
    deleteUserPhoneNumber: (phoneID: string) => Promise<import("./users").DeletePhoneNumberResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.getPending instead. */
    getPendingUsers: (request?: import("./users").GetPendingRequest | undefined) => Promise<import("./users").GetPendingResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.send instead. */
    sendMagicLinkByEmail: (data: import("./magic_links").SendByEmailRequest) => Promise<import("./magic_links").SendByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.loginOrCreate instead. */
    loginOrCreate: (data: import("./magic_links").LoginOrCreateByEmailRequest) => Promise<import("./magic_links").LoginOrCreateByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.invite instead. */
    inviteByEmail: (data: import("./magic_links").InviteByEmailRequest) => Promise<import("./magic_links").InviteByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.revokeInvite instead. */
    revokePendingInvite: (data: import("./magic_links").RevokePendingInviteByEmailRequest) => Promise<import("./magic_links").RevokePendingInviteByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.authenticate instead. */
    authenticateMagicLink: (token: string, data?: import("./magic_links").AuthenticateRequest | undefined) => Promise<import("./magic_links").AuthenticateResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.sms.send instead. */
    sendOTPBySMS: (data: import("./otps").SendOTPBySMSRequest) => Promise<import("./otps").SendOTPBySMSResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.sms.loginOrCreate instead. */
    loginOrCreateUserBySMS: (data: import("./otps").LoginOrCreateUserBySMSRequest) => Promise<import("./otps").LoginOrCreateUserBySMSResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.otps.authenticate instead. */
    authenticateOTP: (data: import("./otps").AuthenticateRequest) => Promise<import("./otps").AuthenticateResponse>;
    private client;
    constructor(config: Config);
}
export {};
