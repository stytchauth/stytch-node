import { fetchConfig } from "../shared";
import { V1 } from "./totps_v1";
export declare class TOTPs {
    private fetchConfig;
    v1: V1;
    constructor(fetchConfig: fetchConfig);
}
