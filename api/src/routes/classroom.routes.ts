import express from 'express';
import { ClassroomController } from '../controllers/classroom.controller';
import { isAdmin } from '../helpers/auth';

const ClassroomModel = require('../models/classroom.model');
const router = express.Router();
const classroomController: ClassroomController = new ClassroomController();

/**
 * Admin: adds classroom if doesn't exist, updates its capacity if it does
 *
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
    const classroom = new ClassroomModel({
      location: req.body.location,
      capacity: req.body.capacity,
      equipment: req.body.equipment
    });

    await classroomController.update(classroom);
    res.status(200).send('Updated/created classroom.');
  } catch (err) {
    res.status(401).send({ message: '' + err });
  }
};
router.post('/update', update);

/**
 *  Admin: list all classrooms
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
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
    const resp = await classroomController.list();
    res.status(200).send(resp);
  } catch (err) {
    res.status(401).send({ message: '' + err });
  }
};
router.get('/list', list);

module.exports = router;
