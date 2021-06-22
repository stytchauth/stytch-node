export = Client;
declare function Client(config: any, ...args: any[]): void;
declare class Client {
    constructor(config: any, ...args: any[]);
    project_id: any;
    secret: any;
    env: any;
    _authenticatedRequest(request: any, method: any, cb: any): any;
    createUser(request: any, cb: any): any;
    getUser(user_id: any, cb: any): any;
    updateUser(user_id: any, request: any, cb: any): any;
    deleteUser(user_id: any, cb: any): any;
    getPendingUsers(request: any, cb: any): any;
    deleteUserEmail(email_id: any, cb: any): any;
    deleteUserPhoneNumber(phone_id: any, cb: any): any;
    sendMagicLinkByEmail(request: any, cb: any): any;
    loginOrCreate(request: any, cb: any): any;
    inviteByEmail(request: any, cb: any): any;
    authenticateMagicLink(token: any, request: any, cb: any): any;
    revokePendingInvite(request: any, cb: any): any;
    sendOTPBySMS(request: any, cb: any): any;
    loginOrCreateUserBySMS(request: any, cb: any): any;
    authenticateOTP(request: any, cb: any): any;
}
