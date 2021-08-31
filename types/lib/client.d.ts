import { Users } from "./users";
import { MagicLinks } from "./magic_links";
import { OTPs } from "./otps";
import { Sessions } from "./sessions";
import { Experiments } from "./experiments";
import type * as users from "./users";
import type * as magicLinks from "./magic_links";
import type * as otps from "./otps";
export interface Config {
    project_id: string;
    secret: string;
    env: string;
    timeout?: number;
    experiments?: Partial<Experiments>;
}
export declare class Client {
    users: Users;
    magicLinks: MagicLinks;
    otps: OTPs;
    sessions: Sessions;
    private client;
    private experiments;
    constructor(config: Config);
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.create instead. */
    createUser(request: users.CreateRequest): Promise<users.CreateResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.get instead. */
    getUser(userID: users.UserID): Promise<users.GetResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.update instead. */
    updateUser(userID: users.UserID, request: users.UpdateRequest): Promise<users.UpdateResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.delete instead. */
    deleteUser(userID: users.UserID): Promise<users.DeleteResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deleteEmail instead. */
    deleteUserEmail(emailID: string): Promise<users.DeleteEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.deletePhoneNumber instead. */
    deleteUserPhoneNumber(phoneID: string): Promise<users.DeletePhoneNumberResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use users.getPending instead. */
    getPendingUsers(request?: users.GetPendingRequest): Promise<users.GetPendingResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.send instead. */
    sendMagicLinkByEmail(data: magicLinks.SendByEmailRequest): Promise<magicLinks.SendByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.loginOrCreate instead. */
    loginOrCreate(data: magicLinks.LoginOrCreateByEmailRequest): Promise<magicLinks.LoginOrCreateByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.invite instead. */
    inviteByEmail(data: magicLinks.InviteByEmailRequest): Promise<magicLinks.InviteByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.email.revokeInvite instead. */
    revokePendingInvite(data: magicLinks.RevokePendingInviteByEmailRequest): Promise<magicLinks.RevokePendingInviteByEmailResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use magicLinks.authenticate instead. */
    authenticateMagicLink(token: string, data?: magicLinks.AuthenticateRequest): Promise<magicLinks.AuthenticateResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.sms.send instead. */
    sendOTPBySMS(data: otps.SendOTPBySMSRequest): Promise<otps.SendOTPBySMSResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.sms.loginOrCreate instead. */
    loginOrCreateUserBySMS(data: otps.LoginOrCreateUserBySMSRequest): Promise<otps.LoginOrCreateUserBySMSResponse>;
    /** @deprecated since version 3.0. Will be deleted in version 4.0.  Use otps.authenticate instead. */
    authenticateOTP(data: otps.AuthenticateRequest): Promise<otps.AuthenticateResponse>;
}
