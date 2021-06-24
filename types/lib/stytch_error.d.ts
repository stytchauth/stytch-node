export default class StytchError extends Error {
    status_code: number;
    request_id: string;
    error_type: string;
    error_message: string;
    error_url: string;
    constructor(data: {
        status_code: number;
        request_id: string;
        error_type: string;
        error_message: string;
        error_url: string;
    });
}
