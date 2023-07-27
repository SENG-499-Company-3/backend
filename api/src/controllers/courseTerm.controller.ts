import { ICourseTerm } from '../interfaces/CourseTerm';
import { ICourse } from '../interfaces/Course';

const CourseTermModel = require('../models/courseTerm.model');
const CourseModel = require('../models/course.model');


export class CourseTermController {
    async list(term_id: string): Promise<ICourse[]> {
        try {

            //get course_ids for this term
            const courses_thisTerm: ICourseTerm[] = await CourseTermModel
            .find({term_id: term_id})
                .catch((err) => err);
            
            //get courses associated with those ids
            var cid_list: String[] = [];
            courses_thisTerm.forEach( (ct) => {
                cid_list.push(ct.course_id);
            });
            cid_list = [...cid_list];

            const courses: ICourse[] = await CourseModel
                .find({ course_id: { $in: cid_list } })
                .catch((err) => err);
            
            
            return courses;
          } catch (err) {
            throw new Error('Error while retrieving courses list: ' + err);
          }
    }
}