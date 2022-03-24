import type { AxiosRequestConfig } from "axios";
export declare class StytchError extends Error {
    status_code: number;
    request_id: string;
    error_type: string;
    error_message: string;
    error_url: string;
    constructor(data: {
        status_code: number;
        request_id: string;
        error_type: string;
        error_message: string;
        error_url: string;
    });
}
export declare class RequestError extends Error {
    request: AxiosRequestConfig;
    constructor(message: string, request: AxiosRequestConfig);
}
export declare class ClientError extends Error {
    code: string;
    cause: unknown;
    constructor(code: string, message: string, cause?: unknown);
}
