import { describe, expect, beforeAll, afterAll, afterEach, it, beforeEach } from '@jest/globals';
import { TeacherPrefController } from './teacherpref.controller';
import * as tempdb from '../../tests/db';

import TeacherPrefModel from '../models/teacherpref.model';
import sinon from 'sinon';

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
      const name = 'abc';
      const response = await teacherPrefController.update({
        professorId: name,
        coursePreferences: [
          {
            courseId: 10,
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

      const teacherPrefs = await teacherPrefController.byId(name);
      expect(response.professorId).toBe(name);
      expect(teacherPrefs.load).toBe(2);
    });

    it('should not create another preference for the same teacher', async () => {
      const teacherPrefController = new TeacherPrefController();
      const name = 'abc';
      const response = await teacherPrefController.update({
        professorId: 'abc',
        coursePreferences: [
          {
            courseId: 10,
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
        professorId: 'abc',
        coursePreferences: [
          {
            courseId: 10,
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
      const teacherPrefs2 = await TeacherPrefModel.find({ professorId: name }).limit(1);
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
      const response = await teacherPrefController.update({
        professorId: 'abc',
        coursePreferences: [
          {
            courseId: 10,
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

      const response2 = await teacherPrefController.update({
        professorId: 'abc',
        coursePreferences: [
          {
            courseId: 10,
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

  describe('my', () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('should get my pref even if it hasnt been created', async () => {
      const teacherPrefController = new TeacherPrefController();
      const myPref = await teacherPrefController.my('test@email.com', 'abcd');
      expect(myPref).toBeDefined();
    });

    it('should get my pref if it hasnt been created', async () => {
      const teacherPrefController = new TeacherPrefController();
      const resp = await teacherPrefController.update({
        professorId: 'abc',
        coursePreferences: [
          {
            courseId: 10,
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
      const myPref = await teacherPrefController.my('test@email.com', 'abcd');
      expect(myPref).toBeDefined();
    });
  });
});
