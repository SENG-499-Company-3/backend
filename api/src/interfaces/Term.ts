import { Document } from 'mongodb';

export interface ITerm extends Document {
  year: Number;
  term: String;
}
