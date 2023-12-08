export interface Authorization {
    session_token?: string;
    session_jwt?: string;
}
export declare function addAuthorizationHeaders(headers: Record<string, string>, authorization: Authorization): void;
