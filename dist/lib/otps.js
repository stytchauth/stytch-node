"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SMS {
    constructor(client, base_path) {
        this.delivery = "sms";
        this.client = client;
        this.base_path = base_path;
    }
    endpoint(path) {
        return `${this.base_path}/${this.delivery}/${path}`;
    }
    send(request) {
        return this.client.post(this.endpoint("send_by_sms"), { body: request });
    }
    loginOrCreate(request) {
        return this.client.post(this.endpoint("login_or_create"), {
            body: request,
        });
    }
}
class OTPs {
    constructor(client) {
        this.base_path = "otps";
        this.client = client;
        this.sms = new SMS(client, this.base_path);
    }
    endpoint(path) {
        return `${this.base_path}/${path}`;
    }
    authenticate(request) {
        return this.client.post(this.endpoint("authenticate"), { body: request });
    }
}
exports.default = OTPs;
