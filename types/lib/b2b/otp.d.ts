import { Email } from "./otp_email";
import { fetchConfig } from "../shared";
import { Sms } from "./otp_sms";
export declare class OTPs {
    private fetchConfig;
    sms: Sms;
    email: Email;
    constructor(fetchConfig: fetchConfig);
}
