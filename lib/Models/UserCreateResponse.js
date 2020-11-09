/**
 * Stytch
 */

'use strict';

const BaseModel = require('./BaseModel');

/**
 * Creates an instance of UserCreateResponse
 */
class UserCreateResponse extends BaseModel {
    /**
     * @constructor
     * @param   {Object}  obj    The object passed to constructor
     */
    constructor(obj) {
        super(obj);
        if (obj === undefined || obj === null) return;
        this.requestId = this.constructor.getValue(obj.requestId || obj.request_id);
        this.userId = this.constructor.getValue(obj.userId || obj.user_id);
        this.emailId = this.constructor.getValue(obj.emailId || obj.email_id);
    }

    /**
     * Function containing information about the fields of this model
     * @return   {array}   Array of objects containing information about the fields
     */
    static mappingInfo() {
        return super.mappingInfo().concat([
            { name: 'requestId', realName: 'request_id' },
            { name: 'userId', realName: 'user_id' },
            { name: 'emailId', realName: 'email_id' },
        ]);
    }

    /**
     * Function containing information about discriminator values
     * mapped with their corresponding model class names
     *
     * @return   {object}  Object containing Key-Value pairs mapping discriminator
     *                     values with their corresponding model classes
     */
    static discriminatorMap() {
        return {};
    }
}

module.exports = UserCreateResponse;
