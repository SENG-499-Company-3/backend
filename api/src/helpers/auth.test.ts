import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { hashPassword } from './auth';
import * as tempdb from '../../tests/db';

const sinon = require('sinon');

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

      expect(typeof response).toBe('string');
    });

    // it('should throw an error when the hash is different', async () => {

    // });
  });
});
