import type { Dispatcher, BodyInit } from "undici";
export interface fetchConfig {
    baseURL: string;
    fraudBaseURL: string;
    headers: Record<string, string>;
    timeout: number;
    dispatcher?: Dispatcher;
}
export type requestConfig = {
    url: string;
    method: "GET" | "DELETE" | "POST" | "PUT";
    params?: Record<string, string | number | boolean | undefined>;
    data?: unknown;
    dataRaw?: BodyInit;
    headers?: Record<string, string>;
    baseURLType?: "AUTH" | "FRAUD";
};
export declare function request<T>(fetchConfig: fetchConfig, requestConfig: requestConfig): Promise<T>;
