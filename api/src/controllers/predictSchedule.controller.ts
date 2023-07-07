import axios from 'axios';

// import { ISchedule, Days } from '../interfaces/Schedule';
const Schedule = require('../models/classSizePrediction.model');

// include a function to handle the logic for predicting class sizes
// and also validate incoming payload according to the API spec
// and should generate the appropriate response payload based on the provided test data

/**
 * Schedule Controller
 *
 * @export
 * @class PredictScheduleController
 */
export class PredictScheduleController {
  /**
   * Predicts schedule based off three parameters
   *
   * @param {Array} coreq
   * @param {string} course
   * @param {Array} pastEnrol
   * @param {Array} prereq
   * @memberof PredictScheduleController
   */

  async class_size_prediction(): Promise<any> {
    const previousEnrolment = await Schedule.find().catch((err) => err);

    const algorithm2IP = process.env.ALGORITHM_2_IP || 'localhost';
    const algorithm2Port = process.env.ALGORITHM_2_PORT || '5000';

    const response = await axios
      .post(`${algorithm2IP}:${algorithm2Port}/schedule/predict_class_sizes`, {
        class_size_prediction: previousEnrolment
      })
      .catch((err) => err);

    return response;
  }
}
