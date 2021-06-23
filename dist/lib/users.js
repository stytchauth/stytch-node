"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    constructor(client) {
        this.base_path = "users";
        this.client = client;
    }
    endpoint(path) {
        return `${this.base_path}/${path}`;
    }
    create(request) {
        return this.client.post("users", { body: request });
    }
    get(userID) {
        return this.client.get(this.endpoint(userID));
    }
    update(userID, request) {
        return this.client.put(this.endpoint(userID), { body: request });
    }
    delete(userID) {
        return this.client.delete(this.endpoint(userID));
    }
    getPending(request) {
        const params = request || {};
        return this.client.get(this.endpoint("pending"), { params });
    }
    deleteEmail(emailID) {
        return this.delete(this.endpoint(`emails/${emailID}`));
    }
    deletePhoneNumber(phoneID) {
        return this.delete(this.endpoint(`phone_numbers/${phoneID}`));
    }
}
exports.default = Users;
