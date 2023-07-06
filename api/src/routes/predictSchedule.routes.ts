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
    res.status(400).send({ message: 'Unable to predict class size'});
    return;
  }

  const { coreq,course, pastEnrol, prereq} = req.body;

  try {
    const response = await predictscheduleController.class_size_prediction(coreq, course, pastEnrol, prereq);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err });
  }
};
router.post('/predict_class_sizes', predict_class_sizes);

module.exports = router;
