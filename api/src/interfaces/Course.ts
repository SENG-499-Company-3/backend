import { Document } from 'mongodb';

export interface ICourse extends Document {
  Subj: string;
  Num: Number;
  Section: string;
  Title: string;
  SchedType: string;
  Type: string;
  Cap: Number;
}
