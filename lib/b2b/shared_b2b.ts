
export interface EmailFactor {
  delivery_method: 'email';
  type: string;
  last_authenticated_at: string;
  email_factor: {
    email_id: string;
    email_address: string;
  };
}
export type AuthenticationFactor = EmailFactor;
export interface MemberSession {
  member_session_id: string;
  member_id: string;
  organization_id: string;
  started_at: Date;
  last_accessed_at: Date;
  expires_at: Date;
  authentication_factors: AuthenticationFactor[];
  custom_claims?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface Member {
  organization_id: string;
  member_id: string;
  email_address: string;
  status: string;
  name: string;
  sso_registrations: SSORegistration[];
  trusted_metadata: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  untrusted_metadata: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface SSORegistration {
  connection_id: string;
  external_id: string;
  registration_id: string;
  sso_attributes: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ResultsMetadata {
  total: number;
  next_cursor: string;
}

export enum SearchOperator {
  OR = 'OR',
  AND = 'AND',
}
