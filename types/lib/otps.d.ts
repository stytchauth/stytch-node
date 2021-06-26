import type { AxiosInstance } from "axios";
import type { Attributes, BaseResponse } from "./shared";
interface SendOTPBySMSRequest {
    phone_number: string;
    expiration_minutes?: bigint;
    attributes?: Attributes;
}
interface SendOTPBySMSResponse extends BaseResponse {
    user_id: string;
    phone_id: string;
}
interface LoginOrCreateUserBySMSRequest {
    phone_number: string;
    expiration_minutes?: bigint;
    attributes?: Attributes;
    create_user_as_pending?: boolean;
}
interface LoginOrCreateUserBySMSResponse extends BaseResponse {
    user_id: string;
    phone_id: string;
    user_created: boolean;
}
interface AuthenticateRequest {
    method_id: string;
    code: string;
    attributes?: Attributes;
    options?: {
        ip_match_required?: boolean;
        user_agent_match_required?: boolean;
    };
}
interface AuthenticateResponse extends BaseResponse {
    user_id: string;
    method_id: string;
}
declare class SMS {
    base_path: string;
    delivery: string;
    private client;
    constructor(client: AxiosInstance, base_path: string);
    private endpoint;
    send(data: SendOTPBySMSRequest): Promise<SendOTPBySMSResponse>;
    loginOrCreate(data: LoginOrCreateUserBySMSRequest): Promise<LoginOrCreateUserBySMSResponse>;
}
export default class OTPs {
    base_path: string;
    sms: SMS;
    private client;
    constructor(client: AxiosInstance);
    private endpoint;
    authenticate(data: AuthenticateRequest): Promise<AuthenticateResponse>;
}
export {};
