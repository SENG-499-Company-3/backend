import { Document } from 'mongodb';

// Placeholder for types I haven't come up with yet
type TODO = undefined;

// how many minutes a class can run for
type ClassLength = 50 | 80 | 180;

// what days is a class running
type ClassDays = 'MTW' | 'TH' | 'ONCE';

// range of time and day that a class or professor is available
type Availability = Array<{ day: Day; times: Array<TimeRange> }>;

// start and end of a time block
type TimeRange = { start: number; end: number };

type Day = 'Monday' | 'Tuesday' | 'Wednsday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Programs that our system is planned to support
type Program = 'SENG' | 'CSC' | 'ECE' | 'BIOMED';

export interface Room extends Document {
  name: string;
  size: number;
  speakerSystem: boolean;
  projector: boolean;
  cameras: boolean;
}

export interface Professor extends Document {
  name: string;
  timesICanTeach: Availability;
  timesIWant2Teach: Availability;
}

// interface SatisfiedCourse {
// 	course: Course;
// 	professor: Professor;
// 	room: Room;
// }

// TODO check that this starts after 8am and ends before 10pm
// const validClassTime( time: Availability ): boolean

export interface Course extends Document {
  name: string;
  inPerson: boolean;
  days: ClassDays;
  length: ClassLength;
  requiredFor: Array<Program>;
  weeksOffered: TODO;
}
