/**
 * Stytch
 */

'use strict';

const chai = require('chai');
const assert = chai.assert;
const TestHelper = require("../TestHelper");
const APIHelper = require("../../lib/APIHelper");
const testerlib = require("../../lib");
const testConfiguration = require("../TestBootstrap");
const baseController = require("../../lib/Controllers/BaseController");

const controller = testerlib.Users;
const UserCreateResponse = testerlib.UserCreateResponse;
const UserCreate = testerlib.UserCreate;
const UserGetResponse = testerlib.UserGetResponse;
const UserUpdateResponse = testerlib.UserUpdateResponse;
const UserUpdate = testerlib.UserUpdate;
const UserDeleteResponse = testerlib.UserDeleteResponse;

describe("Users Tests", function tests() {
    this.timeout(testConfiguration.TEST_TIMEOUT);

    /**
     * Fetch a given user to see what their various attributes are.
     */
    it("should testTestGetUserByID response", function testTestGetUserByIDTest(done) {
        // parameters for the API call
        let userId = 'user-test-b8797f2c-a93c-11ea-bb37-0242ac130002';

        controller.getUserByID(userId, function callback(error, response, context) {
            // test response code
            assert.equal(200, context.response.statusCode);
            // test headers
            let headers = [];
            headers['Content-Type'] = 'application/json';
            assert.isTrue(TestHelper.areHeadersProperSubsetOf(headers, context.response.headers, true));
            done();
        }).catch(() => undefined);
    });

    /**
     * Remove a user from Stytch.
     */
    it("should testTestDeleteUser response", function testTestDeleteUserTest(done) {
        // parameters for the API call
        let userId = 'user-test-b8797f2c-a93c-11ea-bb37-0242ac130002';

        controller.deleteUser(userId, function callback(error, response, context) {
            // test response code
            assert.equal(200, context.response.statusCode);
            // test headers
            let headers = [];
            headers['Content-Type'] = 'application/json';
            assert.isTrue(TestHelper.areHeadersProperSubsetOf(headers, context.response.headers, true));
            done();
        }).catch(() => undefined);
    });

});
