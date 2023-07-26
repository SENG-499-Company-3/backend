import { Document } from 'mongodb';

export interface ITerm extends Document {
  id: Number;
  year: Number;
  month: Number;
}
