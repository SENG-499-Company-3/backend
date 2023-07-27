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

  async class_size_prediction(): Promise<String> {
    // const previousEnrolment = await Schedule.find().catch((err) => err);
    const previousEnrolment = courseData2023;

    const algorithm2IP = process.env.ALGORITHM_2_IP || 'localhost';
    const algorithm2Port = process.env.ALGORITHM_2_PORT || '5000';


    const response = await axios
      .post(`http://${algorithm2IP}:${algorithm2Port}/schedule`, previousEnrolment)
      .catch((err) => err);

    for( const data of response.data) {

      console.log(data);

      let courseName = data.course.split(/(\d+)/)[0];
      console.log('courseName', courseName);
      let courseNum = data.course.split(/(\d+)/)[1];
      console.log('courseNum', courseNum);
      let term = data.term;
      console.log('term', term);

      await CourseModel
        .findOne({Subj: courseName, Num: courseNum})
        .then((res) => {
          data.course = res._id;
        })
        .catch((err) => console.log('err', err));

      await TermModel
        .findOne({ month: term})
        .then((res) => {
          data.term = res.id;
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

  async get_class_size_prediction(): Promise<String> {
    const classSizePredictionData = await classSizePrediction
      .find()
      .catch((err) => err);

    return classSizePredictionData;
  }
}
