// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { Email } from "./otp_email";
import { fetchConfig } from "../shared";
import { Sms } from "./otp_sms";

export class OTPs {
  private fetchConfig: fetchConfig;
  sms: Sms;
  email: Email;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.sms = new Sms(this.fetchConfig);
    this.email = new Email(this.fetchConfig);
  }
}
