import { ISchedule } from '../interfaces/Schedule';
import { create_schedule } from '../helpers/createMockData';

const Schedule = require('../models/schedule.model');

/**
 * Schedule Controller
 *
 * @export
 * @class ScheduleController
 */
export class ScheduleController 
{

    /**
     * Creates a schedule (currently mock data)
     * @return {*}
     * @memberof ScheduleController
     */
    async create(): Promise<void> 
    {
        try
        {
            await create_schedule(10); //creates mock schedule
        } catch (err) 
        {
            throw new Error('Error creating schedule.');
        }
    }

    /**
     * Retrieves the entire schedule that was previously created
     * @return {*}  {Promise<ISchedule[]>}
     * @memberof ScheduleController
     */
    async list(): Promise<ISchedule[]>
    {

        try 
        {
            const schedules: ISchedule[] = await Schedule.find().catch((err) => err);
            return schedules;

        } catch (err)
        {
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
     * Replaces the entire schedule by the one provided
     * @param {ISchedule[]} schedules
     * @return {*} 
     * @memberof ScheduleController
     */
    async update(schedules: ISchedule[], numSchedules: number): Promise<void>
    {

        try 
        {
            await Schedule.deleteMany();
            console.log("Length: ");
            console.log(schedules.length);
            for(let i = 0; i < numSchedules ; i++)
            {
                const s = new Schedule(schedules[i]);
                console.log("Inside");
                // console.log(s.Begin);
                await s.save(s).catch((err) => err);
            }
            // await Schedule.insertMany(schedules).catch((err) => err);
            console.log("done");
        } catch (err)
        {
            throw new Error('Error while retrieving the entire schedule: '+err);
        }
    }

}
