import axios from 'axios';
import { courseData2023 } from '../models/data/algo2_courseData';

// import { ISchedule, Days } from '../interfaces/Schedule';
const classSizePrediction = require('../models/classSizePrediction.model');
const CourseModel = require('../models/course.model');
const TermModel = require('../models/term.model');

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

  async class_size_prediction(year: number): Promise<String> {
    // const previousEnrolment = await Schedule.find().catch((err) => err);
    const previousEnrolment = courseData2023;

    const algorithm2IP = process.env.ALGORITHM_2_IP || 'localhost';
    const algorithm2Port = process.env.ALGORITHM_2_PORT || '5000';

    const response = await axios
      .post(`http://${algorithm2IP}:${algorithm2Port}/schedule`, previousEnrolment)
      .catch((err) => err);

    for (const data of response.data) {
      let courseName = String(data.course.split(/(\d+)/)[0]).toUpperCase();
      let courseNum = data.course.split(/(\d+)/)[1];

      await CourseModel.findOne({ Subj: courseName, Num: courseNum })
        .then((res) => {
          data.course = res._id;
        })
        .catch((err) => console.log('err', err));

      let term = termConverter(data.term);
      await TermModel.findOne({ year: year, term: term })
        .then((res) => {
          data.term = res._id;
        })
        .catch((err) => console.log('err', err));
    }

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

  async get_class_size_prediction(): Promise<any> {
    const classSizePredictionData: any = await classSizePrediction
      .find()
      .populate('courses.term')
      .populate('courses.course')
      .catch((err) => err);

    return classSizePredictionData;
  }
}

const termConverter = (term: number) => {
  if (term == 1) {
    return 'Spring';
  } else if (term === 5) {
    return 'Summer';
  } else if (term === 9) {
    return 'Fall';
  }
};
