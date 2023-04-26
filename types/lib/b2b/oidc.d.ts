import { BaseResponse, fetchConfig } from "../shared";
import { OIDCConnection } from "./sso";
export interface CreateOIDCConnectionRequest {
    organization_id: string;
    display_name?: string;
}
export interface CreateOIDCConnectionResponse extends BaseResponse {
    connection: OIDCConnection;
}
export interface UpdateOIDCConnectionRequest {
    organization_id: string;
    connection_id: string;
    display_name?: string;
    client_id?: string;
    client_secret?: string;
    issuer?: string;
    authorization_url?: string;
    token_url?: string;
    userinfo_url?: string;
    jwks_url?: string;
}
export interface UpdateOIDCConnectionResponse extends BaseResponse {
    connection: OIDCConnection;
}
export declare class OIDC {
    private readonly fetchConfig;
    constructor(fetchConfig: fetchConfig);
    create({ organization_id, ...data }: CreateOIDCConnectionRequest): Promise<CreateOIDCConnectionResponse>;
    update({ organization_id, connection_id, ...data }: UpdateOIDCConnectionRequest): Promise<UpdateOIDCConnectionResponse>;
}
