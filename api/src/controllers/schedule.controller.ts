import { ISchedule } from '../interfaces/Schedule';
import axios from 'axios';
import { algo1_testData } from '../models/data/algo1_testData';
import { create_schedule } from '../helpers/createMockData';

const Schedule = require('../models/schedule.model');
const generatedSchedule = require('../models/generatedSchedule.model');

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
      await create_schedule(); //creates mock schedule
    } catch (err) {
      console.log("Error creating schedule");
      throw new Error('Error creating schedule.');
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
    async my(name: string): Promise<ISchedule[]>
    {
        try 
        {
            const schedules: ISchedule[] = await Schedule.find({Instructor: name}).catch((err) => err);
            return schedules;
        } catch (err)
        {
            throw new Error('Error while retrieving your schedule');
        }
    }
  

  /**
   * trigger the algorithm to create a schedule
   *
   * @return {*}  {Promise<String>}
   * @memberof ScheduleController
   */
  async trigger(): Promise<String> {
    const test = algo1_testData[0];

    const algorithm1IP = process.env.ALGORITHM_1_IP || 'localhost';
    const algorithm1Port = process.env.ALGORITHM_1_PORT || '5000';

    const response = await axios.post(`http://${algorithm1IP}:${algorithm1Port}/schedule/create`, test);

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

    await genSchedule
      .save()
      .then((res) => id = res._id)
      .catch((err) => console.log('err', err));


    return id;
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
    async update(schedules: ISchedule[], numSchedules: number): Promise<void>
    {

        try 
        {
            //delete current schedule and insert the new one
            await Schedule.deleteMany();
            for(let i = 0; i < numSchedules ; i++)
            {
                const s = new Schedule(schedules[i]);
                await s.save(s).catch((err) => err);
            }
        } catch (err)
        {
            throw new Error('Error while retrieving the entire schedule: '+err);
        }
    }

}
