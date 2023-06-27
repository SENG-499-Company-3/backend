import { Document } from 'mongodb';

export interface ITeacherPref extends Document {
    email: string,
    courses: [string],
    start: string,
    end: string,
    peng: string
}
