interface Auth {
    project_id: string;
    secret: string;
}
export interface Request {
    path: string;
    body?: Record<string, unknown>;
    params?: Record<string, unknown>;
}
export declare type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export declare type Callback = (err: unknown | null, args?: unknown) => void;
declare const stytchRequest: (auth: Auth, env: string, request: Request, method: HttpMethod, cb?: Callback | undefined) => Promise<unknown>;
export default stytchRequest;
