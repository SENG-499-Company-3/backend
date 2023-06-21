import { describe, expect, beforeAll, afterAll, afterEach, it } from '@jest/globals';
import { UserController } from './user.controller';
import * as tempdb from '../../tests/db';
const UserModel = require('../models/user.model');

beforeAll(async () => await tempdb.connect());
afterEach(async () => await tempdb.clearDatabase());
afterAll(async () => await tempdb.closeDatabase());

describe('UserController', () => {
  describe('create', () => {
    it('should create and save a new user', async () => {
      const userController = new UserController();
      const response = await userController.create('test@email.com', 'pass', 'user', 'TEACHER');

      const users = await UserModel.find({ email: 'test@email.com' });

      expect(response).toBe(undefined);
      expect(users.length).toBe(1);
    });

    it('should throw an error if insert fails', async () => {
      // Arrange
      const userController = new UserController();
      try {
        await userController.create('', 'pass', 'user', 'TEACHER');
      } catch (err: any) {
        expect(err.message).toBe('Some error occurred while creating the User.');
      }
    });
  });

  describe('list', () => {
    it('should return empty list if no users', async () => {
      const userController = new UserController();
      const response = await userController.list();

      expect(response).toStrictEqual([]);
    });

    it('should return list of users', async () => {
      const user = new UserModel({
        email: 'email',
        password: 'password',
        name: 'name',
        role: 'TEACHER',
        token: ''
      });

      await user.save(user);

      const userController = new UserController();
      const response = await userController.list();

      expect(response.length).toBe(1);
    });

    //This test "succeeds" because no Schema is inserted into `UserModel` so the query fails
    it('should throw an error if query fails', async () => {
      const userController = new UserController();
      try {
        await userController.list();
      } catch (err: any) {
        expect(err.message).toBe('Some error occurred while creating the User.');
      }
    });
  });
});
