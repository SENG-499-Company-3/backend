import { Document } from 'mongodb';

export interface ITerm extends Document {
  year: Number;
  month: Number;
}
