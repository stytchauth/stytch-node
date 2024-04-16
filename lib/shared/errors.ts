import { requestConfig } from "./";

export interface StytchErrorJSON {
  status_code: number;
  request_id: string;
  error_type: string;
  error_message: string;
  error_url: string;
}

export interface OAuth2ErrorJSON {
  status_code: number;
  request_id: string;
  error: string;
  error_description: string;
  error_uri: string;
}

export class StytchError extends Error {
  status_code: number;
  request_id: string;
  error_type: string;
  error_message: string;
  error_url: string;

  constructor(data: StytchErrorJSON | OAuth2ErrorJSON) {
    super(JSON.stringify(data));
    if ("error" in data) {
      this.status_code = data.status_code;
      this.request_id = data.request_id;
      this.error_type = data.error;
      this.error_message = data.error_description;
      this.error_url = data.error_uri;
    } else {
      this.status_code = data.status_code;
      this.request_id = data.request_id;
      this.error_type = data.error_type;
      this.error_message = data.error_message;
      this.error_url = data.error_url;
    }
  }
}

export class RequestError extends Error {
  request: requestConfig;

  constructor(message: string, request: requestConfig) {
    super(message);
    this.request = request;
  }
}

export class ClientError extends Error {
  code: string;
  cause: unknown;

  constructor(code: string, message: string, cause?: unknown) {
    let msg = `${code}: ${message}`;
    if (cause) {
      msg += `: ${cause}`;
    }
    super(msg);
    this.code = code;
    this.cause = cause;
  }
}
