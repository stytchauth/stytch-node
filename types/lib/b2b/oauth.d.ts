import { MemberSession, Member } from "./shared_b2b";
import { BaseResponse, fetchConfig } from "../shared";
import { DiscoveredOrganization, Organization } from "./organizations";
export interface B2BOAuthAuthenticateRequest {
    oauth_token: string;
    session_token?: string;
    session_jwt?: string;
    session_duration_minutes?: number;
    session_custom_claims?: Record<string, any>;
    pkce_code_verifier?: string;
}
export interface DiscoveryB2BOAuthAuthenticateRequest {
    discovery_oauth_token: string;
    pkce_code_verifier?: string;
}
export interface DiscoveryB2BOAuthAuthenticateResponse extends BaseResponse {
    intermediate_session_token: string;
    email_address: string;
    discovered_organizations: DiscoveredOrganization[];
}
export interface B2BOAuthAuthenticateResponse extends BaseResponse {
    member_id: string;
    member: Member;
    organization_id: string;
    organization: Organization;
    session_token?: string;
    session_jwt?: string;
    member_session?: MemberSession;
    provider_values: ProvidersValues;
}
export interface ProvidersValues {
    access_token?: string;
    refresh_token?: string;
    id_token?: string;
    expires_at?: number;
    scopes: string[];
}
declare class Discovery {
    private base_path;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(data: DiscoveryB2BOAuthAuthenticateRequest): Promise<DiscoveryB2BOAuthAuthenticateResponse>;
}
export declare class OAuth {
    private base_path;
    discovery: Discovery;
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    private endpoint;
    authenticate(data: B2BOAuthAuthenticateRequest): Promise<B2BOAuthAuthenticateResponse>;
}
export {};
