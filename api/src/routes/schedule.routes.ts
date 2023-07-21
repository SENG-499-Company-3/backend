import express from 'express';
import { validate as validateEndpoint } from 'express-jsonschema';
import { validate } from 'jsonschema';
import inputData from '../schemagen/schemas/inputdata.json';
import schedule from '../schemagen/schemas/schedule.json';
import { ScheduleController } from '../controllers/schedule.controller';
import { isAdmin, getEmail } from '../helpers/auth';

const router = express.Router();
const scheduleController: ScheduleController = new ScheduleController();

/**
 * Admin: triggers build schedule
 * Make schedule by running the algorithms (currently just creates a mock schedule)
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const create = async (req, res) => {
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
    await scheduleController.create();
    // TODO clearly not following spec
    res.status(200).send(validate(schedule, 'Created schedule.'));
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/create', validateEndpoint({body: inputData}), create);

// TODO Pretty sure this is depreciated
/**
 * Admin list entire schedule
 * Get the entire schedule that has been created from the database
 * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
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
    const response = await scheduleController.list();
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send('Error: ' + err);
  }
};
router.get('/list', list);

// TODO Pretty sure this is depreciated
/** teacher: get my schedule
 *  * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
 */
const my = async (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: 'This endpoint requires authorization header.' });
    return;
  }
  const authToken = req.headers.authorization;

  try {
    const email = await getEmail(authToken);
    const response = await scheduleController.my(email);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/my', my);

// TODO add to api_schema.jso
/**
 * Admin: triggers build schedule
 *
 * @param {*} req
 * @param {*} res
 */
const generate_trigger = async (req, res) => {
  try {
    const response = await scheduleController.trigger();
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/generate_trigger', generate_trigger);

// TODO add to api_schema.jso
/**
 * Admin: triggers validate schedule
 *
 * @param {*} req
 * @param {*} res
 */
const validate_trigger = async (req, res) => {
  const id = req.param.id;
  try {
    const response = await scheduleController.validate(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/validate_trigger', validate_trigger);

module.exports = router;
