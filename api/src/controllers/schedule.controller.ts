import { ISchedule, Days } from '../interfaces/Schedule';
import { create_schedule_one } from '../helpers/createMockData';

const Schedule = require('../models/schedule.model');


export class ScheduleController 
{

    /**
     * Creates a schedule 
     * 
     */
    async create(): Promise<void> 
    {
        try
        {
            await create_schedule_one(1);
        } catch (err) 
        {
            throw new Error('Error creating schedule.');
        }
    }

    /**
     * Retrieves the entire schedule that was previously created
     */
    async get_all(): Promise<ISchedule[]>
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
     * Retrieves the schedule of the specified teacher
     * 
     */
    // async get_one(): Promise<ISchedule>
    // {
    //     try 
    //     {
            
    //     } catch (err)
    //     {
    //         throw new Error('Error while retrieving your schedule');
    //     }
    // }

}
