import express from 'express';
import { TermsController } from '../controllers/term.controller';
import { isAdmin } from '../helpers/auth';
import { validate } from 'express-jsonschema';
import courseValidate from '../schemagen/schemas/courseid.json';
import type { Courseid as CourseValidate } from '../schemagen/types/courseid';


const router = express.Router();
const termsController: TermsController = new TermsController();
const TermModel = require('../models/term.model');


//Get list of terms
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
    const courses = await termsController.list();
    res.status(200).send(courses);
  } catch (err) {
    res.status(401).send({ message: err });
  }
}
router.get('/list', list);


module.exports = router;
