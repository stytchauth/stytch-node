import { Clients } from "./connected_apps_clients";
import { fetchConfig } from "../shared";
export interface ConnectedApp {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    /**
     * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
     * exchanged for a full Stytch session.
     */
    full_access_allowed: boolean;
    /**
     * The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and
     * `third_party_public`.
     */
    client_type: string;
    redirect_urls: string[];
    access_token_expiry_minutes: number;
    access_token_template_content: string;
    post_logout_redirect_urls: string[];
    /**
     * Valid for first party clients only. If true, the client does not need to request explicit user consent
     * for the `offline_access` scope.
     */
    bypass_consent_for_offline_access: boolean;
    creation_method: string;
    client_secret_last_four?: string;
    next_client_secret_last_four?: string;
    access_token_custom_audience?: string;
    logo_url?: string;
    client_id_metadata_url?: string;
}
export interface ConnectedAppPublic {
    client_id: string;
    client_name: string;
    client_description: string;
    client_type: string;
    logo_url?: string;
}
export interface ConnectedAppWithClientSecret {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    /**
     * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
     * exchanged for a full Stytch session.
     */
    full_access_allowed: boolean;
    /**
     * The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and
     * `third_party_public`.
     */
    client_type: string;
    redirect_urls: string[];
    access_token_expiry_minutes: number;
    access_token_template_content: string;
    post_logout_redirect_urls: string[];
    /**
     * Valid for first party clients only. If true, the client does not need to request explicit user consent
     * for the `offline_access` scope.
     */
    bypass_consent_for_offline_access: boolean;
    client_secret_last_four?: string;
    next_client_secret_last_four?: string;
    client_secret?: string;
    access_token_custom_audience?: string;
    logo_url?: string;
    client_id_metadata_url?: string;
}
export interface ConnectedAppWithNextClientSecret {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    client_secret_last_four: string;
    /**
     * Valid for first party clients only. If `true`, an authorization token granted to this Client can be
     * exchanged for a full Stytch session.
     */
    full_access_allowed: boolean;
    /**
     * The type of Connected App. Supported values are `first_party`, `first_party_public`, `third_party`, and
     * `third_party_public`.
     */
    client_type: string;
    redirect_urls: string[];
    next_client_secret: string;
    access_token_expiry_minutes: number;
    access_token_template_content: string;
    post_logout_redirect_urls: string[];
    /**
     * Valid for first party clients only. If true, the client does not need to request explicit user consent
     * for the `offline_access` scope.
     */
    bypass_consent_for_offline_access: boolean;
    next_client_secret_last_four?: string;
    access_token_custom_audience?: string;
    logo_url?: string;
    client_id_metadata_url?: string;
}
export interface ConnectedAppsResultsMetadata {
    /**
     * The total number of results returned by your search query. If totals have been disabled for your Stytch
     * Workspace to improve search performance, the value will always be -1.
     */
    total: number;
    /**
     * The `next_cursor` string is returned when your search result contains more than one page of results.
     * This value is passed into your next search call in the `cursor` field.
     */
    next_cursor?: string;
}
export declare class ConnectedApp {
    private fetchConfig;
    clients: Clients;
    constructor(fetchConfig: fetchConfig);
}
