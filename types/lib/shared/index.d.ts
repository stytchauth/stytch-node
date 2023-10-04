import type { Dispatcher } from "undici";
export interface fetchConfig {
    baseURL: string;
    headers: Record<string, string>;
    timeout: number;
    dispatcher?: Dispatcher;
}
export declare type requestConfig = {
    url: string;
    method: "GET" | "DELETE" | "POST" | "PUT";
    params?: Record<string, string | number>;
    data?: unknown;
    dataRaw?: BodyInit;
};
export declare function request<T>(fetchConfig: fetchConfig, requestConfig: requestConfig): Promise<T>;
