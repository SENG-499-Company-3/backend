import { ISchedule } from '../interfaces/Schedule';
import { IGeneratedSchedule } from '../interfaces/GeneratedSchedule';

import axios from 'axios';
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
        defaultPref = pref.prefData.map((element) => {
          return this.updatePreferences(defaultPref, element);
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

    const assignments: any = [];

    for (const assignment of response.data.assignments) {
      let assignmentIds = {
        course: null,
        prof: null,
        room: null,
        timeslot: assignment.timeslot
      };

      let subj = assignment.course.coursename.split(' ')[0];
      let num = assignment.course.coursename.split(' ')[1];

      await CourseModel.findOne({ Subj: subj, Num: num }).then((res) => {
        assignmentIds.course = res._id;
      });

      await UserModel.findOne({ name: assignment.prof.name }).then((res) => {
        assignmentIds.prof = res._id;
      });

      await ClassroomModel.findOne({ location: assignment.room.location }).then((res) => {
        assignmentIds.room = res._id;
      });

      assignments.push(assignmentIds);
    }

    const inputData = {
      rooms: response.data.inputData.rooms,
      timeslots: response.data.inputData.timeslots,
      courses: response.data.inputData.courses,
      professors: response.data.inputData.professors,
      dimensions: response.data.inputData.dimensions,
      preferences: response.data.inputData.preferences,
      loads: response.data.inputData.loads,
      required_courses: response.data.inputData.required_courses,
      p_tgt: response.data.inputData.p_tgt,
      max_iter: response.data.inputData.max_iter
    };

    const genSchedule = new generatedSchedule({
      assignments: assignments,
      valid: response.data.valid,
      complete: response.data.complete,
      reward: response.data.reward,
      iterations: response.data.iterations,
      c_hat: response.data.c_hat,
      quality: response.data.quality,
      inputData: inputData,
      rawAssignments: response.data.assignments
    });

    var id = genSchedule._id;

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

    let schedule: any;

    await generatedSchedule.findOne({ _id: id }).then(async (res) => {
      schedule = {
        assignments: res.rawAssignments,
        valid: res.valid,
        complete: res.complete,
        reward: res.reward,
        iterations: res.iterations,
        c_hat: res.c_hat,
        quality: res.quality,
        inputData: res.inputData
      };
    });

    const response = await axios.post(`http://${algorithm1IP}:${algorithm1Port}/schedule/validate`, schedule, {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        'content-type': 'application/json'
      }
    });

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
  async list(): Promise<any[]> {
    try {
      const schedules = await generatedSchedule
        .find()
        .populate('assignments.course')
        .populate('assignments.prof')
        .populate('assignments.room')
        .catch((err) => err);

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
