import type { AxiosInstance, AxiosRequestConfig } from "axios";
export interface Attributes {
    ip_address?: string;
    user_agent?: string;
}
export interface Name {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
}
export interface Email {
    email_id: string;
    email: string;
    verified: boolean;
}
export interface PhoneNumber {
    phone_id: string;
    phone_number: string;
    verified: boolean;
}
export interface Session {
    session_id: string;
    user_id: string;
    started_at: string;
    last_accessed_at: string;
    expires_at: string;
    attributes: Attributes;
}
export interface BaseResponse {
    status_code: bigint;
    request_id: string;
}
export declare function request<T>(client: AxiosInstance, config: AxiosRequestConfig): Promise<T>;
