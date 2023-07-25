import axios from 'axios';
import { courseData2023 } from '../models/data/courseData';

// import { ISchedule, Days } from '../interfaces/Schedule';
const classSizePrediction = require('../models/classSizePrediction.model');

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

  async class_size_prediction(): Promise<String> {
    // const previousEnrolment = await Schedule.find().catch((err) => err);
    const previousEnrolment = courseData2023[0];

    const algorithm2IP = process.env.ALGORITHM_2_IP || 'localhost';
    const algorithm2Port = process.env.ALGORITHM_2_PORT || '5000';

    const response = await axios
      .post(`http://${algorithm2IP}:${algorithm2Port}/schedule`, previousEnrolment)
      .catch((err) => err);

    const newClassSizePrediction = new classSizePrediction({
      courses: response.data
    });

    var id = newClassSizePrediction._id;

    await newClassSizePrediction
      .save()
      .then((res) => (id = res._id))
      .catch((err) => console.log('err', err));

    return id;
  }
}
