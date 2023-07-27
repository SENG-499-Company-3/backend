import express from 'express';
import { CourseTermController } from '../controllers/courseTerm.controller';
import { isAdmin } from '../helpers/auth';

const router = express.Router();
const courseTermController: CourseTermController = new CourseTermController();
const Course = require('../models/course.model');
const Term = require('../models/term.model');


//get list of courses associated with given term id
const list = async (req, res) => {
    try{
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
        const courses = await courseTermController.list(req.body.term_id);
        return courses;
    } catch(err){
        res.status(401).send({message: err + ''});
    }
}

