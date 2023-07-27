//create and add mock data to the database

const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
const teacherPrefSchema = require('../models/teacherpref.model');
const classroom = require('../models/classroom.model');

import { IUser } from '../interfaces/User';
import { courseScheduleData } from '../models/data/courseScheduleData';
import { teacherPrefData } from '../models/data/teacherPrefData';
import { userData } from '../models/data/userData';
import {static_courselist} from '../models/data/classroomStaticList';
import { hashPassword } from './auth';


// Create data for previous enrolment
export async function create_schedule() {
  courseScheduleData.forEach(async (data, index) => {
    Schedule.findOne({ course: data.Subj, term: data.Term }).then(async (schedule: any) => {
      if (!schedule) {
        Schedule.create(data)
          .then(() => {
            console.log('Schedule ' + index + ' created!');
          })
          .catch((err: any) => {
            console.log('Error creating schedules!', err);
          });
      }
    });
  });
}

export async function create_professors() {
  // Create a new User if one doesn't already exist
  userData.forEach(async (data, index) => {
    User.findOne({ email: data.email }).then(async (user: IUser) => {
      if (!user) {
        data.password = await hashPassword(data.password);
        User.create(data)
          .then(() => {
            console.log('User ' + index + ' created!');
          })
          .catch((err) => {
            console.log('Error creating users!', err);
          });
      }
    });
  });
}

export async function create_teacher_pref() {
  // Create new user preferences if one doesn't already exist
  teacherPrefData.forEach(async (data, index) => {
    teacherPrefSchema.findOne({ email: data.email }).then(async (pref: any) => {
      if (!pref) {
        teacherPrefSchema
          .create(data)
          .then(() => {
            console.log('TeacherPref ' + index + ' created!');
          })
          .catch((err: any) => {
            console.log('Error creating teacherPref!', err);
          });
      }
    });
  });
}

// Update the type definition for static_courselist
type Course = {
   location: string;
   capacity: number;
   equipment: never[];
 };
 
 export async function create_static_courselist() {
 
   // Iterate through the rooms array
   static_courselist.rooms.forEach(async (data, index) => {
     try {
       const existingclassroom = await classroom.findOne({ location: data.location, capacity: data.capacity });
 
       if (!classroom) {
         await classroom.create(data);
         console.log('Course List ' + index + ' created!');
       }
     } catch (err) {
       console.log('Error creating Course List!', err);
     }
   });
 }
 
