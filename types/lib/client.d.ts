import Users from "./users";
import MagicLinks from "./magic_links";
import OTPs from "./otps";
interface Config {
    project_id: string;
    secret: string;
    env: "test" | "live";
    timeout?: number;
}
export default class Client {
    users: Users;
    magicLinks: MagicLinks;
    otps: OTPs;
    private client;
    constructor(config: Config);
}
export {};
