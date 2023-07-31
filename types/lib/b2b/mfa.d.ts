export interface MemberOptions {
    mfa_phone_number: string;
}
export interface MfaRequired {
    member_options?: MemberOptions;
    /**
     * If null, indicates that no secondary authentication has been initiated. If equal to "sms_otp", indicates
     * that the Member has a phone number, and a one time passcode has been sent to the Member's phone number.
     * No secondary authentication will be initiated during calls to the discovery authenticate or list
     * organizations endpoints, even if the Member has a phone number.
     */
    secondary_auth_initiated?: string;
}
