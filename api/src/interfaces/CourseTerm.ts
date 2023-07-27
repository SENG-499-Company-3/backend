import { Document } from 'mongodb';

export interface ICourseTerm extends Document {
course_id: String;
term_id: String;
}
