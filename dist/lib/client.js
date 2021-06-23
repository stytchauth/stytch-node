"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = require("axios");
const package_json_1 = require("../package.json");
const users_1 = require("./users");
const magic_links_1 = require("./magic_links");
const DEFAULT_TIMEOUT = 10 * 60 * 1000; // Ten minutes
function baseURL(env) {
    return {
        test: "https://test.stytch.com/v1/",
        live: "https://api.stytch.com/v1/",
    }[env];
}
class Client {
    constructor(config) {
        if (typeof config != "object") {
            throw new Error("Unexpected config type. " +
                "Refer to https://github.com/stytchauth/stytch-node " +
                "for how to use the Node client library.");
        }
        if (!config.project_id) {
            throw new Error('Missing "project_id" in config');
        }
        if (!config.secret) {
            throw new Error('Missing "secret" in config');
        }
        if (!config.env) {
            throw new Error('Missing "env" in config');
        }
        if (config.env != "test" && config.env != "live") {
            throw new Error(`Expected env to be "test" or "live", got "${config.env}"`);
        }
        this.client = axios_1.default.create({
            baseURL: baseURL(config.env),
            timeout: config.timeout || DEFAULT_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "User-Agent": `Stytch Node v${package_json_1.version}`,
            },
            auth: {
                username: config.project_id,
                password: config.secret,
            },
        });
        this.users = new users_1.default(this.client);
        this.magicLinks = new magic_links_1.default(this.client);
    }
}
exports.Client = Client;
module.exports = Client;
