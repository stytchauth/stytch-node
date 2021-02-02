'use strict';

/* global before, beforeEach, describe, it */
const async = require('async');
const P = require('bluebird');
const dotenv = require('dotenv');
const expect = require('expect.js');
const moment = require('moment');
const R = require('ramda');
const sinon = require('sinon');

const stytch = require('../');

dotenv.config();
const { SECRET, PROJECT_ID } = process.env;

describe('stytch.Client', () => {
    const configs = {
        clientID: PROJECT_ID,
        secret: SECRET,
        env: stytch.environments.test
    };

    let cl;
    beforeEach(() => {
        cl = new stytch.Client(configs);
    });

    describe('constructor', () => {
        it('throws exception for invalid parameter', () => {
            expect(() => {
                stytch.Client('projectID');
            }).to.throwException(e => {
                expect(e).to.be.ok();
                expect(e.message).to.equal(
                    ''
                );
            });
        });

        it('throws exception for missing clientID', () => {
            expect(() => {
                stytch.Client(R.merge(configs, {
                    projectID: null,
                }));
            }).to.throwException(e => {
                expect(e).to.be.ok();
                expect(e.message).to.equal('Missing "projectID"');
            });
        });

        it('throws exception for missing secret', () => {
            expect(() => {
                stytch.Client(R.merge(configs, {
                    secret: null,
                }));
            }).to.throwException(e => {
                expect(e).to.be.ok();
                expect(e.message).to.equal('Missing "secret"');
            });
        });

        it('throws exception for invalid environment', () => {
            expect(() => {
                stytch.Client(R.merge(configs, {
                    env: 'sandbox',
                }));
            }).to.throwException(e => {
                expect(e).to.be.ok();
                expect(e.message).to.equal('Invalid  environment');
            });
        });

        it('throws exception for too many arguments', () => {
            expect(() => {
                stytch.Client(configs, 'extra arg');
            }).to.throwException(e => {
                expect(e).to.be.ok();
                expect(e.message).to.equal('Too many arguments');
            });
        });

        it('success with all arguments', () => {
            expect(() => {
                R.forEachObjIndexed(env => {
                    stytch.Client(R.merge(configs, {
                        env: env,
                    }));
                }, stytch.environments);
            }).not.to.throwException();
        });

        it('success without any options', () => {
            expect(() => {
                R.forEachObjIndexed(env => {
                    stytch.Client(R.merge(configs, {
                        env: env,
                    }));
                }, stytch.environments);
            }).not.to.throwException();
        });
    });
    });