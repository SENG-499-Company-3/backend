import express from 'express';
import { CourseController } from '../controllers/course.controller';
import { isAdmin, getName } from '../helpers/auth';
import { validate } from 'express-jsonschema';

import courseValidate from '../schemagen/schemas/courseid.json';
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
    if(!req.headers.authorization)
    {
        res.status(401).send({ message: "This endpoint requires authorization header."});
        return;
    }
    const authToken = req.headers.authorization;
    const isAdm = await isAdmin(authToken);
    if(!isAdm) 
    {
        res.status(401).send({message: "Need admin access."});
        return;
    }

    try
    {
        const courses = await courseController.list();
        res.status(200).send(courses);
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/list', list);


/**
 * Admin: remove given course if exists
 * @param {*} req 
 * @param {*} res 
 * @returns {*}
 */
const remove = async ({headers, course}: {headers: any, course: CourseValidate}, res: any) => {
    if(!headers.authorization)
    {
        res.status(401).send({ message: "This endpoint requires authorization header."});
        return;
    }
    const authToken = headers.authorization;
    const isAdm = await isAdmin(authToken);
    if(!isAdm)
    {
        res.status(401).send({message: "Need admin access."});
        return;
    }

    try
    {
        const course_remove = new Course({
            Subj: course.Subj,
            Num: course.Num,
            Section: course.Section,
            Title: course.Title,
            SchedType: course.SchedType,
            Type: course.Type,
            Cap: course.Cap
          });
        await courseController.remove(course_remove);
        res.status(200).send({message: "Removed course"});
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/remove',validate({body: courseValidate}), remove);


/**
 * Admin: add course if doesn't exist, otherwise update course type and/or capacity
 * @param {*} req 
 * @param {*} res 
 * @returns {*}
 */

const update = async ({headers, course }: {headers: any, course: CourseValidate }, res: any): Promise<void> => {
    if(!headers.authorization)
    {
        res.status(401).send({ message: "This endpoint requires authorization header."});
        return;
    }
    const authToken = headers.authorization;
    const isAdm = await isAdmin(authToken);
    if(!isAdm) 
    {
        res.status(401).send({message: "Need admin access."});
        return;
    }

    try
    {
        const course_update = new Course({
            Subj: course.Subj,
            Num: course.Num,
            Section: course.Section,
            Title: course.Title,
            SchedType: course.SchedType,
            Type: course.Type,
            Cap: course.Cap
          });
        await courseController.update(course_update);
        res.status(200).send({message: "Updated course."});
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/update', validate({body: courseValidate}), update);
module.exports = router;
