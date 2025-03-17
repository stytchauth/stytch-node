import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User } from "./users";
export interface ImpersonationAuthenticateRequest {
    impersonation_token: string;
}
export interface ImpersonationAuthenticateResponse {
    /**
     * Globally unique UUID that is returned with every API call. This value is important to log for debugging
     * purposes; we may ask for this value to help identify a specific API call when helping you debug an issue.
     */
    request_id: string;
    user_id: string;
    /**
     * The `user` object affected by this API call. See the
     * [Get user endpoint](https://stytch.com/docs/api/get-user) for complete response field details.
     */
    user: User;
    session_token: string;
    session_jwt: string;
    /**
     * The HTTP status code of the response. Stytch follows standard HTTP response status code patterns, e.g.
     * 2XX values equate to success, 3XX values are redirects, 4XX are client errors, and 5XX are server errors.
     */
    status_code: number;
    /**
     * If you initiate a Session, by including `session_duration_minutes` in your authenticate call, you'll
     * receive a full Session object in the response.
     *
     *   See [GET sessions](https://stytch.com/docs/api/session-get) for complete response fields.
     *
     */
    session?: Session;
}
export declare class Impersonation {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Authenticate an impersonation token to impersonate a User. This endpoint requires an impersonation token
     * that is not expired or previously used.
     * A Stytch session will be created for the impersonated user with a 60 minute duration. Impersonated
     * sessions cannot be extended.
     *
     * Prior to this step, you can generate an impersonation token by visiting the Stytch dashboard, viewing a
     * user, and clicking the `Impersonate User` button.
     * @param data {@link ImpersonationAuthenticateRequest}
     * @returns {@link ImpersonationAuthenticateResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    authenticate(data: ImpersonationAuthenticateRequest): Promise<ImpersonationAuthenticateResponse>;
}
