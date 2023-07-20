// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import { Attributes } from "./attribute";
import { fetchConfig } from "../shared";
import { request } from "../shared";

export interface BiometricRegistration {
  // The unique ID for a biometric registration.
  biometric_registration_id: string;
  /**
   * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
   * has been successfully authenticated by the User.
   */
  verified: boolean;
}

export interface CryptoWallet {
  // The unique ID for a crypto wallet
  crypto_wallet_id: string;
  // The actual blockchain address of the User's crypto wallet.
  crypto_wallet_address: string;
  // The blockchain that the User's crypto wallet operates on, e.g. Ethereum, Solana, etc.
  crypto_wallet_type: string;
  /**
   * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
   * has been successfully authenticated by the User.
   */
  verified: boolean;
}

export interface Email {
  // The unique ID of a specific email address.
  email_id: string;
  // The email address.
  email: string;
  /**
   * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
   * has been successfully authenticated by the User.
   */
  verified: boolean;
}

export interface Name {
  // The first name of the user.
  first_name?: string;
  // The middle name(s) of the user.
  middle_name?: string;
  // The last name of the user.
  last_name?: string;
}

export interface OAuthProvider {
  /**
   * Denotes the OAuth identity provider that the user has authenticated with, e.g. Google, Facebook, GitHub
   * etc.
   */
  provider_type: string;
  /**
   * The unique identifier for the User within a given OAuth provider. Also commonly called the "sub" or
   * "Subject field" in OAuth protocols.
   */
  provider_subject: string;
  /**
   * If available, the `profile_picture_url` is a url of the User's profile picture set in OAuth identity the
   * provider that the User has authenticated with, e.g. Facebook profile picture.
   */
  profile_picture_url: string;
  /**
   * If available, the `locale` is the User's locale set in the OAuth identity provider that the user has
   * authenticated with.
   */
  locale: string;
  // The unique ID for an OAuth registration.
  oauth_user_registration_id: string;
}

export interface Password {
  // The unique ID of a specific password
  password_id: string;
  // Indicates whether this password requires a password reset
  requires_reset: boolean;
}

export interface PhoneNumber {
  // The unique ID for the phone number.
  phone_id: string;
  // The phone number.
  phone_number: string;
  /**
   * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
   * has been successfully authenticated by the User.
   */
  verified: boolean;
}

export interface SearchUsersQuery {
  /**
   * The action to perform on the operands. The accepted value are:
   *
   *   `AND` – all the operand values provided must match.
   *
   *   `OR` – the operator will return any matches to at least one of the operand values you supply.
   */
  operator: "OR" | "AND";
  /**
   * An array of operand objects that contains all of the filters and values to apply to your search search
   * query.
   */
  operands: SearchUsersQueryOperand[];
}

export interface TOTP {
  // The unique ID for a TOTP instance.
  totp_id: string;
  /**
   * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
   * has been successfully authenticated by the User.
   */
  verified: boolean;
}

export interface User {
  // The unique ID of the affected User.
  user_id: string;
  // An array of email objects for the User.
  emails: Email[];
  // The status of the User. The possible values are `pending` and `active`.
  status: string;
  // An array of phone number objects linked to the User.
  phone_numbers: PhoneNumber[];
  // An array that contains a list of all WebAuthn registrations for a given User in the Stytch API.
  webauthn_registrations: WebAuthnRegistration[];
  // An array of OAuth `provider` objects linked to the User.
  providers: OAuthProvider[];
  // An array containing a list of all TOTP instances for a given User in the Stytch API.
  totps: TOTP[];
  // An array contains a list of all crypto wallets for a given User in the Stytch API.
  crypto_wallets: CryptoWallet[];
  // An array that contains a list of all biometric registrations for a given User in the Stytch API.
  biometric_registrations: BiometricRegistration[];
  // The name of the User. Each field in the `name` object is optional.
  name?: Name;
  /**
   * The timestamp of the User's creation. Values conform to the RFC 3339 standard and are expressed in UTC,
   * e.g. `2021-12-29T12:33:09Z`.
   */
  created_at?: Date;
  // The password object is returned for users with a password.
  password?: Password;
  /**
   * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
   * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
   */
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
   * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
   * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
   * behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface UsersResultsMetadata {
  // The total number of results returned by your search query.
  total: number;
  /**
   * The `next_cursor` string is returned when your search result contains more than one page of results.
   * This value is passed into your next search call in the `cursor` field.
   */
  next_cursor?: string;
}

export interface WebAuthnRegistration {
  // The unique ID for the WebAuthn registration.
  webauthn_registration_id: string;
  // The `domain` on which a WebAuthn registration was started. This will be the domain of your app.
  domain: string;
  // The user agent of the User.
  user_agent: string;
  /**
   * The verified boolean denotes whether or not this send method, e.g. phone number, email address, etc.,
   * has been successfully authenticated by the User.
   */
  verified: boolean;
  /**
   * The `authenticator_type` string displays the requested authenticator type of the WebAuthn device. The
   * two valid types are "platform" and "cross-platform". If no value is present, the WebAuthn device was
   * created without an authenticator type preference.
   */
  authenticator_type: string;
}

// Request type for `Users.create`.
export interface UsersCreateRequest {
  // The email address of the end user.
  email?: string;
  // The name of the user. Each field in the name object is optional.
  name?: Name;
  // Provided attributes help with fraud detection.
  attributes?: Attributes;
  /**
   * The phone number to use for one-time passcodes. The phone number should be in E.164 format. The phone
   * number should be in E.164 format (i.e. +1XXXXXXXXXX). You may use +10000000000 to test this endpoint,
   * see [Testing](https://stytch.com/docs/home#resources_testing) for more detail.
   */
  phone_number?: string;
  /**
   * Flag for whether or not to save a user as pending vs active in Stytch. Defaults to false.
   *         If true, users will be saved with status pending in Stytch's backend until authenticated.
   *         If false, users will be created as active. An example usage of
   *         a true flag would be to require users to verify their phone by entering the OTP code before
   * creating
   *         an account for them.
   */
  create_user_as_pending?: boolean;
  /**
   * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
   * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
   */
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
   * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
   * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
   * behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Response type for `Users.create`.
export interface UsersCreateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  // The unique ID of a specific email address.
  email_id: string;
  // The status of the User. The possible values are `pending` and `active`.
  status: string;
  // The unique ID for the phone number.
  phone_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deleteBiometricRegistration`.
export interface UsersDeleteBiometricRegistrationRequest {
  // The `biometric_registration_id` to be deleted.
  biometric_registration_id: string;
}

// Response type for `Users.deleteBiometricRegistration`.
export interface UsersDeleteBiometricRegistrationResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deleteCryptoWallet`.
export interface UsersDeleteCryptoWalletRequest {
  // The `crypto_wallet_id` to be deleted.
  crypto_wallet_id: string;
}

// Response type for `Users.deleteCryptoWallet`.
export interface UsersDeleteCryptoWalletResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deleteEmail`.
export interface UsersDeleteEmailRequest {
  // The `email_id` to be deleted.
  email_id: string;
}

// Response type for `Users.deleteEmail`.
export interface UsersDeleteEmailResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deleteOAuthRegistration`.
export interface UsersDeleteOAuthRegistrationRequest {
  // The `oauth_user_registration_id` to be deleted.
  oauth_user_registration_id: string;
}

// Response type for `Users.deleteOAuthRegistration`.
export interface UsersDeleteOAuthRegistrationResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deletePassword`.
export interface UsersDeletePasswordRequest {
  // The `password_id` to be deleted.
  password_id: string;
}

// Response type for `Users.deletePassword`.
export interface UsersDeletePasswordResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deletePhoneNumber`.
export interface UsersDeletePhoneNumberRequest {
  // The `phone_id` to be deleted.
  phone_id: string;
}

// Response type for `Users.deletePhoneNumber`.
export interface UsersDeletePhoneNumberResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.delete`.
export interface UsersDeleteRequest {
  // The unique ID of a specific User.
  user_id: string;
}

// Response type for `Users.delete`.
export interface UsersDeleteResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the deleted User.
  user_id: string;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deleteTOTP`.
export interface UsersDeleteTOTPRequest {
  // The `totp_id` to be deleted.
  totp_id: string;
}

// Response type for `Users.deleteTOTP`.
export interface UsersDeleteTOTPResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.deleteWebAuthnRegistration`.
export interface UsersDeleteWebAuthnRegistrationRequest {
  // The `webauthn_registration_id` to be deleted.
  webauthn_registration_id: string;
}

// Response type for `Users.deleteWebAuthnRegistration`.
export interface UsersDeleteWebAuthnRegistrationResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the affected User.
  user_id: string;
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.get`.
export interface UsersGetRequest {
  // The unique ID of a specific User.
  user_id: string;
}

// Response type for `Users.get`.
export interface UsersGetResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the returned User.
  user_id: string;
  // An array of email objects for the User.
  emails: Email[];
  // The status of the User. The possible values are `pending` and `active`.
  status: string;
  // An array of phone number objects linked to the User.
  phone_numbers: PhoneNumber[];
  // An array that contains a list of all WebAuthn registrations for a given User in the Stytch API.
  webauthn_registrations: WebAuthnRegistration[];
  // An array of OAuth `provider` objects linked to the User.
  providers: OAuthProvider[];
  // An array containing a list of all TOTP instances for a given User in the Stytch API.
  totps: TOTP[];
  // An array contains a list of all crypto wallets for a given User in the Stytch API.
  crypto_wallets: CryptoWallet[];
  // An array that contains a list of all biometric registrations for a given User in the Stytch API.
  biometric_registrations: BiometricRegistration[];
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
  // The name of the User. Each field in the `name` object is optional.
  name?: Name;
  /**
   * The timestamp of the User's creation. Values conform to the RFC 3339 standard and are expressed in UTC,
   * e.g. `2021-12-29T12:33:09Z`.
   */
  created_at?: Date;
  // The password object is returned for users with a password.
  password?: Password;
  /**
   * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
   * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
   */
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
   * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
   * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
   * behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Request type for `Users.search`.
export interface UsersSearchRequest {
  /**
   * The `cursor` field allows you to paginate through your results. Each result array is limited to 1000
   * results. If your query returns more than 1000 results, you will need to paginate the responses using the
   * `cursor`. If you receive a response that includes a non-null `next_cursor` in the `results_metadata`
   * object, repeat the search call with the `next_cursor` value set to the `cursor` field to retrieve the
   * next page of results. Continue to make search calls until the `next_cursor` in the response is null.
   */
  cursor?: string;
  /**
   * The number of search results to return per page. The default limit is 100. A maximum of 1000 results can
   * be returned by a single search request. If the total size of your result set is greater than one page
   * size, you must paginate the response. See the `cursor` field.
   */
  limit?: number;
  /**
   * The optional query object contains the operator, i.e. `AND` or `OR`, and the operands that will filter
   * your results. Only an operator is required. If you include no operands, no filtering will be applied. If
   * you include no query object, it will return all results with no filtering applied.
   */
  query?: SearchUsersQuery;
}

// Response type for `Users.search`.
export interface UsersSearchResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // An array of results that match your search query.
  results: User[];
  /**
   * The search `results_metadata` object contains metadata relevant to your specific query like total and
   * `next_cursor`.
   */
  results_metadata: UsersResultsMetadata;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// Request type for `Users.update`.
export interface UsersUpdateRequest {
  // The unique ID of a specific User.
  user_id: string;
  // The name of the user. Each field in the name object is optional.
  name?: Name;
  // Provided attributes help with fraud detection.
  attributes?: Attributes;
  /**
   * The `trusted_metadata` field contains an arbitrary JSON object of application-specific data. See the
   * [Metadata](https://stytch.com/docs/api/metadata) reference for complete field behavior details.
   */
  trusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The `untrusted_metadata` field contains an arbitrary JSON object of application-specific data. Untrusted
   * metadata can be edited by end users directly via the SDK, and **cannot be used to store critical
   * information.** See the [Metadata](https://stytch.com/docs/api/metadata) reference for complete field
   * behavior details.
   */
  untrusted_metadata?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// Response type for `Users.update`.
export interface UsersUpdateResponse {
  /**
   * Globally unique UUID that is returned with every API call. This value is important to log for debugging
   * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
   */
  request_id: string;
  // The unique ID of the updated User.
  user_id: string;
  // An array of email objects for the User.
  emails: Email[];
  // An array of phone number objects linked to the User.
  phone_numbers: PhoneNumber[];
  // An array contains a list of all crypto wallets for a given User in the Stytch API.
  crypto_wallets: CryptoWallet[];
  /**
   * The `user` object affected by this API call. See the
   * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
   */
  user: User;
  /**
   * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
   * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
   */
  status_code: number;
}

// MANUAL(SearchUsersQueryOperand)(TYPES)
export type SearchUsersQueryOperand =
  | {
      filter_name: "created_at_greater_than";
      // Timestamp in RFC 3339 Format
      filter_value: string;
    }
  | {
      filter_name: "created_at_less_than";
      // Timestamp in RFC 3339 Format
      filter_value: string;
    }
  | {
      filter_name: "created_at_between";
      filter_value: {
        // Timestamp in RFC 3339 Format
        greater_than: string;
        // Timestamp in RFC 3339 Format
        less_than: string;
      };
    }
  | {
      filter_name: "status";
      filter_value: "active" | "pending";
    }
  | {
      filter_name: "oauth_provider";
      filter_value: string[];
    }
  | {
      filter_name: "user_id";
      filter_value: string[];
    }
  | {
      filter_name: "full_name_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "phone_number";
      filter_value: string[];
    }
  | {
      filter_name: "phone_id";
      filter_value: string[];
    }
  | {
      filter_name: "phone_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "phone_number_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "email_address";
      filter_value: string[];
    }
  | {
      filter_name: "email_id";
      filter_value: string[];
    }
  | {
      filter_name: "email_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "email_address_fuzzy";
      filter_value: string;
    }
  | {
      filter_name: "webauthn_registration_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "webauthn_registration_id";
      filter_value: string[];
    }
  | {
      filter_name: "crypto_wallet_id";
      filter_value: string[];
    }
  | {
      filter_name: "crypto_wallet_address";
      filter_value: string[];
    }
  | {
      filter_name: "crypto_wallet_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "totp_id";
      filter_value: string[];
    }
  | {
      filter_name: "totp_verified";
      filter_value: boolean;
    }
  | {
      filter_name: "password_exists";
      filter_value: boolean;
    }
  | {
      filter_name: string;
      [key: string]: unknown;
    };
// ENDMANUAL(SearchUsersQueryOperand)

// MANUAL(UserSearchIterator)(FREE_FUNCTION)
enum mode {
  pending,
  inProgress,
  complete,
}

export class UserSearchIterator {
  private mode: mode;

  constructor(private client: Users, private data: UsersSearchRequest) {
    this.mode = mode.pending;
  }

  async next(): Promise<User[]> {
    const res = await this.client.search(this.data);
    this.data = {
      ...this.data,
      cursor: res.results_metadata.next_cursor,
    };
    if (!this.data.cursor) {
      this.mode = mode.complete;
    } else {
      this.mode = mode.inProgress;
    }
    return res.results;
  }

  hasNext(): boolean {
    return this.mode !== mode.complete;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<User[]> {
    while (this.hasNext()) {
      yield this.next();
    }
  }
}
// ENDMANUAL(UserSearchIterator)

export class Users {
  private fetchConfig: fetchConfig;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * Add a User to Stytch. A `user_id` is returned in the response that can then be used to perform other
   * operations within Stytch. An `email` or a `phone_number` is required.
   */
  create(data: UsersCreateRequest): Promise<UsersCreateResponse> {
    return request<UsersCreateResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/users`,
      data,
    });
  }

  // Get information about a specific User.
  get(params: UsersGetRequest): Promise<UsersGetResponse> {
    return request<UsersGetResponse>(this.fetchConfig, {
      method: "GET",
      url: `/v1/users/${params.user_id}`,
      params: {},
    });
  }

  // Search for Users within your Stytch Project. Submit an empty `query` in the request to return all Users.
  search(data: UsersSearchRequest): Promise<UsersSearchResponse> {
    return request<UsersSearchResponse>(this.fetchConfig, {
      method: "POST",
      url: `/v1/users/search`,
      data,
    });
  }

  /**
   * Update a User's attributes.
   *
   * **Note:** In order to add a new email address or phone number to an existing User object, pass the new
   * email address or phone number into the respective `/send` endpoint for the authentication method of your
   * choice. If you specify the existing User's `user_id` while calling the `/send` endpoint, the new email
   * address or phone number will be added to the existing User object upon successful authentication. We
   * require this process to guard against an account takeover vulnerability.
   */
  update(data: UsersUpdateRequest): Promise<UsersUpdateResponse> {
    return request<UsersUpdateResponse>(this.fetchConfig, {
      method: "PUT",
      url: `/v1/users/${data.user_id}`,
      data: {
        name: data.name,
        attributes: data.attributes,
        trusted_metadata: data.trusted_metadata,
        untrusted_metadata: data.untrusted_metadata,
      },
    });
  }

  // Delete a User from Stytch.
  delete(data: UsersDeleteRequest): Promise<UsersDeleteResponse> {
    return request<UsersDeleteResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/${data.user_id}`,
      data: {},
    });
  }

  // Delete an email from a User.
  deleteEmail(
    data: UsersDeleteEmailRequest
  ): Promise<UsersDeleteEmailResponse> {
    return request<UsersDeleteEmailResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/emails/${data.email_id}`,
      data: {},
    });
  }

  // Delete a phone number from a User.
  deletePhoneNumber(
    data: UsersDeletePhoneNumberRequest
  ): Promise<UsersDeletePhoneNumberResponse> {
    return request<UsersDeletePhoneNumberResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/phone_numbers/${data.phone_id}`,
      data: {},
    });
  }

  // Delete a WebAuthn registration from a User.
  deleteWebAuthnRegistration(
    data: UsersDeleteWebAuthnRegistrationRequest
  ): Promise<UsersDeleteWebAuthnRegistrationResponse> {
    return request<UsersDeleteWebAuthnRegistrationResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/webauthn_registrations/${data.webauthn_registration_id}`,
      data: {},
    });
  }

  // Delete a biometric registration from a User.
  deleteBiometricRegistration(
    data: UsersDeleteBiometricRegistrationRequest
  ): Promise<UsersDeleteBiometricRegistrationResponse> {
    return request<UsersDeleteBiometricRegistrationResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/biometric_registrations/${data.biometric_registration_id}`,
      data: {},
    });
  }

  // Delete a TOTP from a User.
  deleteTOTP(data: UsersDeleteTOTPRequest): Promise<UsersDeleteTOTPResponse> {
    return request<UsersDeleteTOTPResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/totps/${data.totp_id}`,
      data: {},
    });
  }

  // Delete a crypto wallet from a User.
  deleteCryptoWallet(
    data: UsersDeleteCryptoWalletRequest
  ): Promise<UsersDeleteCryptoWalletResponse> {
    return request<UsersDeleteCryptoWalletResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/crypto_wallets/${data.crypto_wallet_id}`,
      data: {},
    });
  }

  // Delete a password from a User.
  deletePassword(
    data: UsersDeletePasswordRequest
  ): Promise<UsersDeletePasswordResponse> {
    return request<UsersDeletePasswordResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/passwords/${data.password_id}`,
      data: {},
    });
  }

  // Delete an OAuth registration from a User.
  deleteOAuthRegistration(
    data: UsersDeleteOAuthRegistrationRequest
  ): Promise<UsersDeleteOAuthRegistrationResponse> {
    return request<UsersDeleteOAuthRegistrationResponse>(this.fetchConfig, {
      method: "DELETE",
      url: `/v1/users/oauth/${data.oauth_user_registration_id}`,
      data: {},
    });
  }

  // MANUAL(searchAll)(SERVICE_METHOD)
  // Return an iterator over all search results.  Submit an empty `query` in the request to return all Users.
  searchAll(data: UsersSearchRequest): UserSearchIterator {
    return new UserSearchIterator(this, data);
  }
  // ENDMANUAL(searchAll)
}
