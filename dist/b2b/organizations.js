"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Organizations = void 0;

var _shared = require("../shared");

var _members = require("./members");

class Organizations {
  base_path = "organizations";

  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
    this.members = new _members.Members(fetchConfig, this.base_path);
  }

  endpoint(path) {
    return `${this.base_path}/${path}`;
  }

  create(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.base_path,
      data
    });
  }

  get({
    organization_id
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: this.endpoint(organization_id)
    });
  }

  search(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "POST",
      url: this.endpoint("search"),
      data
    });
  }

  update(data) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "PUT",
      url: this.endpoint(data.organization_id),
      data
    });
  }

  delete({
    organization_id
  }) {
    return (0, _shared.request)(this.fetchConfig, {
      method: "DELETE",
      url: this.endpoint(organization_id)
    });
  }

}

exports.Organizations = Organizations;