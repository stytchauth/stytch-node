import { Client } from "./b2c/client";
import { B2BClient } from "./b2b/client";
export { Client, B2BClient };
export * from "./b2c/index";
export * from "./b2b/index";
export * as envs from "./shared/envs";
export * from "./shared/errors";
declare const _default: {
    Client: typeof Client;
    B2BClient: typeof B2BClient;
};
export default _default;
