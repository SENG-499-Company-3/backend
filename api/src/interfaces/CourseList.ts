import { Document } from 'mongodb';

export interface ICourseList extends Document {
   location: string
   capacity: number;
   equipment: string[];
 }

 