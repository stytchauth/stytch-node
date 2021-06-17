declare module 'stytch' {
    type Callback<T extends Object> = (err: Error, response: T) => void;

    interface Config {
        project_id: string;
        secret: string;
        env: string;
    }

    export class StytchError extends Error {
        status_code: bigint;
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

    interface PhoneNumber {
        phone_id: string;
        phone_number: string;
        verified: boolean;
    }

    interface PendingUser {
        user_id: string;
        name: Name;
        emails: Email[];
        phone_numbers: PhoneNumber[];
        status: string;
        invited_at: string;
    }

    // USERS
    interface CreateUserRequest {
        email?: string;
        phone_number?: string;
        name?: Name;
        create_user_as_pending?: boolean;
        attributes?: Attributes;
    }

    interface CreateUserResponse extends BaseResponse {
        user_id: string;
        email_id: string;
        phone_id: string;
        status: string;
    }

    interface GetUserResponse extends BaseResponse {
        user_id: string;
        name: Name;
        emails: Email[];
        phone_numbers: PhoneNumber[];
        status: string;
    }

    interface UpdateUserRequest {
        name?: Name;
        emails?: string[];
        phone_numbers?: string[];
        attributes?: Attributes;
    }

    interface UpdateUserResponse extends BaseResponse {
        user_id: string;
        emails: Email[];
        phone_numbers: PhoneNumber[];
    }

    interface DeleteUserResponse extends BaseResponse {
        user_id: string;
    }

    interface GetPendingUsersRequest {
        starting_after_id?: string;
        limit?: bigint;
    }

    interface GetPendingUsersResponse extends BaseResponse {
        users: PendingUser[];
        has_more: boolean;
        starting_after_id: string;
        total: bigint;
    }

    interface DeleteUserEmailResponse extends BaseResponse {
        user_id: string;
    }

    interface DeleteUserPhoneNumberResponse extends BaseResponse {
        user_id: string;
    }

    // MAGIC LINKS
    interface MagicLinksEmailSendRequest {
        email: string;
        login_magic_link_url: string;
        signup_magic_link_url: string;
        login_expiration_minutes?: bigint;
        signup_expiration_minutes?: bigint;
        attributes?: Attributes;
    }

    interface MagicLinksEmailSendResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    interface MagicLinksEmailLoginOrCreateRequest {
        email: string;
        login_magic_link_url: string;
        signup_magic_link_url: string;
        login_expiration_minutes?: bigint;
        signup_expiration_minutes?: bigint;
        create_user_as_pending?: boolean;
        attributes?: Attributes;
    }

    interface MagicLinksEmailLoginOrCreateResponse extends BaseResponse {
        user_id: string;
        email_id: string;
        user_created: boolean;
    }

    interface MagicLinksEmailInviteRequest {
        email: string;
        invite_magic_link_url: string;
        invite_expiration_minutes?: bigint;
        name?: Name;
        attributes?: Attributes;
    }

    interface MagicLinksEmailInviteResponse extends BaseResponse {
        user_id: string;
        email_id: string;
    }

    interface MagicLinksAuthenticateRequest {
        token: string;
        options?: {
            ip_match_required?: boolean;
            user_agent_match_required?: boolean;
        };
        attributes?: Attributes;
    }

    interface MagicLinksAuthenticateResponse extends BaseResponse {
        user_id: string;
        method_id: string;
    }

    interface MagicLinksEmailRevokeInviteRequest {
        email: string;
    }

    interface MagicLinksEmailRevokeInviteResponse extends BaseResponse {}

    // OTP
    interface OTPsSMSSendRequest {
        phone_number: string;
        expiration_minutes?: bigint;
        attributes?: Attributes;
    }

    interface OTPsSMSSendResponse extends BaseResponse {
        user_id: string;
        phone_id: string;
    }

    interface OTPsSMSLoginOrCreateRequest {
        phone_number: string;
        expiration_minutes?: bigint;
        attributes?: Attributes;
        create_user_as_pending?: boolean;
    }

    interface OTPsSMSLoginOrCreateResponse extends BaseResponse {
        user_id: string;
        phone_id: string;
        user_created: boolean;
    }

    interface OTPsAuthenticateRequest {
        method_id: string;
        code: string;
        attributes?: Attributes;
        options?: {
            ip_match_required?: boolean;
            user_agent_match_required?: boolean;
        };
    }

    interface OTPsAuthenticateResponse extends BaseResponse {
        user_id: string;
        method_id: string;
    }

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

        getPendingUsers(
            request?: GetPendingUsersRequest,
        ): Promise<GetPendingUsersResponse>;
        getPendingUsers(
            request: GetPendingUsersRequest,
            cb: Callback<GetPendingUsersResponse>,
        ): void;
        getPendingUsers(
            cb: Callback<GetPendingUsersResponse>,
        ): void;

        deleteUserEmail(
            email_id: string
        ): Promise<DeleteUserEmailResponse>;
        deleteUserEmail(
            email_id: string,
            cb: Callback<DeleteUserEmailResponse>,
        ): void;

        deleteUserPhoneNumber(
            phone_id: string
        ): Promise<DeleteUserPhoneNumberResponse>;
        deleteUserPhoneNumber(
            phone_id: string,
            cb: Callback<DeleteUserPhoneNumberResponse>
        ): void;

        magicLinksEmailSend(
            request: MagicLinksEmailSendRequest
        ): Promise<MagicLinksEmailSendResponse>;
        magicLinksEmailSend(
            request: MagicLinksEmailSendRequest,
            cb: Callback<MagicLinksEmailSendResponse>,
        ): void;

        magicLinksEmailLoginOrCreate(
            request: MagicLinksEmailLoginOrCreateRequest
        ): Promise<MagicLinksEmailLoginOrCreateResponse>;
        magicLinksEmailLoginOrCreate(
            request: MagicLinksEmailLoginOrCreateRequest,
            cb: Callback<MagicLinksEmailLoginOrCreateResponse>,
        ): void;

        magicLinksEmailInvite(
            request: MagicLinksEmailInviteRequest
        ): Promise<MagicLinksEmailInviteResponse>;
        magicLinksEmailInvite(
            request: MagicLinksEmailInviteRequest,
            cb: Callback<MagicLinksEmailInviteResponse>,
        ): void;

        magicLinksAuthenticate(
          request: MagicLinksAuthenticateRequest
        ): Promise<MagicLinksAuthenticateResponse>;
        magicLinksAuthenticate(
          request: MagicLinksAuthenticateRequest,
          cb: Callback<MagicLinksAuthenticateResponse>,
        ): void;

        magicLinksEmailRevokeInvite(
            request: MagicLinksEmailRevokeInviteRequest
        ): Promise<MagicLinksEmailRevokeInviteResponse>;
        magicLinksEmailRevokeInvite(
            request: MagicLinksEmailRevokeInviteRequest,
            cb: Callback<MagicLinksEmailRevokeInviteResponse>,
        ): void;

        // OTP
        OTPsSMSSend(
            request: OTPsSMSSendRequest
        ): Promise<OTPsSMSSendResponse>;
        OTPsSMSSend(
            request: OTPsSMSSendRequest,
            cb: Callback<OTPsSMSSendResponse>
        ): void;

        OTPsSMSLoginOrCreate(
            request: OTPsSMSLoginOrCreateRequest
        ): Promise<OTPsSMSLoginOrCreateResponse>;
        OTPsSMSLoginOrCreate(
            request: OTPsSMSLoginOrCreateRequest,
            cb: Callback<OTPsSMSLoginOrCreateResponse>
        ): void;

        OTPsAuthenticate(
            request: OTPsAuthenticateRequest
        ): Promise<OTPsAuthenticateResponse>;
        OTPsAuthenticate(
            request: OTPsAuthenticateRequest,
            cb: Callback<OTPsAuthenticateResponse>
        ): void;
    }
}
