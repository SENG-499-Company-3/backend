import { ISchedule } from '../interfaces/Schedule';
import { IGeneratedSchedule } from '../interfaces/GeneratedSchedule';

import axios from 'axios';
import { algo1_mapping } from '../models/data/algo1_testData';
import { algo1Data } from '../models/data/algo1_Data';

const Schedule = require('../models/schedule.model');
const generatedSchedule = require('../models/generatedSchedule.model');
const ClassroomModel = require('../models/classroom.model');
const CourseModel = require('../models/course.model');
const UserModel = require('../models/user.model');
const teacherPrefModel = require('../models/teacherpref.model');
/**
 * Schedule Controller
 *
 * @export
 * @class ScheduleController
 */
export class ScheduleController {
  /**
   * Creates a schedule (currently mock data)
   * @return {*}
   * @memberof ScheduleController
   */
  async create(): Promise<void> {
    try {
      // await create_schedule(); //creates mock schedule\
      const algo1_output = await this.trigger();
      const assignments = algo1_output.assignments;

      //convert schedule into proper form
      const schedules = await this.asg_to_schedule(assignments);

      //replace current schedule with the new one schedule in database
      console.log('Schedule length is ' + schedules.length);
      await this.update(schedules, schedules.length);
    } catch (err) {
      console.log('Error creating schedule', err);
      throw new Error('Error creating schedule.');
    }
  }

  //converts assignments[][] to list of schedules
  async asg_to_schedule(assignments: number[][]): Promise<ISchedule[]> {
    const course_mapping = algo1_mapping.courses;
    const time_mapping = algo1_mapping.timeslots;
    const teacher_mapping = algo1_mapping.teacher;

    let schedules: ISchedule[] = [];
    for (var asg of assignments) {
      //get days, begin, and end
      const times = time_mapping[asg[1] % 16].split(' ');
      const days = times[0];
      let begin = times[1];
      begin = begin.replace(':', '');
      let begin_num = parseInt(begin);
      let end = times[2];
      end = end.replace(':', '');
      let end_num = parseInt(end);

      //get subj and num
      const subj_full = course_mapping[asg[0] % 100].split(' ');
      const subj = subj_full[0];
      const num = subj_full[1];
      const num_n = parseInt(num);

      let s: ISchedule = {
        Term: 1,
        Subj: subj,
        Num: num_n,
        Section: 'A01',
        Title: 'Programming practices',
        SchedType: 'LEC',
        Instructor: teacher_mapping[asg[2] % 120],
        Bldg: 'ECS',
        Room: 'xxx',
        Begin: begin_num,
        End: end_num,
        Days: days,
        StartDate: 'Sep 7, 2023',
        EndDate: 'Dec 16, 2023',
        Cap: 50
      };
      console.log('S is: ');
      console.log(s);
      schedules.push(s);
    }

    return schedules;
  }

  async createInputData(): Promise<any> {
    const classes = await ClassroomModel.find();

    const cleanClasses = classes.map((classroom) => {
      return {
        location: classroom.location,
        capacity: classroom.capacity
      };
    });

    const courses = await CourseModel.find();

    const cleanedCourses = courses.map((course) => {
      return {
        coursename: course.Subj + ' ' + course.Num,
        courseYear: course.CourseYear,
        courseNumber: course.Num,
        capacity: course.Cap,
        index: null
      };
    });

    const timeslots = await algo1Data.timeslots;

    const teachers = await UserModel.find();

    const teacherPrefs = await teacherPrefModel.find();

    const cleanPrefs: any = [];
    for (const teacherPref of teacherPrefs) {
      const cleanPrefData: any = [];
      for (const coursePref of teacherPref.coursePreferences) {
        cleanPrefData.push({
          courseName: coursePref.courseName,
          courseNumber: Number(String(coursePref.courseName).split(' ')[1]),
          courseYear: coursePref.courseYear,
          value: this.prefConverter(coursePref)
        });
      }

      cleanPrefs.push({
        email: teacherPref.email,
        load: teacherPref.load,
        availablity: teacherPref.availability,
        prefData: cleanPrefData
      });
    }

    const cleanedProfessors: any = [];

    for (const teacher of teachers) {
      const pref = cleanPrefs.find((pref) => pref.email === teacher.email);
      if (
        pref &&
        pref.availability &&
        pref.availablity[0] &&
        pref.availablity[0].term.year === 2023 &&
        pref.availablity[0].isAvailable === false
      ) {
        continue;
      }

      let defaultPref = this.courseDefaultPrefLoad(cleanedCourses);

      if (pref && pref.prefData && pref.prefData.length > 0) {
        defaultPref = pref.prefData.map( (element) => {
          return  this.updatePreferences(defaultPref, element);
        });
        defaultPref = defaultPref[0];
      }
      cleanedProfessors.push({
        name: teacher.name,
        coursePreferences: defaultPref,
        load: (pref && pref.load) || 0,
        index: null
      });
    }

    const dimensions = {
      courses: cleanedCourses.length,
      times: timeslots.length,
      teachers: cleanedProfessors.length,
      rooms: classes.length
    };

    const data = {
      rooms: cleanClasses,
      timeslots: timeslots,
      courses: cleanedCourses,
      professors: cleanedProfessors,
      dimensions: dimensions,
      preferences: [],
      loads: [],
      required_courses: [],
      p_tgt: 4,
      max_iter: 250
    };

    return data;
  }

  updatePreferences = (defaultPref: any, newPrefValue: any) => {
    const objIndex = defaultPref.findIndex((obj: any) => obj.courseName === newPrefValue.courseName);
    if (objIndex !== -1) {
      defaultPref[objIndex].value = newPrefValue.value;
    }
    return defaultPref;
  };

  courseDefaultPrefLoad = (cleanedCourses: any[]) => {
    const coursePrefs: any = [];

    for (const course of cleanedCourses) {
      coursePrefs.push({
        courseName: course.coursename,
        courseNumber: course.courseNumber,
        courseYear: course.courseYear,
        value: 0
      });
    }

    return coursePrefs;
  };

  prefConverter = (pref: { courseId: number; ability: string; willingness: string }) => {
    switch (pref.ability) {
      case 'ABLE':
        switch (pref.willingness) {
          case 'WILLING':
            return 4;
          case 'UNWILLING':
            return 2;
          case 'VERY_WILLING':
            return 6;
        }
        break;
      case 'WITH_DIFFICULTY':
        switch (pref.willingness) {
          case 'WILLING':
            return 3;
          case 'UNWILLING':
            return 1;
          case 'VERY_WILLING':
            return 5;
        }
        break;
    }
  };
  /**
   * trigger the algorithm to create a schedule
   *
   * @return {*}  {Promise<IGeneratedSchedule>}
   * @memberof ScheduleController
   */
  async trigger(): Promise<IGeneratedSchedule> {
    const data = await this.createInputData();
    console.log('data', JSON.stringify(data));

    const algorithm1IP = process.env.ALGORITHM_1_IP || 'localhost';
    const algorithm1Port = process.env.ALGORITHM_1_PORT || '8000';

    const response = await axios.post(`http://${algorithm1IP}:${algorithm1Port}/schedule/create`, data, {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        'content-type': 'application/json'
      }
    });
    console.log('response', response);

    const genSchedule = new generatedSchedule({
      assignments: response.data.assignments,
      valid: response.data.valid,
      complete: response.data.complete,
      reward: response.data.reward,
      iterations: response.data.iterations,
      c_hat: response.data.c_hat,
      quality: response.data.quality
    });

    var id = genSchedule._id;
    console.log('id', id);

    await genSchedule
      .save()
      .then((res) => (id = res._id))
      .catch((err) => console.log('err', err));

    return genSchedule;
  }

  /**
   * trigger validation of a schedule
   *
   * @param {string} id
   * @return {*}  {Promise<String>}
   * @memberof ScheduleController
   */
  async validate(id: string): Promise<String> {
    const algorithm1IP = process.env.ALGORITHM_1_IP || 'localhost';
    const algorithm1Port = process.env.ALGORITHM_1_PORT || '5000';

    const response = await axios.post(`http://${algorithm1IP}:${algorithm1Port}/schedule/validate`, { id: id });

    return response.data.valid;
  }

  /**
   * Replaces the entire schedule by the one provided
   * @param {ISchedule[]} schedules
   * @param {string} numSchedules
   * @return {*}
   * @memberof ScheduleController
   */
  async update(schedules: ISchedule[], numSchedules: number): Promise<void> {
    try {
      //delete current schedule and insert the new one
      await Schedule.deleteMany();
      for (let i = 0; i < numSchedules; i++) {
        const s = new Schedule(schedules[i]);
        await s.save(s).catch((err) => {
          console.log('Error saving schedule', err);
          return;
        });
      }
    } catch (err) {
      throw new Error('Error while retrieving the entire schedule: ' + err);
    }
  }

  /**
   * Retrieves the entire schedule that was previously created
   * @return {*}  {Promise<ISchedule[]>}
   * @memberof ScheduleController
   */
  async list(): Promise<ISchedule[]> {
    try {
      const schedules: ISchedule[] = await Schedule.find().catch((err) => err);
      return schedules;
    } catch (err) {
      throw new Error('Error while retrieving the entire schedule');
    }
  }

  /**
   * Retrieves the schedule of the teacher to whom the authToken belongs to
   * @param {string} name
   * @return {*}  {Promise<ISchedule[]>}
   * @memberof ScheduleController
   */
  async my(name: string): Promise<ISchedule[]> {
    try {
      const schedules: ISchedule[] = await Schedule.find({ Instructor: name }).catch((err) => err);
      return schedules;
    } catch (err) {
      throw new Error('Error while retrieving your schedule');
    }
  }
}
