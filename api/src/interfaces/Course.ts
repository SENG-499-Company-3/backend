import { Document } from 'mongodb';

export interface ICourse extends Document {
  Subj: string;
  Num: Number;
  Title: string;
  CourseYear: Number;
  Cap: Number;
  Enrolled: Number;
}
