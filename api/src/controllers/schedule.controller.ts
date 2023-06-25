import { ISchedule, Days } from '../interfaces/Schedule';
import { create_schedule } from '../helpers/createMockData';
import { IUser } from '../interfaces/User';

const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
const jwt_decode = require('jwt-decode');

/**
 * Schedule Controller
 *
 * @export
 * @class ScheduleController
 */
export class ScheduleController 
{

    /**
     * Creates a schedule (currently mock)
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
     * @param {string} authToken
     * @return {*}  {Promise<ISchedule[]>}
     * @memberof ScheduleController
     */
    async list(authToken: string): Promise<ISchedule[]>
    {
        let decoded_email = '';
        decoded_email = jwt_decode(authToken).email;
        if(!decoded_email) throw new Error("Invalid authentication token.");
        
        let user: IUser = {} as IUser;
        user = await User.findOne({ email: decoded_email }).catch((err) => err);

        if(user.role != "ADMIN") throw new Error ("Unauthorized; neeed Admin access.");

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
     * @param {string} authToken
     * @return {*}  {Promise<ISchedule[]>}
     * @memberof ScheduleController
     */
    async my(authToken: string): Promise<ISchedule[]>
    {
        let decoded_email = '';
        decoded_email = jwt_decode(authToken).email;
        if(!decoded_email) throw new Error("Invalid authentication token.");
        
        let user: IUser = {} as IUser;
        user = await User.findOne({email: decoded_email}).catch((err) => err);
        
        if(!user) throw new Error("Authentication token not tied to any user.");

        try 
        {
            console.log(user.name);
            const schedules: ISchedule[] = await Schedule.find({instructor: user.name}).catch((err) => err);
            return schedules;
        } catch (err)
        {
            throw new Error('Error while retrieving your schedule');
        }
    }

}
