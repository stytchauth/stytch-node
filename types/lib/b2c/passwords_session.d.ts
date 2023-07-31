import { fetchConfig } from "../shared";
import { Session } from "./sessions";
import { User } from "./users";
export interface PasswordsSessionResetRequest {
    password: string;
    session_token?: string;
    session_jwt?: string;
}
export interface PasswordsSessionResetResponse {
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
export declare class Sessions {
    private fetchConfig;
    constructor(fetchConfig: fetchConfig);
    /**
     * Reset the user’s password using their existing session. The endpoint will error if the session does not
     * have a password, email magic link, or email OTP authentication factor that has been issued within the
     * last 5 minutes.
     * @param data {@link PasswordsSessionResetRequest}
     * @returns {@link PasswordsSessionResetResponse}
     * @async
     * @throws A {@link StytchError} on a non-2xx response from the Stytch API
     * @throws A {@link RequestError} when the Stytch API cannot be reached
     */
    reset(data: PasswordsSessionResetRequest): Promise<PasswordsSessionResetResponse>;
}
