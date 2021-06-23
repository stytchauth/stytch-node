import Users from "./users";
import MagicLinks from "./magic_links";
interface Config {
    project_id: string;
    secret: string;
    env: "test" | "live";
    timeout?: number;
}
export declare class Client {
    users: Users;
    magicLinks: MagicLinks;
    private client;
    constructor(config: Config);
}
export {};
