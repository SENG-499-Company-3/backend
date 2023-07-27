import { ICourse } from '../interfaces/Course';

const Course = require('../models/course.model');

/**
 * Entity lists controller. Lists entities such as course list, teacher list
 * @export
 * @class CourseController
 */
export class CourseController {
  /**
   * @returns {*} {Promise<ICourse[]>}
   * @memberof CourseController
   */
  async list(): Promise<ICourse[]> {
    try {
      const courses: ICourse[] = await Course.find().catch((err) => err);
      return courses;
    } catch (err) {
      throw new Error('Error while retrieving courses list: ' + err);
    }
  }

  /**
   * add the given course
   * @param {ICourse} course
   * @returns {*} {Promise<ICourse[]>}
   * @memberof CourseController
   */
  async create(course: ICourse): Promise<void> {
    try {
      //if the given course exists, update it, otherwise insert a new one

      const course_db = new Course(course);
      const course_current = await Course.findOne({
        Subj: course.Subj,
        Num: course.Num,
        Section: course.Section
      }).catch((err) => err);
      if (!course_current) {
        //insert if the course doesn't exist
        await course_db.save(course_db).catch((err) => console.log('error saving course' + err));
      } else {
        //throw error if it already exists
        throw new Error('Course already exists.');
        // replace if exists
        // const doc = await Course.findOne({ Subj: course.Subj, Num: course.Num, Section: course.Section }).catch(
        //   (err) => console.log("Error adding corurse" + err)
        // );
        // doc.overwrite(course_db);
        // await doc.save();
      }
    } catch (err) {
      throw new Error(err + '');
    }
  }
}
