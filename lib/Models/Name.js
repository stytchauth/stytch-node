/**
 * Stytch
 */

'use strict';

const BaseModel = require('./BaseModel');

/**
 * Creates an instance of Name
 */
class Name extends BaseModel {
    /**
     * @constructor
     * @param   {Object}  obj    The object passed to constructor
     */
    constructor(obj) {
        super(obj);
        if (obj === undefined || obj === null) return;
        this.firstName = this.constructor.getValue(obj.firstName);
        this.middleName = this.constructor.getValue(obj.middleName);
        this.lastName = this.constructor.getValue(obj.lastName);
    }

    /**
     * Function containing information about the fields of this model
     * @return   {array}   Array of objects containing information about the fields
     */
    static mappingInfo() {
        return super.mappingInfo().concat([
            { name: 'firstName', realName: 'firstName' },
            { name: 'middleName', realName: 'middleName' },
            { name: 'lastName', realName: 'lastName' },
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

module.exports = Name;
