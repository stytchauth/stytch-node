import { requestConfig } from "./";
export interface StytchErrorJSON {
    status_code: number;
    request_id: string;
    error_type: string;
    error_message: string;
    error_url: string;
    error_details: Map<string, string> | undefined;
}
export interface OAuth2ErrorJSON {
    status_code: number;
    request_id: string;
    error: string;
    error_description: string;
    error_uri: string;
}
export declare class StytchError extends Error {
    status_code: number;
    request_id: string;
    error_type: string;
    error_message: string;
    error_url: string;
    error_details: Map<string, string> | undefined;
    constructor(data: StytchErrorJSON | OAuth2ErrorJSON);
}
export declare class RequestError extends Error {
    request: requestConfig;
    constructor(message: string, request: requestConfig);
}
export declare class ClientError extends Error {
    code: string;
    cause: unknown;
    constructor(code: string, message: string, cause?: unknown);
}
