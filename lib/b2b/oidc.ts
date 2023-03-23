import { BaseResponse, request, fetchConfig } from "../shared";
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
  display_name: string;
  client_id: string;
  client_secret: string;
  issuer: string;
  authorization_url: string;
  token_url: string;
  user_info_url: string;
  jwks_url: string;
}

export interface UpdateOIDCConnectionResponse extends BaseResponse {
  connection: OIDCConnection;
}

export class OIDC {
  constructor(private readonly fetchConfig: fetchConfig) {}

  create({
    organization_id,
    ...data
  }: CreateOIDCConnectionRequest): Promise<CreateOIDCConnectionResponse> {
    return request(this.fetchConfig, {
      method: "POST",
      url: `sso/oidc/${organization_id}`,
      data,
    });
  }

  update({
    organization_id,
    connection_id,
    ...data
  }: UpdateOIDCConnectionRequest): Promise<UpdateOIDCConnectionResponse> {
    return request(this.fetchConfig, {
      method: "PUT",
      url: `sso/oidc/${organization_id}/connections/${connection_id}`,
      data,
    });
  }
}
