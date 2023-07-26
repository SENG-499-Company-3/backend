//create and add mock data to the database

const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
const teacherPrefSchema = require('../models/teacherpref.model');
const TermModel = require('../models/term.model');

const jwt = require('jsonwebtoken');
import { IUser } from '../interfaces/User';
import { ITerm } from '../interfaces/Term'
import { courseScheduleData } from '../models/data/courseScheduleData';
import { teacherPrefData } from '../models/data/teacherPrefData';
import { userData } from '../models/data/userData';
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
        // data.token = jwt.sign({email: data.email}, "secret");
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

export async function populate_terms()
{
  const terms: ITerm[] = [{id: 1, year: 2023, month: 5},
    {id: 2, year: 2023, month: 9},
    {id: 3, year: 2024, month: 1},
    {id: 4, year: 2024, month: 5},
    {id: 5, year: 2024, month: 9},
    {id: 6, year: 2024, month: 1}];
  
  terms.forEach(async (term, index) => {
    TermModel.findOne({id: term.id}).then(async (t: ITerm) => {
      if(!t)
      {
        TermModel.create(term).then(() => {
          console.log('Term created ' + term.year + ", " + term.month);
        }).catch(((err: any) => {
          console.log('Error populating terms: ' + err);
        }));
      }
    })

  })
  
}
