import express from 'express';
import { PredictScheduleController } from '../controllers/predictSchedule.controller';
import { isAdmin } from '../helpers/auth';

const router = express.Router();
const predictscheduleController: PredictScheduleController = new PredictScheduleController();

/**
 * Predict Class Size
 * include a function to handle the logic for predicting class sizes
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const predict_class_size_trigger = async (req, res) => {
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

    const response = await predictscheduleController.class_size_prediction(2023);

    res.status(200).send(response);
  } catch (err) {
    console.log('err', err);
    res.status(401).send({ message: err });
  }
};
router.get('/predict_class_size_trigger', predict_class_size_trigger);

/**
 * Get Predicted Class Size
 *
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
const get_class_size_prediction = async (req, res) => {
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

    const response = await predictscheduleController.get_class_size_prediction();
    
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.get('/class_size_prediction', get_class_size_prediction);

module.exports = router;
