import express from 'express';
import { CourseController } from '../controllers/course.controller';
import { isAdmin, getName } from '../helpers/auth';
import course from '../schemagen/schemas/course.json';
import { validate } from 'express-jsonschema';

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



//Add course
const add = async (req, res) => {
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
        const course_new = new Course({
            Subj: req.body.Subj,
            Num: req.body.Num,
            Section: req.body.Section,
            Title: req.body.Title,
            SchedType: req.body.SchedType,
            Cap: req.body.Cap 
          });
        await courseController.add(course_new);
        res.status(200).send({message: "Added course."});
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/add', validate({body: course}), add);


//Remove course
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
        await courseController.remove();
        res.status(200).send({message: "Removed course"});
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/remove',validate({body: course}), remove);



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
        await courseController.update();
        res.status(200).send({message: "Updated course."});
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/update', update);


module.exports = router;