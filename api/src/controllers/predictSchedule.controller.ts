// import { ISchedule, Days } from '../interfaces/Schedule';
const Schedule = require('../models/schedpredict.model');

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

  async class_size_prediction(coreq: string, course: string, pastEnrol: string, prereq: string): Promise<void> {
    const class_sizes = new Schedule({
      coreq: coreq,
      course: course,
      pastEnrol: pastEnrol,
      prereq: prereq,
    });
    return class_sizes;
  }

  async predicted_class_size(course: string, size: number, constraints: string, term: number) {

   return
  }
}
