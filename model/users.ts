import { Attributes } from './attributes';

export interface UserCreate { 
    /**
     * The email to use for email magic links. This can be changed later via the update endpoint.
     */
    email: string;
    name?: UserCreateName;
    attributes?: Attributes;
}

export interface UserCreateName { 
    /**
     * The first name of the user.
     */
    firstName?: string;
    /**
     * The middle name(s) of the user.
     */
    middleName?: string;
    /**
     * The last name of the user.
     */
    lastName?: string;
}

export interface UserCreateResponse { 
    requestId?: string;
    userId?: string;
    /**
     * The id for the created email.
     */
    emailId?: string;
    status?: string;
}

export interface UserDeleteEmailResponse { 
    requestId?: string;
    userId?: string;
    emailId?: string;
}

export interface UserDeleteResponse { 
    requestId?: string;
    userId?: string;
}

export interface UserGetInvitedResponse { 
    requestId?: string;
    users?: Array<UserGetInvitedResponseUsers>;
}

export interface UserGetInvitedResponseUsers { 
    userId?: string;
    name?: UserGetResponseName;
    emails?: Array<UserUpdateResponseEmails>;
    status?: string;
    invitedAt?: string;
}

export interface UserGetResponse { 
    requestId?: string;
    userId?: string;
    name?: UserGetResponseName;
    emails?: Array<UserUpdateResponseEmails>;
    status?: string;
}

export interface UserGetResponseName { 
    firstName?: string;
    middleName?: string;
    lastName?: string;
}

export interface UserUpdate { 
    name?: UserUpdateName;
    /**
     * Multiple emails can exist for one user. Add additional emails via this endpoint. To delete an email, use the delete endpoint.
     */
    emails?: Array<UserUpdateEmails>;
    attributes?: Attributes;
}

export interface UserUpdateEmails { 
    /**
     * An email for the user.
     */
    email?: string;
}

export interface UserUpdateName { 
    /**
     * The first name of the user. Replaces an existing first name, if it exists.
     */
    firstName?: string;
    /**
     * The middle name(s) of the user. Replaces an existing middle name, if it exists.
     */
    middleName?: string;
    /**
     * The last name of the user. Replaces an existing last name, if it exists.
     */
    lastName?: string;
}

export interface UserUpdateResponse { 
    requestId?: string;
    userId?: string;
    emails?: Array<UserUpdateResponseEmails>;
}

export interface UserUpdateResponseEmails { 
    emailId?: string;
    email?: string;
    verified?: boolean;
}
