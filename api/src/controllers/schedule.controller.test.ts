import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { ScheduleController } from './schedule.controller';
import * as tempdb from '../../tests/db';
import { UserController } from './user.controller';

const ScheduleModel = require('../models/schedule.model');
const sinon = require('sinon');

beforeAll(async () => await tempdb.connect());
afterEach(async () => await tempdb.clearDatabase());
afterAll(async () => await tempdb.closeDatabase());

describe('ScheduleController', () => {
    describe('create', () => {
        beforeEach(() => {
            sinon.restore();
        });

        it('Should create and save the schedule.', async () => {
            const scheduleController = new ScheduleController();
            const response = await scheduleController.create();

            const schedules = await ScheduleModel.find({});
            expect(response).toBe(undefined);
            expect(schedules.length).toBeGreaterThan(0);
        });

        it('Should get schedule properly', async() => {
            const scheduleController = new ScheduleController();
            const s_list1 = await scheduleController.list();
            expect(s_list1.length).toBe(0);
            
            const response2 = await scheduleController.create();
            const s_list2 = await scheduleController.list();
            expect(s_list2.length).toBe(0);
            
        });

        it('Should get this users schedule', async() => {
            const scheduleController = new ScheduleController();
            const userController = new UserController();
            const email = 'tony@gmail.com';
            const response_uc = await userController.create(email, 'test', 'test', 'TEACHER');
            const schedules_empty = await scheduleController.my(email);
            expect(schedules_empty.length).toBe(0);

            const response_sc = await scheduleController.create();
            const schedules = await scheduleController.my(email);
            expect(schedules.length).toBeGreaterThan(0);

        });

    });
});