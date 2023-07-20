export interface MemberOptions {
    phone_number: string;
}
export interface MfaRequired {
    member_options?: MemberOptions;
    secondary_auth_initiated?: string;
}
