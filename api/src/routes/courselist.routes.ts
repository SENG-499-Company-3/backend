import express from 'express';
import { CourseListController } from '../controllers/courselist.controller';
import { isAdmin, getName } from '../helpers/auth';
import { validate } from 'express-jsonschema';

import courseValidate from '../schemagen/schemas/courseid.json';
import type { Courseid as CourseValidate } from '../schemagen/types/courseid';

const router = express.Router();
const courseListController: CourseListController = new CourseListController();
const CourseList = require('../models/courseList.model');

/**
 * Admin: get list of all courses
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const list = async (req, res) => {
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

  try {
    const courses = await courseListController.list();
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/list', list);

/**
 * Admin: remove given course if exists
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const remove = async ({ headers, course }: { headers: any; course: CourseValidate }, res: any) => {
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

  try {
    const course_remove = new CourseList({
      location: course.location, 
      capacity: course.capacity, 
      equipment: course.equipment
    });
    await courseListController.remove(course_remove);
    res.status(200).send({ message: 'Removed room' });
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/remove', validate({ body: courseValidate }), remove);

/**
 * Admin: add course if doesn't exist, otherwise update course type and/or capacity
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */

const update = async ({ headers, course }: { headers: any; course: CourseValidate }, res: any): Promise<void> => {
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

  try {
    const course_update = new CourseList({
      location: course.location, 
      capacity: course.capacity, 
      equipment: course.equipment
    });
    await courseListController.update(course_update);
    res.status(200).send({ message: 'Updated room.' });
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/update', validate({ body: courseValidate }), update);
module.exports = router;
