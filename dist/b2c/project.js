"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;
require("../shared/method_options");
var _shared = require("../shared");
// !!!
// WARNING: This file is autogenerated
// Only modify code within MANUAL() sections
// or your changes may be overwritten later!
// !!!

class Project {
  constructor(fetchConfig) {
    this.fetchConfig = fetchConfig;
  }

  /**
   * @param params {@link ProjectMetricsRequest}
   * @returns {@link ProjectMetricsResponse}
   * @async
   * @throws A {@link StytchError} on a non-2xx response from the Stytch API
   * @throws A {@link RequestError} when the Stytch API cannot be reached
   */
  metrics() {
    const headers = {};
    return (0, _shared.request)(this.fetchConfig, {
      method: "GET",
      url: `/v1/projects/metrics`,
      headers
    });
  }
}
exports.Project = Project;