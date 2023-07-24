import express from 'express';
import { TeacherPrefController } from '../controllers/teacherpref.controller';
import { isAdmin, getEmail, getUid } from '../helpers/auth';
import { validate } from 'express-jsonschema';
import bodyParser from 'body-parser';
import jwt from '../schemagen/schemas/jwt.json';
import teacherPref from '../schemagen/schemas/teacherpreferenceform.json';
import type { Teacherpreferenceform } from '../schemagen/types/teacherpreferenceform';

const router = express.Router();
const teacherPrefController: TeacherPrefController = new TeacherPrefController();
router.use(bodyParser.json());

/**
 * Teacher: Update this teacher's preferences (or create it if it doesn't exist)
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const update = async ({ headers, body }: { headers: any, body: Teacherpreferenceform }, res: any) => {
  if (!headers.authorization) {
    res.status(400).send({ message: 'This endpoint requires authorization header.' });
    return;
  }
  if (!body._id || !body.email || !body.courses || !body.start || !body.end ) {
    res.status(400).send({ message: 'Need to provide all information to update teacher preference.' });
    return;
  }

  const authToken = headers.authorization;
  const uid = body._id;
  const email = body.email;
  const courses = body.courses;
  const start = body.start;
  const end = body.end;
  const peng = body.peng;

  try {
    //check user is authorized
    const email_verified = await getEmail(authToken);
    if (email != email_verified) throw new Error('Provided email not associated with given auth token.');

    await teacherPrefController.update(uid, email, courses, start, end, peng);
    res.status(200).send('Updated teacher preference.');
  } catch (err) {
    res.status(401).send({ message: 'Error updating teacher preference:' + err });
  }
};
router.post('/update', validate({body: teacherPref, headers:  { ...jwt } }), update);

/**
 * Admin: get list of all teachers' preferences
 * @param {*} req
 * @param {*} res
 * @return {*} ITeacherPref[]
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
    const response = await teacherPrefController.list();
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: "Error retrieving all teachers' prefernces " + err });
  }
};
router.get('/list', list);

/**
 * Teacher: get this teacher's preferences
 * @param {*} req
 * @param {*} res
 * @return {*} ITeacherPref
 */
const my = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'This endpoint requires authorization header.' });
    return;
  }
  const authToken = req.headers.authorization;

  try {
    const email = await getEmail(authToken);
    const uid = await getUid(authToken);
    const response = await teacherPrefController.my(email, uid);
    res.status(200).send(response);
  } catch (err) {
    console.log("Error teacherpref/my: " + err);
    res.status(401).send('Error retrieving teacher preference.');
  }
};
router.get('/my', my);


//get teacherpre by id
const byId = async (req, res) => {
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
  if(!req.query.id)
  {
    res.status(400).send({message: 'Need to provide user id'});
    return;
  }
  try
  {
    const teacherPref = await teacherPrefController.byId(req.query.id);
    res.status(200).send(teacherPref);
  } catch(err)
  {
    res.status(400).send({message: '' + err});
  }
}
router.get('', byId)

module.exports = router;
