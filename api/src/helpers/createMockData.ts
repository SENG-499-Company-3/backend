//create and add mock data to the database

const User = require('../models/user.model');
const teacherPrefSchema = require('../models/teacherpref.model');
const TermModel = require('../models/term.model');
const CourseModel = require('../models/course.model');
const classroom = require('../models/classroom.model');

import { IUser } from '../interfaces/User';
import { ITerm } from '../interfaces/Term';
import { ICourse } from '../interfaces/Course';
import { teacherPrefData } from '../models/data/teacherPrefData';
import { userData } from '../models/data/userData';
import { hashPassword } from './auth';
import { static_classroom_list } from '../models/data/classroomData';
import { courseData } from '../models/data/courseData';

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

export async function populate_terms() {
  const terms: ITerm[] = [
    { year: 2023, term: 'Fall' },
    { year: 2023, term: 'Summer' },
    { year: 2023, term: 'Spring' },
    { year: 2024, term: 'Fall' },
    { year: 2024, term: 'Summer' },
    { year: 2024, term: 'Spring' },
    { year: 2022, term: 'Fall' },
    { year: 2022, term: 'Summer' },
    { year: 2022, term: 'Spring' },
    { year: 2021, term: 'Fall' },
    { year: 2021, term: 'Summer' },
    { year: 2021, term: 'Spring' },
    { year: 2020, term: 'Fall' },
    { year: 2020, term: 'Summer' },
    { year: 2020, term: 'Spring' },
    { year: 2019, term: 'Fall' },
    { year: 2019, term: 'Summer' },
    { year: 2019, term: 'Spring' }
  ];

  terms.forEach(async (term) => {
    TermModel.findOne({ year: term.year, term: term.term }).then(async (t: ITerm) => {
      if (!t) {
        TermModel.create(term)
          .then(() => {
            console.log('Term created ' + term.year + ', ' + term.term);
          })
          .catch((err: any) => {
            console.log('Error populating terms: ' + err);
          });
      }
    });
  });
}

export async function populate_courses() {
  courseData.forEach(async (data, index) => {
    let Subj = data.Course.split(' ')[0];
    let Num = Number(data.Course.split(' ')[1]);

    let course: ICourse = {
      Subj: Subj,
      Num: Num,
      Title: data.Title,
      CourseYear: data.ClassYr,
      Cap: data.Cap,
      Enrolled: data.Enrolled
    };

    CourseModel.findOne({ Subj: Subj, Num: Num, CourseYear: data.ClassYr }).then(async (c: ICourse) => {
      if (!c) {
        CourseModel.create(course)
          .then(() => {
            console.log('Course ' + index + ' created!');
          })
          .catch((err: any) => {
            console.log('Error creating course!', err);
          });
      }
    });
  });
}

export async function populate_classrooms() {
  // Iterate through the rooms array
  static_classroom_list.rooms.forEach(async (data, index) => {
    classroom
      .findOne({ location: data.location, capacity: data.capacity })
      .then(async (c: any) => {
        if (!c) {
          classroom.create(data);
          console.log('Class ' + index + ' created!');
        }
      })
      .catch((err: any) => {
        console.log('Error creating class!', err);
      });
  });
}
