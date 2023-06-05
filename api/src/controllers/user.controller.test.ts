import { beforeEach, describe, it } from "mocha";
import { UserController } from "./user.controller";

const { expect } = require('chai');


// basic user controller test, tests are failing right now 
// but better testability will be added in the following sprint.

describe('UserController', () => {
  let userController;

  beforeEach(() => {
    userController = new UserController();
  });

  describe('create', () => {
    it('should create and save a new user', () => {
      // Arrange
      let req = {
        body: {
          username: 'john_doe',
          password: 'password123'
        }
      };
      let res  = {
        send: () => {},
        status: () => res,
        statusCode: 0
      };

      // Act
      userController.create(req, res);

      // Assert
      // Check if the response is sent successfully
      expect(res.statusCode).to.equal(200);
      // Add additional assertions as needed
    });

    it('should return an error when request body is missing username', () => {
      // Arrange
      let req = {
        body: {
          password: 'password123'
        }
      };
      let res = {
        send: () => {},
        status: () => res,
        statusCode: 0
      };

      // Act
      userController.create(req, res);

      // Assert
      // Check if the response has an error status code
      expect(res.statusCode).to.equal(400);
      // Add additional assertions as needed
    });
  });

  describe('list', () => {
    it('should retrieve all users from the database', () => {
      // Arrange
      let res = {
        send: () => {},
        status: () => res,
        statusCode: 0
      };

      // Act
      userController.list({}, res);

      // Assert
      // Check if the response is sent successfully
      expect(res.statusCode).to.equal(200);
      // Add additional assertions as needed
    });
  });
});
