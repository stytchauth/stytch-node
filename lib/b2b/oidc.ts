import { BaseResponse, request, fetchConfig } from "../shared";
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

export class OIDC {
  constructor(private readonly fetchConfig: fetchConfig) {}

  create({
    organization_id,
    ...data
  }: B2BOIDCCreateConnectionRequest): Promise<B2BOIDCCreateConnectionResponse> {
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
  }: B2BOIDCUpdateConnectionRequest): Promise<B2BOIDCUpdateConnectionResponse> {
    return request(this.fetchConfig, {
      method: "PUT",
      url: `sso/oidc/${organization_id}/connections/${connection_id}`,
      data,
    });
  }
}
