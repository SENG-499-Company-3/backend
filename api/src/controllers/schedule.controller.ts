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

}
