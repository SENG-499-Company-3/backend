import { Document } from 'mongodb';


export interface ISchedule extends Document
{
    term: string,
    course: String,
    section: String,
    instructor: String,
    capacity: String,
    location: String,
    days: Days,
    start: String,
    end: String, 
}

export type Days = "MONDAY" | "TUESDAY"| "WEDNESDAY"| "THURSDAY"| "FRIDAY";