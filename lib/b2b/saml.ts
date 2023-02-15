import { BaseResponse, request, fetchConfig } from "../shared";
import { SAMLConnection } from "./sso";

export interface CreateSAMLConnectionRequest {
  organization_id: string;
  display_name?: string;
}

export interface CreateSAMLConnectionResponse extends BaseResponse {
  connection: SAMLConnection;
}

export interface UpdateSAMLConnectionRequest {
  organization_id: string;
  connection_id: string;
  idp_entity_id?: string;
  display_name?: string;
  attribute_mapping?: Record<string, string>;
  x509_certificate?: string;
  idp_sso_url?: string;
}

export interface UpdateSAMLConnectionResponse extends BaseResponse {
  connection: SAMLConnection;
}

export interface DeleteSAMLVerificationCertificateRequest {
  organization_id: string;
  connection_id: string;
  certificate_id: string;
}

export interface DeleteSAMLVerificationCertificateResponse
  extends BaseResponse {
  certificate_id: string;
}

export class SAML {
  constructor(private readonly fetchConfig: fetchConfig) {}

  create({
    organization_id,
    ...data
  }: CreateSAMLConnectionRequest): Promise<CreateSAMLConnectionResponse> {
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
  }: UpdateSAMLConnectionRequest): Promise<UpdateSAMLConnectionResponse> {
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
  }: DeleteSAMLVerificationCertificateRequest): Promise<DeleteSAMLVerificationCertificateResponse> {
    return request(this.fetchConfig, {
      method: "DELETE",
      url: `sso/saml/${organization_id}/connections/${connection_id}/verification_certificates/${certificate_id}`,
    });
  }
}
