import { Document } from 'mongodb';

export interface ITeacherPref extends Document {
    _id: string,
    email: string,
    courses: [string],
    start: string,
    end: string,
    peng: string,
}
