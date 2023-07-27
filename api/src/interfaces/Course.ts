import { Document } from 'mongodb';

export interface ICourse extends Document {
  Subj: string;
  Num: Number;
  Title: string;
  Year: Number;
  Term: String;
  Cap: Number;
  Enrolled: Number;
}
