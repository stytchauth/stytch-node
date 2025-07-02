import { Clients } from "./connected_apps_clients";
import { fetchConfig } from "../shared";
export interface ConnectedApp {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    full_access_allowed: boolean;
    client_type: string;
    redirect_urls: string[];
    access_token_expiry_minutes: number;
    access_token_template_content: string;
    post_logout_redirect_urls: string[];
    bypass_consent_for_offline_access: boolean;
    client_secret_last_four?: string;
    next_client_secret_last_four?: string;
    access_token_custom_audience?: string;
    logo_url?: string;
}
export interface ConnectedAppWithClientSecret {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    full_access_allowed: boolean;
    client_type: string;
    redirect_urls: string[];
    access_token_expiry_minutes: number;
    access_token_template_content: string;
    post_logout_redirect_urls: string[];
    bypass_consent_for_offline_access: boolean;
    client_secret_last_four?: string;
    next_client_secret_last_four?: string;
    client_secret?: string;
    access_token_custom_audience?: string;
    logo_url?: string;
}
export interface ConnectedAppWithNextClientSecret {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    client_secret_last_four: string;
    full_access_allowed: boolean;
    client_type: string;
    redirect_urls: string[];
    next_client_secret: string;
    access_token_expiry_minutes: number;
    access_token_template_content: string;
    post_logout_redirect_urls: string[];
    bypass_consent_for_offline_access: boolean;
    next_client_secret_last_four?: string;
    access_token_custom_audience?: string;
    logo_url?: string;
}
export interface ConnectedAppsResultsMetadata {
    total: number;
    next_cursor?: string;
}
export declare class ConnectedApp {
    private fetchConfig;
    clients: Clients;
    constructor(fetchConfig: fetchConfig);
}
