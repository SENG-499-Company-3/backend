import express from 'express';
import { ScheduleController } from '../controllers/schedule.controller';
import { isAdmin } from '../helpers/auth';

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

module.exports = router;
