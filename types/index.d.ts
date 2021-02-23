declare module 'stytch' {
    type Callback<T extends Object> = (err: Error, response: T) => void;

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
    interface Attributes {
        ip_address?: string;
        user_agent?: string;
    }

    interface Name {
        first_name?: string;
        middle_name?: string;
        last_name?: string;
    }

    interface Email {
        email_id: string;
        email: string;
        verified: boolean;
    }

    interface InvitedUser {
        user_id: string;
        name: Name;
        emails: Email[];
        status: string;
        invited_at: string;
    }

    // USERS
    interface CreateUserRequest {
        email: string;
        name?: Name;
        attributes?: Attributes;
    }

    interface CreateUserResponse extends BaseResponse {
        user_id: string;
        email_id: string;
        status: string;
    }

    interface GetUserResponse extends BaseResponse {
        user_id: string;
        name: Name;
        emails: Email[];
        status: string;
    }

    interface UpdateUserRequest {
        name?: Name;
        emails?: string[];
        attributes?: Attributes;
    }

    interface UpdateUserResponse extends BaseResponse {
        user_id: string;
        emails: Email[];
    }

    interface DeleteUserResponse extends BaseResponse {
        user_id: string;
    }

    interface GetInvitedUsersRequest {
        starting_after_id?: string;
        limit?: bigint;
    }

    interface GetInvitedUsersResponse extends BaseResponse {
        users: InvitedUser[];
        has_more: boolean;
        starting_after_id: string;
        total: bigint;
    }

    interface DeleteUserEmailResponse extends BaseResponse {
        user_id: string;
        email: string;
    }

    // MAGIC LINKS
    interface SendMagicLinkRequest {
        user_id: string;
        method_id: string;
        magic_link_url: string;
        expiration_minutes: bigint;
        attributes?: Attributes;
    }

    interface SendMagicLinkResponse extends BaseResponse {
        user_id: string;
    }

    interface SendMagicLinkByEmailRequest {
        email: string;
        magic_link_url: string;
        expiration_minutes: bigint;
        attributes?: Attributes;
    }

    interface SendMagicLinkByEmailResponse extends BaseResponse {
        user_id: string;
    }

    interface LoginOrCreateRequest {
        email: string;
        login_magic_link_url: string;
        signup_magic_link_url: string;
        login_expiration_minutes?: bigint;
        signup_expiration_minutes?: bigint;
        attributes?: Attributes;
    }

    interface LoginOrCreateResponse extends BaseResponse {
        user_id: string;
    }

    interface InviteByEmailRequest {
        email: string;
        magic_link_url: string;
        expiration_minutes?: bigint;
        attributes?: Attributes;
    }

    interface InviteByEmailResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    interface AuthenticateMagicLinkRequest {
        options?: {
            ip_match_required?: boolean;
            user_agent_match_required?: boolean;
        };
        attributes?: Attributes;
    }

    interface AuthenticateMagicLinkResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    interface RevokePendingInviteRequest {
        email: string;
    }

    interface RevokePendingInviteResponse extends BaseResponse {}

    class Client {
        constructor(config: Config);

        // USERS
        createUser(
            request: CreateUserRequest
        ): Promise<CreateUserResponse>;
        createUser(
            request: CreateUserRequest,
            cb: Callback<CreateUserResponse>,
        ): void;

        getUser(
            user_id: string
        ): Promise<GetUserResponse>;
        getUser(
            user_id: string,
            cb: Callback<GetUserResponse>,
        ): void;

        updateUser(
            user_id: string,
            request: UpdateUserRequest
        ): Promise<UpdateUserResponse>;
        updateUser(
            user_id: string,
            request: UpdateUserRequest,
            cb: Callback<UpdateUserResponse>,
        ): void;

        deleteUser(
            user_id: string
        ): Promise<DeleteUserResponse>;
        deleteUser(
            user_id: string,
            cb: Callback<DeleteUserResponse>,
        ): void;

        getInvitedUsers(
            request?: GetInvitedUsersRequest,
        ): Promise<GetInvitedUsersResponse>;
        getInvitedUsers(
            request: GetInvitedUsersRequest,
            cb: Callback<GetInvitedUsersResponse>,
        ): void;
        getInvitedUsers(
            cb: Callback<GetInvitedUsersResponse>,
        ): void;

        deleteUserEmail(
            user_id: string,
            email: string
        ): Promise<DeleteUserEmailResponse>;
        deleteUserEmail(
            user_id: string,
            email: string,
            cb: Callback<DeleteUserEmailResponse>,
        ): void;

        // MAGIC LINKS
        sendMagicLink(
            request: SendMagicLinkRequest
        ): Promise<SendMagicLinkResponse>;
        sendMagicLink(
            request: SendMagicLinkRequest,
            cb: Callback<SendMagicLinkResponse>,
        ): void;

        sendMagicLinkByEmail(
            request: SendMagicLinkByEmailRequest
        ): Promise<SendMagicLinkByEmailResponse>;
        sendMagicLinkByEmail(
            request: SendMagicLinkByEmailRequest,
            cb: Callback<SendMagicLinkByEmailResponse>,
        ): void;

        loginOrCreate(
            request: LoginOrCreateRequest
        ): Promise<LoginOrCreateResponse>;
        loginOrCreate(
            request: LoginOrCreateRequest,
            cb: Callback<LoginOrCreateResponse>,
        ): void;

        inviteByEmail(
            request: InviteByEmailRequest
        ): Promise<InviteByEmailResponse>;
        inviteByEmail(
            request: InviteByEmailRequest,
            cb: Callback<InviteByEmailResponse>,
        ): void;

        authenticateMagicLink(
            token: string,
            request?: AuthenticateMagicLinkRequest,
        ): Promise<AuthenticateMagicLinkResponse>;
        authenticateMagicLink(
            token: string,
            cb: Callback<AuthenticateMagicLinkResponse>,
        ): void;
        authenticateMagicLink(
            token: string,
            request: AuthenticateMagicLinkRequest,
            cb: Callback<AuthenticateMagicLinkResponse>,
        ): void;

        revokePendingInvite(
            request: RevokePendingInviteRequest
        ): Promise<RevokePendingInviteResponse>;
        revokePendingInvite(
            request: RevokePendingInviteRequest,
            cb: Callback<RevokePendingInviteResponse>,
        ): void;
    }
}
