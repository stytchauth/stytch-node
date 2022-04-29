import { requestConfig } from "./shared";
export interface StytchErrorJSON {
    status_code: number;
    request_id: string;
    error_type: string;
    error_message: string;
    error_url: string;
}
export declare class StytchError extends Error {
    status_code: number;
    request_id: string;
    error_type: string;
    error_message: string;
    error_url: string;
    constructor(data: StytchErrorJSON);
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
