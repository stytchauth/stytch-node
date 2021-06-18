const chai = require('chai');
const sinon = require('sinon');
const stytch = require('../lib/stytch');

const assert = chai.assert;
sinon.assert.expose(chai.assert, { prefix: '' });

describe('Client', () => {
    function newClient() {
        return new stytch.Client({
            project_id: 'PROJECT_ID',
            secret: 'SECRET',
            env: stytch.envs.test,
        });
    }
    describe('#getPendingUsers()', () => {
        it('uses default parameters when there are no arguments', async () => {
            const client = newClient();
            const req = sinon.stub(client, '_authenticatedRequest');
            await client.getPendingUsers();
            assert.calledOnceWithExactly(req, {
                path: 'users/pending',
                params: {
                    starting_after_id: null,
                    limit: null,
                },
            }, 'GET', undefined);
        });

        it('uses provided arguments', async () => {
            const client = newClient();
            const req = sinon.stub(client, '_authenticatedRequest');
            await client.getPendingUsers({
                starting_after_id: 'user-test-5826941c-1a12-4e76-be66-aaa33f5c8384',
                limit: 10,
            });
            assert.calledOnceWithExactly(req, {
                path: 'users/pending',
                params: {
                    starting_after_id: 'user-test-5826941c-1a12-4e76-be66-aaa33f5c8384',
                    limit: 10,
                },
            }, 'GET', undefined);
        });

        it('uses default parameters for an empty request', async () => {
            const client = newClient();
            const req = sinon.stub(client, '_authenticatedRequest');
            await client.getPendingUsers({});
            assert.calledOnceWithExactly(req, {
                path: 'users/pending',
                params: {
                    starting_after_id: null,
                    limit: null,
                },
            }, 'GET', undefined);
        });
    });
});
