import express from 'express';
import { CourseController } from '../controllers/course.controller';
import { isAdmin } from '../helpers/auth';
import { validate } from 'express-jsonschema';

import courseValidate from '../schemagen/schemas/course.json';
import type { Courseid as CourseValidate } from '../schemagen/types/courseid';

const router = express.Router();
const courseController: CourseController = new CourseController();
const Course = require('../models/course.model');

/**
 * Admin: get list of all courses
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const list = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }
    const authToken = req.headers.authorization;
    const isAdm = await isAdmin(authToken);
    if (!isAdm) {
      res.status(401).send({ message: 'Need admin access.' });
      return;
    }

    const courses = await courseController.list();
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/list', list);

/**
 * Admin: add course if doesn't exist, otherwise update course type and/or capacity
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */

const create = async ({ headers, body }: { headers: any; body: CourseValidate }, res: any): Promise<void> => {
  try {
    if (!headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }
    const authToken = headers.authorization;
    const isAdm = await isAdmin(authToken);
    if (!isAdm) {
      res.status(401).send({ message: 'Need admin access.' });
      return;
    }

    const course_new = new Course({
      Subj: body.Subj,
      Num: body.Num,
      Section: body.Section,
      Title: body.Title,
      SchedType: body.SchedType,
      Type: body.Type
    });

    await courseController.create(course_new);
    res.status(200).send({ message: 'Added course.' });
  } catch (err) {
    res.status(401).send({ message: err + '' });
  }
};
router.post('/create', validate({ body: courseValidate }), create);

/**
 * Admin: remove course
 *
 * @param {*} req
 * @param {*} res
 * @return {*}  {Promise<void>}
 */
const remove = async (req: any, res: any): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }
    const authToken = req.headers.authorization;
    const isAdm = await isAdmin(authToken);
    if (!isAdm) {
      res.status(401).send({ message: 'Need admin access.' });
      return;
    }

    const course = new Course({
      Subj: req.body.Subj,
      Num: req.body.Num,
      Section: req.body.Section
    });

    await courseController.remove(course);
    res.status(200).send({ message: 'Removed course.' });
  } catch (err) {
    res.status(401).send({ message: err + '' });
  }
};
router.post('/remove', remove);

module.exports = router;
