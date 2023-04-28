export type {
  User,
  Name,
  Email,
  Password,
  PhoneNumber,
  OAuthProvider,
  WebAuthnRegistration,
  BiometricRegistration,
  TOTP,
  CryptoWallet,
  Session,
  B2CAuthenticationFactor,
  Attributes,
} from "./shared_b2c";

export type {
  B2CCryptoWalletsAuthenticateStartRequest,
  B2CCryptoWalletsAuthenticateStartResponse,
  B2CCryptoWalletsAuthenticateRequest,
  B2CCryptoWalletsAuthenticateResponse,
} from "./crypto_wallets";

export type {
  B2CMagicLinksRevokePendingInviteByEmailRequest,
  B2CMagicLinksRevokePendingInviteByEmailResponse,
  B2CMagicLinksAuthenticateRequest,
  B2CMagicLinksAuthenticateResponse,
  B2CMagicLinksInviteByEmailResponse,
  B2CMagicLinksInviteByEmailRequest,
  B2CMagicLinksSendByEmailRequest,
  B2CMagicLinksSendByEmailResponse,
  B2CMagicLinksLoginOrCreateByEmailRequest,
  B2CMagicLinksLoginOrCreateByEmailResponse,
  B2CMagicLinksCreateRequest,
  B2CMagicLinksCreateResponse,
} from "./magic_links";

export type {
  B2COAuthAuthenticateRequest,
  B2COAuthAuthenticateResponse,
  B2COAuthAttachRequest,
  B2COAuthAttachResponse,
} from "./oauth";

export type {
  B2COTPsAuthenticateRequest,
  B2COTPsAuthenticateResponse,
  B2COTPsSMSSendRequest,
  B2COTPsSMSSendResponse,
  B2COTPsSMSLoginOrCreateRequest,
  B2COTPsSMSLoginOrCreateResponse,
  B2COTPsEmailSendRequest,
  B2COTPsEmailSendResponse,
  B2COTPsEmailLoginOrCreateRequest,
  B2COTPsEmailLoginOrCreateResponse,
  B2COTPsWhatsAppSendRequest,
  B2COTPsWhatsAppSendResponse,
  B2COTPsWhatsAppLoginOrCreateRequest,
  B2COTPsWhatsAppLoginOrCreateResponse,
} from "./otps";

export type {
  B2CPasswordsAuthenticateRequest,
  B2CPasswordsAuthenticateResponse,
  B2CPasswordsCreateRequest,
  B2CPasswordsCreateResponse,
  B2CPasswordsResetByEmailRequest,
  B2CPasswordsResetByEmailResponse,
  B2CPasswordsResetByEmailStartRequest,
  B2CPasswordsResetByEmailStartResponse,
  B2CPasswordsResetByExistingPasswordRequest,
  B2CPasswordsResetByExistingPasswordResponse,
  B2CPasswordsMigrateRequest,
  B2CPasswordsMigrateResponse,
  B2CPasswordsResetBySessionRequest,
  B2CPasswordsResetBySessionResponse,
  B2CPasswordsStrengthCheckRequest,
  B2CPasswordsStrengthCheckResponse,
} from "./passwords";

export type {
  B2CSessionsAuthenticateRequest,
  B2CSessionsAuthenticateResponse,
  B2CSessionsRevokeRequest,
  B2CSessionsRevokeResponse,
  B2CSessionsGetRequest,
  B2CSessionsGetResponse,
  B2CSessionsJwksResponse,
} from "./sessions";

export type {
  B2CTOTPsAuthenticateRequest,
  B2CTOTPsAuthenticateResponse,
  B2CTOTPsCreateRequest,
  B2CTOTPsCreateResponse,
  B2CTOTPsRecoverRequest,
  B2CTOTPsRecoverResponse,
  B2CTOTPsRecoveryCodesRequest,
  B2CTOTPsRecoveryCodesResponse,
} from "./totps";

export type {
  B2CUsersCreateRequest,
  B2CUsersCreateResponse,
  B2CUsersSearchRequest,
  B2CUsersSearchResponse,
  B2CUsersGetResponse,
  B2CUsersUpdateRequest,
  B2CUsersUpdateResponse,
  B2CUsersGetPendingRequest,
  B2CUsersGetPendingResponse,
  B2CUsersDeleteCryptoWalletResponse,
  B2CUsersDeleteTOTPResponse,
  B2CUsersDeleteWebAuthnRegistrationResponse,
  B2CUsersDeletePhoneNumberResponse,
  B2CUsersDeleteEmailResponse,
  B2CUsersDeleteBiometricRegistrationResponse,
  B2CUsersDeleteOAuthUserRegistrationResponse,
  B2CUsersDeletePasswordResponse,
  B2CUsersDeleteResponse,
} from "./users";

export type {
  B2CWebAuthnRegisterStartRequest,
  B2CWebAuthnRegisterStartResponse,
  B2CWebAuthnRegisterRequest,
  B2CWebAuthnRegisterResponse,
  B2CWebAuthnAuthenticateStartRequest,
  B2CWebAuthnAuthenticateStartResponse,
  B2CWebAuthnAuthenticateRequest,
  B2CWebAuthnAuthenticateResponse,
} from "./webauthn";
