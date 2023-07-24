"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Members = void 0;

var _shared = require("../shared");

class Members {
  constructor(fetchConfig, parent_path) {
    this.fetchConfig = fetchConfig;
    this.base_path = `${parent_path}`;
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `${this.base_path}/${data.organization_id}/members`,
      data
    });
  }

  get(params) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `${this.base_path}/${params.organization_id}/member`,
      params: { ...params
      }
    });
  }

  update(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: `${this.base_path}/${data.organization_id}/members/${data.member_id}`,
      data
    });
  }

  delete(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `${this.base_path}/${data.organization_id}/members/${data.member_id}`
    });
  }

  search(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: `${this.base_path}/members/search`,
      data
    });
  }

  deletePhoneNumber(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: `${this.base_path}/${data.organization_id}/members/phone_numbers/${data.member_id}`
    });
  }

}

exports.Members = Members;