/**
 * Stytch
 * This is the Stytch api.  You can find out more about Stytch at  [stytch.com](https://stytch.com). 
 *
 * OpenAPI spec version: v1
 * Contact: hello@stytch.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface ErrorResponse { 
    /**
     * The HTTP Status such as OK, Canceled, Aborted etc.
     */
    status?: number;
    /**
     * A unique identified for the request.
     */
    requestId?: string;
    /**
     * The type of error such as user_not_found, invalid_parameters, etc that specifically describes the reason the error occurred.
     */
    errorType?: string;
    /**
     * A human readable description of the error with details on debugging.
     */
    errorMessage?: string;
    /**
     * Url for where in the docs to find more information about this error.
     */
    errorUrl?: string;
}