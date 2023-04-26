import { BaseResponse, fetchConfig } from "../shared";
import { OIDCConnection } from "./sso";
export interface B2BOIDCCreateConnectionRequest {
    organization_id: string;
    display_name?: string;
}
export interface B2BOIDCCreateConnectionResponse extends BaseResponse {
    connection: OIDCConnection;
}
export interface B2BOIDCUpdateConnectionRequest {
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
export interface B2BOIDCUpdateConnectionResponse extends BaseResponse {
    connection: OIDCConnection;
}
export declare class OIDC {
    private readonly fetchConfig;
    constructor(fetchConfig: fetchConfig);
    create({ organization_id, ...data }: B2BOIDCCreateConnectionRequest): Promise<B2BOIDCCreateConnectionResponse>;
    update({ organization_id, connection_id, ...data }: B2BOIDCUpdateConnectionRequest): Promise<B2BOIDCUpdateConnectionResponse>;
}
