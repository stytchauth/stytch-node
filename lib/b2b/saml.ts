import { BaseResponse, request, fetchConfig } from "../shared";
import { SAMLConnection } from "./sso";

export interface B2BSAMLCreateConnectionRequest {
  organization_id: string;
  display_name?: string;
}

export interface B2BSAMLCreateConnectionResponse extends BaseResponse {
  connection: SAMLConnection;
}

export interface B2BSAMLUpdateConnectionRequest {
  organization_id: string;
  connection_id: string;
  idp_entity_id?: string;
  display_name?: string;
  attribute_mapping?: Record<string, string>;
  x509_certificate?: string;
  idp_sso_url?: string;
}

export interface B2BSAMLUpdateConnectionResponse extends BaseResponse {
  connection: SAMLConnection;
}

export interface B2BSAMLDeleteVerificationCertificateRequest {
  organization_id: string;
  connection_id: string;
  certificate_id: string;
}

export interface B2BSAMLDeleteVerificationCertificateResponse
  extends BaseResponse {
  certificate_id: string;
}

export class SAML {
  constructor(private readonly fetchConfig: fetchConfig) {}

  create({
    organization_id,
    ...data
  }: B2BSAMLCreateConnectionRequest): Promise<B2BSAMLCreateConnectionResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: `sso/saml/${organization_id}`,
      data,
    });
  }

  update({
    organization_id,
    connection_id,
    ...data
  }: B2BSAMLUpdateConnectionRequest): Promise<B2BSAMLUpdateConnectionResponse> {
    return request(this.fetchConfig, {
      method: "PUT",
      url: `sso/saml/${organization_id}/connections/${connection_id}`,
      data,
    });
  }

  deleteVerificationCertificate({
    organization_id,
    connection_id,
    certificate_id,
  }: B2BSAMLDeleteVerificationCertificateRequest): Promise<B2BSAMLDeleteVerificationCertificateResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: `sso/saml/${organization_id}/connections/${connection_id}/verification_certificates/${certificate_id}`,
    });
  }
}
