import { fetchConfig } from "../shared";
import { Sms } from "./otp_sms";
export declare class OTPs {
    private fetchConfig;
    sms: Sms;
    constructor(fetchConfig: fetchConfig);
}
