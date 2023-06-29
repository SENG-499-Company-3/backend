// import { ISchedule, Days } from '../interfaces/Schedule';
import { create_schedule } from '../helpers/createMockData';

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
   * Creates a schedule (currently mock data)
   * @return {*}
   * @memberof PredictScheduleController
   */
  async create(): Promise<void> {
    try {
      await create_schedule(10); //creates mock schedule
    } catch (err) {
      throw new Error('Error creating schedule.');
    }
  }

  /**
   * Predicts schedule based off three parameters
   *
   * @param {string} courses[]
   * @param {string} csc_to_seng_ratio
   * @param {string} class_year_split
   * @memberof PredictScheduleController
   */

  async predict_class_sizes(courses: string, csc_to_seng_ratio: string, class_year_split: string): Promise<void> {
    const class_sizes = new Schedule({
      courses: courses,
      csc_to_seng_ratio: csc_to_seng_ratio,
      class_year_split: class_year_split
    });
    return class_sizes;
  }
}
