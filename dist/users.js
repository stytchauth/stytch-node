"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = exports.UserSearchIterator = exports.UserSearchOperator = void 0;

var _shared = require("./shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let UserSearchOperator;
exports.UserSearchOperator = UserSearchOperator;

(function (UserSearchOperator) {
  UserSearchOperator["OR"] = "OR";
  UserSearchOperator["AND"] = "AND";
})(UserSearchOperator || (exports.UserSearchOperator = UserSearchOperator = {}));

var mode;

(function (mode) {
  mode[mode["pending"] = 0] = "pending";
  mode[mode["inProgress"] = 1] = "inProgress";
  mode[mode["complete"] = 2] = "complete";
})(mode || (mode = {}));

class UserSearchIterator {
  constructor(client, data) {
    this.client = client;
    this.data = data;
    this.mode = mode.pending;
  }

  async next() {
    const res = await this.client.search(this.data);
    this.data = { ...this.data,
      cursor: res.results_metadata.next_cursor
    };

    if (!this.data.cursor) {
      this.mode = mode.complete;
    } else {
      this.mode = mode.inProgress;
    }

    return res.results;
  }

  hasNext() {
    return this.mode !== mode.complete;
  }

  async *[Symbol.asyncIterator]() {
    while (this.hasNext()) {
      yield this.next();
    }
  }

}

exports.UserSearchIterator = UserSearchIterator;

class Users {
  constructor(client) {
    _defineProperty(this, "base_path", "users");

    this.client = client;
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.base_path,
      data
    });
  }

  get(userID) {
    return (0, _shared.request)(this.client, {
      method: "GET",
      url: this.endpoint(userID)
    }).then(res => ({ ...res,
      ...parseUser(res)
    }));
  }

  search(data) {
    return (0, _shared.request)(this.client, {
      method: "POST",
      url: this.endpoint("search"),
      data
    }).then(res => {
      return { ...res,
        results: res.results.map(parseUser)
      };
    });
  }

  searchAll(data) {
    return new UserSearchIterator(this, data);
  }

  update(userID, data) {
    return (0, _shared.request)(this.client, {
      method: "PUT",
      url: this.endpoint(userID),
      data
    });
  }

  delete(userID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(userID)
    });
  }

  getPending(params) {
    return (0, _shared.request)(this.client, {
      method: "GET",
      url: this.endpoint("pending"),
      params
    });
  }

  deleteEmail(emailID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`emails/${emailID}`)
    });
  }

  deletePhoneNumber(phoneID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`phone_numbers/${phoneID}`)
    });
  }

  deleteWebAuthnRegistration(webAuthnRegistrationID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`webauthn_registrations/${webAuthnRegistrationID}`)
    });
  }

  deleteTOTP(totpID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`totps/${totpID}`)
    });
  }

  deleteCryptoWallet(cryptoWalletID) {
    return (0, _shared.request)(this.client, {
      method: "DELETE",
      url: this.endpoint(`crypto_wallets/${cryptoWalletID}`)
    });
  }

}

exports.Users = Users;

function parseUser(user) {
  return { ...user,
    created_at: new Date(user.created_at)
  };
}