"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Email {
    constructor(client, parent_path) {
        this.delivery = "email";
        this.client = client;
        this.base_path = `${parent_path}`;
    }
    endpoint(path) {
        return `${this.base_path}/${this.delivery}/${path}`;
    }
    send(request) {
        return this.client.post(this.endpoint("send"), { body: request });
    }
    loginOrCreate(request) {
        return this.client.post(this.endpoint("login_or_create"), {
            body: request,
        });
    }
    invite(request) {
        return this.client.post(this.endpoint("invite"), { body: request });
    }
    revokePendingInvite(request) {
        return this.client.post(this.endpoint("revoke_invite"), { body: request });
    }
}
class MagicLinks {
    constructor(client) {
        this.base_path = "magic_links";
        this.client = client;
        this.email = new Email(client, this.base_path);
    }
    endpoint(path) {
        return `${this.base_path}/${path}`;
    }
    authenticate(token, request) {
        return this.client.post(this.endpoint(`${token}/authenticate`), {
            body: request,
        });
    }
}
exports.default = MagicLinks;
