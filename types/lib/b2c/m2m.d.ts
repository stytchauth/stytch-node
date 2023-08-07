import { Clients } from "./m2m_clients";
import { fetchConfig } from "../shared";
import { JwtConfig } from "../shared/sessions";
export interface M2MClient {
    client_id: string;
    client_name: string;
    client_description: string;
    status: string;
    scopes: string[];
    client_secret_last_four: string;
    trusted_metadata?: Record<string, any>;
    next_client_secret_last_four?: string;
}
export interface M2MClientWithClientSecret {
    client_id: string;
    /**
     * The secret of the client. **Important:** this is the only time you will be able to view the
     * `client_secret`. Be sure to persist the `client_secret` in a secure location. If the `client_secret` is
     * lost, you will need to trigger a secret rotation flow to receive another one.
     */
    client_secret: string;
    client_name: string;
    client_description: string;
    status: string;
    scopes: string[];
    client_secret_last_four: string;
    trusted_metadata?: Record<string, any>;
    next_client_secret_last_four?: string;
}
export interface M2MClientWithNextClientSecret {
    client_id: string;
    /**
     * The newly created secret that's next in rotation for the client. **Important:** this is the only time
     * you will be able to view the `next_client_secret`. Be sure to persist the `next_client_secret` in a
     * secure location. If the `next_client_secret` is lost, you will need to trigger a secret rotation flow to
     * receive another one.
     */
    next_client_secret: string;
    client_name: string;
    client_description: string;
    status: string;
    scopes: string[];
    client_secret_last_four: string;
    trusted_metadata?: Record<string, any>;
    next_client_secret_last_four?: string;
}
export interface M2MResultsMetadata {
    total: number;
    /**
     * The `next_cursor` string is returned when your search result contains more than one page of results.
     * This value is passed into your next search call in the `cursor` field.
     */
    next_cursor?: string;
}
export interface M2MSearchQuery {
    /**
     * The action to perform on the operands. The accepted value are:
     *
     *   `AND` – all the operand values provided must match.
     *
     *   `OR` – the operator will return any matches to at least one of the operand values you supply.
     */
    operator: "OR" | "AND" | string;
    /**
     * An array of operand objects that contains all of the filters and values to apply to your search search
     * query.
     */
    operands: M2MSearchQueryOperand[];
}
export declare type M2MSearchQueryOperand = {
    filter_name: "client_id";
    filter_value: string[];
} | {
    filter_name: "client_name";
    filter_value: string[];
} | {
    filter_name: "scopes";
    filter_value: string[];
};
export declare class M2M {
    private fetchConfig;
    private jwksClient;
    private jwtOptions;
    clients: Clients;
    constructor(fetchConfig: fetchConfig, jwtConfig: JwtConfig);
    authenticateToken(): void;
}
