import { Document } from 'mongodb';

export interface ISchedule extends Document {
  Term: Number;
  Subj: string;
  Num: Number;
  Section: string;
  Title: string;
  SchedType: string;
  Instructor: string;
  Bldg: string;
  Room: string;
  Begin: Number;
  End: Number;
  Days: string;
  StartDate: string;
  EndDate: string;
  Cap: Number;
}
