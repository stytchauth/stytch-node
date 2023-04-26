import { BaseResponse, fetchConfig } from "../shared";
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
export interface DeleteSAMLVerificationCertificateResponse extends BaseResponse {
    certificate_id: string;
}
export declare class SAML {
    private readonly fetchConfig;
    constructor(fetchConfig: fetchConfig);
    create({ organization_id, ...data }: CreateSAMLConnectionRequest): Promise<CreateSAMLConnectionResponse>;
    update({ organization_id, connection_id, ...data }: UpdateSAMLConnectionRequest): Promise<UpdateSAMLConnectionResponse>;
    deleteVerificationCertificate({ organization_id, connection_id, certificate_id, }: DeleteSAMLVerificationCertificateRequest): Promise<DeleteSAMLVerificationCertificateResponse>;
}
