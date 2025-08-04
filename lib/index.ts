import { B2BClient } from "./b2b/client";
import { Client } from "./b2c/client";
import { SamlShieldClient } from "./samlshield/index";

export * from "./b2b/index";
export * from "./b2c/index";
export * from "./samlshield/index";
export * as envs from "./shared/envs";
export * from "./shared/errors";
export { B2BClient, Client, SamlShieldClient };
export default { Client, B2BClient, SamlShieldClient };
