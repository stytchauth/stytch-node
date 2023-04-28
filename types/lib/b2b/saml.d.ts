import { BaseResponse, fetchConfig } from "../shared";
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
export interface B2BSAMLDeleteVerificationCertificateResponse extends BaseResponse {
    certificate_id: string;
}
export declare class SAML {
    private readonly fetchConfig;
    constructor(fetchConfig: fetchConfig);
    create({ organization_id, ...data }: B2BSAMLCreateConnectionRequest): Promise<B2BSAMLCreateConnectionResponse>;
    update({ organization_id, connection_id, ...data }: B2BSAMLUpdateConnectionRequest): Promise<B2BSAMLUpdateConnectionResponse>;
    deleteVerificationCertificate({ organization_id, connection_id, certificate_id, }: B2BSAMLDeleteVerificationCertificateRequest): Promise<B2BSAMLDeleteVerificationCertificateResponse>;
}
