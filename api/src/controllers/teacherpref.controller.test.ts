import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { TeacherPrefController } from './teacherpref.controller';
import * as tempdb from '../../tests/db';

const TeacherPrefModel = require('../models/teacherpref.model');
import sinon from 'sinon';

beforeAll(async () => await tempdb.connect());
afterEach(async () => await tempdb.clearDatabase());
afterAll(async () => await tempdb.closeDatabase());

describe.only('TeacherPrefController', () => {
  describe('update', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Should create user preference', async () => {
      const teacherPrefController = new TeacherPrefController();
      const name = 'abc';
      const response = await teacherPrefController.update({
        email: 'abc',
        coursePreferences: [
          {
            courseName: 'course',
            courseYear: 10,
            ability: 'ABLE',
            willingness: 'WILLING'
          }
        ],
        additionalDetailes: 'nothing',
        availability: [
          {
            term: {
              termId: 1,
              year: 2023,
              month: 5
            },
            isAvailable: true
          }
        ],
        load: 2
      });

      const teacherPrefs = await TeacherPrefModel.find({ professorId: name });
      expect(response.professorId).toBe(name);
      expect(teacherPrefs.length).toBe(1);
    });

    it('should not create another preference for the same teacher', async () => {
      const teacherPrefController = new TeacherPrefController();
      const name = 'abc';
      await teacherPrefController.update({
        email: 'abc',
        coursePreferences: [
          {
            courseName: 'course',
            courseYear: 10,
            ability: 'ABLE',
            willingness: 'WILLING'
          }
        ],
        additionalDetailes: 'nothing',
        availability: [
          {
            term: {
              termId: 1,
              year: 2023,
              month: 5
            },
            isAvailable: true
          }
        ],
        load: 2
      });
      const response2 = await teacherPrefController.update({
        email: 'abc',
        coursePreferences: [
          {
            courseName: 'course',
            courseYear: 10,
            ability: 'ABLE',
            willingness: 'WILLING'
          }
        ],
        additionalDetailes: 'nothing',
        availability: [
          {
            term: {
              termId: 1,
              year: 2023,
              month: 5
            },
            isAvailable: true
          }
        ],
        load: 3
      });
      const teacherPrefs2 = await TeacherPrefModel.find({ professorId: name });
      expect(response2.load).toBe(3);
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
      await teacherPrefController.update({
        email: 'abc',
        coursePreferences: [
          {
            courseName: 'course',
            courseYear: 10,
            ability: 'ABLE',
            willingness: 'WILLING'
          }
        ],
        additionalDetailes: 'nothing',
        availability: [
          {
            term: {
              termId: 1,
              year: 2023,
              month: 5
            },
            isAvailable: true
          }
        ],
        load: 3
      });
      const prefList1 = await teacherPrefController.list();
      expect(prefList1.length).toBe(1);

      await teacherPrefController.update({
        email: 'abc',
        coursePreferences: [
          {
            courseName: 'course',
            courseYear: 10,
            ability: 'ABLE',
            willingness: 'WILLING'
          }
        ],
        additionalDetailes: 'nothing',
        availability: [
          {
            term: {
              termId: 1,
              year: 2023,
              month: 5
            },
            isAvailable: true
          }
        ],
        load: 3
      });
      const prefList2 = await teacherPrefController.list();
      expect(prefList2.length).toBeGreaterThan(0);
    });
  });
});
