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

const controller = testerlib.EmailsController;
const UserEmailDeleteResponse = testerlib.UserEmailDeleteResponse;
const SendVerificationResponse = testerlib.SendVerificationResponse;
const VerifyEmailResponse = testerlib.VerifyEmailResponse;

describe("EmailsController Tests", function tests() {
    this.timeout(testConfiguration.TEST_TIMEOUT);

    /**
     * Remove an email from a given user.
     */
    it("should testTestDeleteEmail response", function testTestDeleteEmailTest(done) {
        // parameters for the API call
        let emailId = 'email-test-c1a1d554-a93c-11ea-bb37-0242ac130002';
        let userId = 'user-test-b8797f2c-a93c-11ea-bb37-0242ac130002';

        controller.deleteEmail(emailId, userId, function callback(error, response, context) {
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
     * Prompt for a verification email to be sent to the user to confirm the correct email was entered. The email must be verified before the user needs to login next.
     */
    it("should testTestSendEmailVerification response", function testTestSendEmailVerificationTest(done) {
        // parameters for the API call
        let userId = 'user-test-b8797f2c-a93c-11ea-bb37-0242ac130002';
        let emailId = 'email-test-c1a1d554-a93c-11ea-bb37-0242ac130002';

        controller.createSendEmailVerification(userId, emailId, function callback(error, response, context) {
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
     * Verify that a user supplied the correct email during signup.
     */
    it("should testTestVerifyEmail response", function testTestVerifyEmailTest(done) {
        // parameters for the API call
        let token = 'KKFa7u0KgAgHGXkZ77gOEd8YjyzzcC1rvMINgsZuIxM';

        controller.createVerifyEmail(token, function callback(error, response, context) {
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
