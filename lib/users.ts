import type { AxiosInstance } from "axios";
import type {
  Attributes,
  BaseResponse,
  Email,
  Name,
  PhoneNumber,
} from "./shared";

type UserID = string;

interface PendingUser {
  user_id: UserID;
  name: Name;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  status: string;
  invited_at: string;
}

interface CreateRequest {
  email?: string;
  phone_number?: string;
  name?: Name;
  create_user_as_pending?: boolean;
  attributes?: Attributes;
}

interface CreateResponse extends BaseResponse {
  user_id: UserID;
  email_id: string;
  phone_id: string;
  status: string;
}

interface GetResponse extends BaseResponse {
  user_id: UserID;
  name: Name;
  emails: Email[];
  phone_numbers: PhoneNumber[];
  status: string;
}

interface UpdateRequest {
  name?: Name;
  emails?: string[];
  phone_numbers?: string[];
  attributes?: Attributes;
}

interface UpdateResponse extends BaseResponse {
  user_id: UserID;
  emails: Email[];
  phone_numbers: PhoneNumber[];
}

interface DeleteResponse extends BaseResponse {
  user_id: UserID;
}

interface GetPendingRequest {
  starting_after_id?: string;
  limit?: bigint;
}

interface GetPendingResponse extends BaseResponse {
  users: PendingUser[];
  has_more: boolean;
  starting_after_id: string;
  total: bigint;
}

interface DeleteEmailResponse extends BaseResponse {
  user_id: UserID;
}

interface DeletePhoneNumberResponse extends BaseResponse {
  user_id: UserID;
}

export default class Users {
  base_path = "users";
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private endpoint(path: string): string {
    return `${this.base_path}/${path}`;
  }

  create(request: CreateRequest): Promise<CreateResponse> {
    return this.client.post("users", { body: request });
  }

  get(userID: UserID): Promise<GetResponse> {
    return this.client.get(this.endpoint(userID));
  }

  update(userID: UserID, request: UpdateRequest): Promise<UpdateResponse> {
    return this.client.put(this.endpoint(userID), { body: request });
  }

  delete(userID: UserID): Promise<DeleteResponse> {
    return this.client.delete(this.endpoint(userID));
  }

  getPending(request?: GetPendingRequest): Promise<GetPendingResponse> {
    const params: GetPendingRequest = request || {};
    return this.client.get(this.endpoint("pending"), { params });
  }

  deleteEmail(emailID: string): Promise<DeleteEmailResponse> {
    return this.delete(this.endpoint(`emails/${emailID}`));
  }

  deletePhoneNumber(phoneID: string): Promise<DeletePhoneNumberResponse> {
    return this.delete(this.endpoint(`phone_numbers/${phoneID}`));
  }
}
