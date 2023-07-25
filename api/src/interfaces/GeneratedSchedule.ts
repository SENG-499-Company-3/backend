import { Document } from 'mongodb';

export interface IGeneratedSchedule extends Document {
  assignments: number[][];
  valid: boolean;
  complete: boolean;
  reward: number;
  iterations: number;
  c_hat: number;
  quality: number;
}
