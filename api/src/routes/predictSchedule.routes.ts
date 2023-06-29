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
const predict_class_sizes = async (req, res) => {
  // Validate request
  if (!req.body.courses || !req.body.csc_to_seng_ratio || !req.body.class_year_split) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const { courses, csc_to_seng_ratio, class_year_split } = req.body;

  try {
    const response = await predictscheduleController.predict_class_sizes(courses, csc_to_seng_ratio, class_year_split);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/schedule/predict_class_sizes', predict_class_sizes);

module.exports = router;
