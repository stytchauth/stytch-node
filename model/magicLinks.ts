import { Attributes } from './attributes';

export interface MagicLinkAuthenticate { 
    options?: MagicLinkAuthenticateOptions;
    attributes?: Attributes;
}

export interface MagicLinkAuthenticateOptions { 
    /**
     * Require that the ip address the magic link was requested from matches the ip address it's clicked from.
     */
    ipMatchRequired?: boolean;
    /**
     * Require that the user agent the magic link was requested from matches the user agent it's clicked from.
     */
    userAgentMatchRequired?: boolean;
}


export interface MagicLinkAuthenticateResponse { 
    requestId?: string;
    userId?: string;
}

export interface MagicLinkInviteByEmail { 
    /**
     * The email to invite the user by.
     */
    email: string;
    /**
     * The url the user clicks from the email magic link. This should be a url that your app receives and parses. Then you'll send a to authenticate the magic link and log in the user.
     */
    magicLinkUrl: string;
    /**
     * Set the expiration for the email magic link, in minutes. By default, it expires in 1 week. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    expirationMinutes?: number;
    attributes?: Attributes;
}

export interface MagicLinkInviteByEmailResponse { 
    requestId?: string;
    userId?: string;
    emailId?: string;
}

export interface MagicLinkLoginOrCreate { 
    /**
     * The email the user enters to login or sign up with.
     */
    email: string;
    /**
     * The url the user clicks from the login email magic link. This should be a url that your app receives and parses and subsequently send an api request to authenticate the magic link and log in the user.
     */
    loginMagicLinkUrl: string;
    /**
     * The url the user clicks from the sign up email magic link. This should be a url that your app receives and parses and subsequently send an api request to authenticate the magic link and sign up the user.
     */
    signupMagicLinkUrl: string;
    /**
     * Set the expiration for the login email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    loginExpirationMinutes?: number;
    /**
     * Set the expiration for the sign up email magic link, in minutes. By default, it expires in 1 week. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    signupExpirationMinutes?: number;
    attributes?: Attributes;
}

export interface MagicLinkLoginOrCreateResponse { 
    requestId?: string;
    userId?: string;
    emailId?: string;
    /**
     * Returns true if a new user was created, otherwise returns false
     */
    userCreated?: boolean;
}

export interface MagicLinkLoginOrInvite { 
    /**
     * The email to login or invite the user with.
     */
    email: string;
    /**
     * The url the user clicks from the login email magic link. This should be a url that your app receives and parses and subsequently send an api request to authenticate the magic link and log in the user.
     */
    loginMagicLinkUrl: string;
    /**
     * The url the user clicks from the invite email magic link. This should be a url that your app receives and parses and subsequently send an api request to authenticate the magic link and finish creating the user.
     */
    inviteMagicLinkUrl: string;
    /**
     * Set the expiration for the login email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    loginExpirationMinutes?: number;
    /**
     * Set the expiration for the invite email magic link, in minutes. By default, it expires in 1 week. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    inviteExpirationMinutes?: number;
    attributes?: Attributes;
}

export interface MagicLinkLoginOrInviteResponse { 
    requestId?: string;
    userId?: string;
    emailId?: string;
    /**
     * Returns true if a new user was created, otherwise returns false
     */
    userCreated?: boolean;
}

export interface MagicLinkRevokeInviteByEmail { 
    /**
     * The email to invite the user by.
     */
    email: string;
}

export interface MagicLinkRevokeInviteByEmailResponse { 
    requestId?: string;
}

export interface MagicLinkSend { 
    userId: string;
    /**
     * The method id for where to send the magic link, such as an email_id.
     */
    methodId: string;
    /**
     * The url the user clicks from the email magic link. This should be a url that your app receives and parses and subsequently send an api request to authenticate the magic link and log in the user.
     */
    magicLinkUrl: string;
    /**
     * Set the expiration for the email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    expirationMinutes: number;
    attributes?: Attributes;
}

export interface MagicLinkSendByEmail { 
    /**
     * The email the user enters to sign in with.
     */
    email: string;
    /**
     * The url the user clicks from the email magic link. This should be a url that your app receives and parses and subsequently send an api request to authenticate the magic link and log in the user.
     */
    magicLinkUrl: string;
    /**
     * Set the expiration for the email magic link, in minutes. By default, it expires in 1 hour. The minimum expiration is 5 minutes and the maximum is 7 days (10080 mins).
     */
    expirationMinutes: number;
    attributes?: Attributes;
}

export interface MagicLinkSendByEmailResponse { 
    requestId?: string;
    userId?: string;
}

export interface MagicLinkSendResponse { 
    requestId?: string;
    userId?: string;
}
