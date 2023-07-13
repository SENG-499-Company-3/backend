import express from 'express';
import { PredictScheduleController } from '../controllers/predictSchedule.controller';

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
    const response = await predictscheduleController.class_size_prediction();
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/predict_class_size_trigger', predict_class_size_trigger);

module.exports = router;
