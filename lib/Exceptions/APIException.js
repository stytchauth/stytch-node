/**
 * Stytch
 */

'use strict';

/**
 * Creates an instance of APIException
 */
class APIException {
    /**
     * @constructor
     */
    constructor() {
        this.reason = '';
        this.context = '';
    }

    /**
     * Function containing information about the fields of this model
     * @return   {array}   Empty array
     */
    static mappingInfo() {
        return [];
    }
}

module.exports = APIException;
