import { Document } from 'mongodb';

export interface IClassroom extends Document {
  location: string;
  capacity: number;
  equipment: string[];
}
