import express from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { isAdmin, getName } from '../helpers/auth';
import { ISchedule } from '../interfaces/Schedule';

const router = express.Router();
const scheduleController: ScheduleController = new ScheduleController();

/**
 * Admin list entire schedule
 * Get the entire schedule that has been created from the database
 * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
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
    const response = await scheduleController.list();
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send('Error: ' + err);
  }
};
router.get('/list', list);

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

/**
 * Admin: triggers validate schedule
 *
 * @param {*} req
 * @param {*} res
 */
const validate_trigger = async (req, res) => {
  try {
    const id = req.query.id;
    const response = await scheduleController.validate(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/validate_trigger', validate_trigger);

/** teacher: get my schedule
 *  * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
 */
const my = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send({ message: 'This endpoint requires authorization header.' });
      return;
    }
    const authToken = req.headers.authorization;

    const userName = await getName(authToken);
    const response = await scheduleController.my(userName);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/my', my);

/**
 * Admin: update the entire schedule
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const update = async (req, res) => {
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
    let schedules = {} as ISchedule[];
    const numSchedules = req.body.length;
    for (let i = 0; i < numSchedules; i++) {
      schedules[i] = <ISchedule>req.body[i];
    }
    await scheduleController.update(schedules, numSchedules);
    res.status(200).send({ message: 'Updated schedule.' });
  } catch (err) {
    res.status(401).send({ message: 'Error creating schedule: ' + err });
  }
};
router.put('/', update);

module.exports = router;
