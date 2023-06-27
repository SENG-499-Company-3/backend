import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { AuthController } from './auth.controller';
import * as tempdb from '../../tests/db';
import { IUser } from '../interfaces/User';

const UserModel = require('../models/user.model');
const sinon = require('sinon');

beforeAll(async () => await tempdb.connect());
afterEach(async () => await tempdb.clearDatabase());
afterAll(async () => await tempdb.closeDatabase());

describe('AuthController', () => {
    describe('login', () => {
        beforeEach(() => {
            sinon.restore();
        });

        it('should allow a user with the correct credentials to login and be assigned a jwt token', async () => {
            jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve({ 
                email: 'test@email.com',
                password: '$2b$10$4cpWqV2h7XBkGgV.Mq6q8.Xz2/YLpk1EiMQB0QX7zUI0/YV5nkdxO',
                name: 'John Doe',
                role: 'TEACHER',
                token: ''
            }))
            
            jest.spyOn(UserModel, 'findOneAndUpdate').mockReturnValue(Promise.resolve({ 
                email: 'test@email.com',
                password: '$2b$10$4cpWqV2h7XBkGgV.Mq6q8.Xz2/YLpk1EiMQB0QX7zUI0/YV5nkdxO',
                name: 'John Doe',
                role: 'TEACHER',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwiaWF0IjoxNjg3NTU5MzA2fQ.dsERZuOJmO1cHodzrXBTQvaq_9JYTmEbVecTKNTlBcQ'
            }))

            const authController = new AuthController();
            const response = await authController.login('test@email.com', 'pass');

            expect(typeof(response)).toBe("string");

        })

        it('should throw an error when a user is not found', async () => {
            jest.spyOn(UserModel, 'findOne').mockReturnValue(null);

            const authController = new AuthController();

            let err;
            try {
                await authController.login('test', 'pass');
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('User not found.');
        });

        it('should throw an error when the wrong password is provided', async () => {
            jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve({ 
                email: 'test@email.com',
                password: '$2b$10$4cpWqV2h7XBkGgV.Mq6q8.Xz2/YLpk1EiMQB0QX7zUI0/YV5nkdxO',
                name: 'John Doe',
                role: 'TEACHER',
                token: ''
            }))

            const authController = new AuthController();

            let err;
            try {
                await authController.login('test', 'pss');
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Invalid password.');
        })
    });

    describe('self', () => {
        beforeEach(() => {
            sinon.restore();
        });

        it('should check if a users auth token matches one found in the database', async () => {
            jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve({ 
                email: '123@gmail.com',
                password: '$2b$10$S7I99H65bLTIlrbFxpG6MuElBAe8k.tcEe9SXAJdd7bK3DXA1Q1oC',
                name: 'John Doe',
                role: 'TEACHER',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.I5XbzYKaGyeKykmcDu-tuWBE4E68lfuQTBJYVKwMb2c'
            }))
            
            const authController = new AuthController();
            const response = await authController.self('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.I5XbzYKaGyeKykmcDu-tuWBE4E68lfuQTBJYVKwMb2c');
            
            //expect(response).toBeInstanceOf(UserModel);
            expect(response.email).toBe('123@gmail.com');
        });

        it('should throw an error when a user with the provided email cannot be found', async () => {
            jest.spyOn(UserModel, 'findOne').mockReturnValue(null);

            const authController = new AuthController();

            let err;
            try {
                await authController.self('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.I5XbzYKaGyeKykmcDu-tuWBE4E68lfuQTBJYVKwMb2c');
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('There was no user with that email.');
        });

        it('should throw and error if the provided token is invalid', async () => {
            // sinon.mock(UserModel.prototype).expects('jwt_decode').throws();
            jest.mock('jwt-decode', () => ({ default: () => ({ email: '123@gmail.com' }) }))

            const authController = new AuthController();

            let err;
            try {
                await authController.self('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImlhdCI6MTUxNjIzOTAyMn0.RJplmJsNNH_flBFVwDIBVnjnZD6mpuH8CRErcG6R3KQ');
            } catch (e) {
                err = e;
            }

            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('This token was invalid!');
        });
    });
    
});
