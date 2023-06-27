import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { hashPassword, comparePassword } from './auth';
import * as tempdb from '../../tests/db';
import { IUser } from '../interfaces/User';

const UserModel = require('../models/user.model');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

beforeAll(async () => await tempdb.connect());
afterEach(async () => await tempdb.clearDatabase());
afterAll(async () => await tempdb.closeDatabase());

describe('auth', () => {
    describe('hashedPassword', () => {
        beforeEach(() => {
            sinon.restore();
        });
        
        it('should return a hashed password when provided with a string', async () => {
            const response = await hashPassword('pass');

            expect(typeof(response)).toBe('string');
        });

        // it('should throw an error when the hash is different', async () => {
            
            
        
        // });

    });
});
