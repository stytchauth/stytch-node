// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

import {} from "../shared/method_options";
import { fetchConfig } from "../shared";
import { V1 } from "./totps_v1";

export class TOTPs {
  private fetchConfig: fetchConfig;
  v1: V1;

  constructor(fetchConfig: fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.v1 = new V1(this.fetchConfig);
  }
}
