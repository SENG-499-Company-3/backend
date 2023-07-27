import { ICourseList } from '../interfaces/CourseList';

const CourseList = require('../models/courseList.model');

/**
 * Lists course list with info such as location, capacity, and equipment
 * @export
 * @class CourseListController
 */
export class CourseListController {
   /**
    * @returns {*} {Promise<ICourseList[]>}
    * @memberof CourseListController
    */
   async list(): Promise<ICourseList[]> {
     try {
       const courses: ICourseList[] = await CourseList.find().catch((err) => err);
       return courses;
     } catch (err) {
       throw new Error('Error while retrieving courses list: ' + err);
     }
   }
 
   /**
    * remove the given course
    * @param {ICourseList} course
    * @returns {*} {Promise<ICourse[]>}
    * @memberof CourseListController
    */
   async remove(course: ICourseList): Promise<void> {
     try {
       await CourseList.deleteOne({ location: course.location, capacity: course.capacity, equipment: course.equipment }).catch((err) => err);
     } catch (err) {
       throw new Error('Error deleting room: ' + err);
     }
   }
 
   /**
    * insert/update the given course's capacity/type
    * @param {ICourseList} course
    * @returns {*} {Promise<ICourse[]>}
    * @memberof CourseListController
    */
   async update(course: ICourseList): Promise<void> {
     try {
       //if the given course exists, update it, otherwise insert a new one
 
       const course_db = new CourseList(course);
       const course_current = await CourseList.findOne({
         location: course.location,
         capacity: course.capacity,
         equipment: course.equipment
       }).catch((err) => err);
       if (!course_current) {
         //insert if the course doesn't exist
         await course_db.save(course_db).catch((err) => err);
       } //replace if exists
       else {
         const doc = await CourseList.findOne({ location: course.location, capacity: course.capacity, equipment: course.equipment }).catch(
           (err) => err
         );
         doc.overwrite(course_db);
         await doc.save();
       }
     } catch (err) {
       throw new Error('Error updating course: ' + err);
     }
   }
 }
 