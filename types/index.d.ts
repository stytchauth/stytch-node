declare module 'stytch' {
    type Callback<T extends Object> = (err: Error, response: T) => void;

    // fundamental types
    interface Config {
        project_id: string;
        secret: string;
        env: string;
    }

    export class StytchError extends Error {
        status_code: string;
        request_id?: string;
        error_message?: string;
        error_type?: string;
        error_url?: string;
    }

    interface BaseResponse {
        status_code: bigint;
        request_id: string;
    }

    // shared types
    interface attributes {
        ip_address?: string;
        user_agent?: string;
    }

    interface name {
        first_name?: string;
        middle_name?: string;
        last_name?: string;
    }

    interface email {
        email_id: string;
        email: string;
        verified: boolean;
    }

    interface invitedUser {
        user_id: string;
        name: name;
        emails: Array<email>;
        status: string;
        invited_at: string;
    }

    // USERS
    interface createUserRequest {
        email: string;
        name?: name;
        attributes?: attributes;
    }

    interface createUserResponse extends BaseResponse {
        user_id: string;
        email_id: string;
        status: string;
    }

    interface getUserResponse extends BaseResponse {
        user_id: string;
        name: name;
        emails: Array<email>;
        status: string;
    }

    interface updateUserRequest {
        name?: name;
        emails?: Array<string>;
        attributes?: attributes;
    }

    interface updateUserResponse extends BaseResponse {
        user_id: string;
        emails: Array<email>;
    }

    interface deleteUserResponse extends BaseResponse {
        user_id: string;
    }

    interface getInvitedUsersResponse extends BaseResponse {
        users: Array<invitedUser>;
    }

    interface deleteUserEmailResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    // MAGIC LINKS
    interface sendMagicLinkRequest {
        user_id: string;
        method_id: string;
        magic_link_url: string;
        expiration_minutes: bigint;
        attributes?: attributes;
    }

    interface sendMagicLinkResponse extends BaseResponse {
        user_id: string;
    }

    interface sendMagicLinkByEmailRequest {
        email: string;
        magic_link_url: string;
        expiration_minutes: bigint;
        attributes?: attributes;
    }

    interface sendMagicLinkByEmailResponse extends BaseResponse {
        user_id: string;
    }

    interface loginOrCreateRequest {
        email: string;
        login_magic_link_url: string;
        signup_magic_link_url: string;
        login_expiration_minutes?: bigint;
        signup_expiration_minutes?: bigint;
        attributes?: attributes;
    }

    interface loginOrCreateResponse extends BaseResponse {
        user_id: string;
    }

    interface loginOrInviteRequest {
        email: string;
        login_magic_link_url: string;
        invite_magic_link_url: string;
        login_expiration_minutes?: bigint;
        invite_expiration_minutes?: bigint;
        attributes?: attributes;
    }

    interface loginOrInviteResponse extends BaseResponse {
        user_id: string;
        email_id: string;
        user_created: boolean;
    }

    interface inviteByEmailRequest {
        email: string;
        magic_link_url: string;
        expiration_minutes?: bigint;
        attributes?: attributes;
    }

    interface inviteByEmailResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    interface authenticateMagicLinkRequest {
        options: {
            ip_match_required: boolean;
            user_agent_match_required: boolean;
        };
    }

    interface authenticateMagicLinkResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    interface revokePendingInviteRequest {
        email: string;
    }

    interface revokePendingInviteResponse extends BaseResponse {}

    class Client {
        constructor(config: Config);

        // USERS
        createUser(
            request: createUserRequest
        ): Promise<createUserResponse>;
        createUser(
            request: createUserRequest,
            cb: Callback<createUserResponse>,
        ): void;

        getUser(
            user_id: string
        ): Promise<getUserResponse>;
        getUser(
            user_id: string,
            cb: Callback<getUserResponse>,
        ): void;

        updateUser(
            request: updateUserRequest
        ): Promise<updateUserResponse>;
        updateUser(
            request: updateUserRequest,
            cb: Callback<updateUserResponse>,
        ): void;

        deleteUser(
            user_id: string
        ): Promise<deleteUserResponse>;
        deleteUser(
            user_id: string,
            cb: Callback<deleteUserResponse>,
        ): void;

        getInvitedUsers(
        ): Promise<getInvitedUsersResponse>;
        getInvitedUsers(
            cb: Callback<getInvitedUsersResponse>,
        ): void;

        deleteUserEmail(
            user_id: string,
            email_id: string
        ): Promise<deleteUserEmailResponse>;
        deleteUserEmail(
            user_id: string,
            email_id: string,
            cb: Callback<deleteUserEmailResponse>,
        ): void;

        // MAGIC LINKS
        sendMagicLink(
            request: sendMagicLinkRequest
        ): Promise<sendMagicLinkResponse>;
        sendMagicLink(
            request: sendMagicLinkRequest,
            cb: Callback<sendMagicLinkResponse>,
        ): void;

        sendMagicLinkByEmail(
            request: sendMagicLinkByEmailRequest
        ): Promise<sendMagicLinkByEmailResponse>;
        sendMagicLinkByEmail(
            request: sendMagicLinkByEmailRequest,
            cb: Callback<sendMagicLinkByEmailResponse>,
        ): void;

        loginOrCreate(
            request: loginOrCreateRequest
        ): Promise<loginOrCreateResponse>;
        loginOrCreate(
            request: loginOrCreateRequest,
            cb: Callback<loginOrCreateResponse>,
        ): void;

        loginOrInvite(
            request: loginOrInviteRequest
        ): Promise<loginOrInviteResponse>;
        loginOrInvite(
            request: loginOrInviteRequest,
            cb: Callback<loginOrInviteResponse>,
        ): void;

        inviteByEmail(
            request: inviteByEmailRequest
        ): Promise<inviteByEmailResponse>;
        inviteByEmail(
            request: inviteByEmailRequest,
            cb: Callback<inviteByEmailResponse>,
        ): void;

        authenticateMagicLink(
            token: string,
            request: authenticateMagicLinkRequest,
        ): Promise<authenticateMagicLinkResponse>;
        authenticateMagicLink(
            token: string,
            request: authenticateMagicLinkRequest,
            cb: Callback<authenticateMagicLinkResponse>,
        ): void;

        revokePendingInvite(
            request: revokePendingInviteRequest
        ): Promise<revokePendingInviteResponse>;
        revokePendingInvite(
            request: revokePendingInviteRequest,
            cb: Callback<revokePendingInviteResponse>,
        ): void;
    }
}