import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { TeacherPrefController } from './teacherpref.controller';
import * as tempdb from '../../tests/db';

const TeacherPrefModel = require('../models/teacherpref.model');
const sinon = require('sinon');

beforeAll(async () => await tempdb.connect());
afterEach(async () => await tempdb.clearDatabase());
afterAll(async () => await tempdb.closeDatabase());

describe('TeacherPrefController', () => {
    describe('update', () => {
        beforeEach(() => {
            sinon.restore();
        });

        it('Should create user preference', async () => {
            const teacherPrefController = new TeacherPrefController();
            const email = 'test@gmail.com';
            const response = await teacherPrefController.update(
                "abcd",
                email, 
                ["CSC 110", "CSC 111"],
                "08:30",
                "15:00",
                "true"
            );

            const teacherPrefs = await TeacherPrefModel.find({email: email});
            expect(response).toBe(undefined);
            expect(teacherPrefs.length).toBe(1);

            

        });

        it('should not create another preference for the same teacher', async () => {
            const teacherPrefController = new TeacherPrefController();
            const email = 'test@gmail.com';
            const response = await teacherPrefController.update(
                "abcd",
                email, 
                ["CSC 110", "CSC 111"],
                "08:30",
                "15:00",
                "true"
            );
            const response2 = await teacherPrefController.update(
                "abcd",
                email, 
                ["CSC 110", "CSC 111"],
                "08:30",
                "12:00",
                "false"
            );
            const teacherPrefs2 = await TeacherPrefModel.find({email: email});
            expect(response2).toBe(undefined);
            expect(teacherPrefs2.length).toBe(1);
        });

        
    });

    describe('list', () => {
        beforeEach(() => {
            sinon.restore();
        });

        it('should get empty list of teacher pref', async () => {
            const teacherPrefController = new TeacherPrefController();
            const prefList = await teacherPrefController.list();
            expect(prefList.length).toBe(0);
        });

        it('should get list of teacher pref', async () => {
            const teacherPrefController = new TeacherPrefController();
            const response = await teacherPrefController.update(
                "abcd",
                'test@email.com', 
                ["CSC 110", "CSC 111"],
                "08:30",
                "15:00",
                "true"
            );
            const prefList1 = await teacherPrefController.list();
            expect(prefList1.length).toBe(1);
            
            const response2 = await teacherPrefController.update(
                "abcd",
                'test2@email.com', 
                ["CSC 110", "CSC 111"],
                "08:30",
                "15:00",
                "true"
            );
            const prefList2 = await teacherPrefController.list();
            expect(prefList2.length).toBeGreaterThan(0);

        });

    });

    describe('my', () => {
        beforeEach(() => {
            sinon.restore();
        });

        it('should get my pref even if it hasnt been created', async () => {
            const teacherPrefController = new TeacherPrefController();
            const myPref = await teacherPrefController.my('test@email.com', "abcd");
            expect(myPref).toBeDefined();
        });

        it('should get my pref if it hasnt been created', async () => {
            const teacherPrefController = new TeacherPrefController();
            const resp = await teacherPrefController.update(
                "abcd",
                'test@email.com', 
                ["CSC 110", "CSC 111"],
                "08:30",
                "15:00",
                "true"
            );
            const myPref = await teacherPrefController.my('test@email.com', "abcd");
            expect(myPref).toBeDefined();
        });

    });


});