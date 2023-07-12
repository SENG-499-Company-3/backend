import express from 'express';
import { CourseController } from '../controllers/course.controller';
import { isAdmin, getName } from '../helpers/auth';
import { validate } from 'express-jsonschema';

import courseValidate from '../schemagen/schemas/course.json';

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
const remove = async (req, res) => {
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
        const course_remove = new Course({
            Subj: req.body.Subj,
            Num: req.body.Num,
            Section: req.body.Section,
            Title: req.body.Title,
            SchedType: req.body.SchedType,
            Type: req.body.Type,
            Cap: req.body.Cap 
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

const update = async (req, res) => {
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
        const course_update = new Course({
            Subj: req.body.Subj,
            Num: req.body.Num,
            Section: req.body.Section,
            Title: req.body.Title,
            SchedType: req.body.SchedType,
            Type: req.body.Type,
            Cap: req.body.Cap 
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