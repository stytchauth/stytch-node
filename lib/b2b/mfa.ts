export interface MemberOptions {
  mfa_phone_number: string;
}

export interface MfaRequired {
  member_options: MemberOptions;
  secondary_auth_initiated: "sms_otp" | null;
}
