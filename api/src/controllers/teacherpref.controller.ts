import { ITeacherPref } from '../interfaces/TeacherPref';
import { getUser } from '../helpers/auth';

const TeacherPref = require('../models/teacherpref.model');


/**
 * Teacher preferences controller
 * @export
 * @class TeacherPrefController
 */
export class TeacherPrefController
{
    /**
     * Updates the user's preferences (or creates if it doesn't already exist)
     * @param {string} authToken 
     * @param {string} email 
     * @param {string} courses 
     * @param {string} start 
     * @param {string} end 
     * @param {string} peng 
     * @return {*} {Promise<void>}
     * @memberof TeacherPrefController
     */
    async update(authToken: string, email: string, courses: string[], start: string, end: string, peng: string): Promise<void>
    {
        let user = await getUser(authToken);
        //await TeacherPref.deleteMany();
        //return;
        if(user.email != email)
        {
            throw new Error("Provided email does not match the email associated with the auth token.");
        }

        try
        {
            //try finding the teacher's current preference
            
            const pref = new TeacherPref({
                email: email,
                courses: courses,
                start: start,
                end: end,
                peng: peng
            });
            const pref_curr = await TeacherPref.findOne({email: email}).catch((err) => err);
            if(!pref_curr) //insert if doesn't exist
            {
                await pref.save(pref).catch((err) => err);
            } else //replace if already exists
            {
                const doc = await TeacherPref.findOne({email: email}).catch((err) => err);
                doc.overwrite(pref);
                await doc.save();
            }
        } catch (err) 
        {
            console.log(err);
            throw new Error('Error updating teacher preference.');
        }
    }
    
    /**
     * Get teacher preference of all teachers
     * @param {string} authToken 
     * @returns {Promise<ITeacherPref[]}
     * @memberof TeacherPrefController
     */
    async list(authToken: string): Promise<ITeacherPref[]>
    {
        let user = await getUser(authToken);
        if(user.role != "ADMIN") throw new Error("Unaurhoized; need Admin access.");
        try 
        {
            const prefs: ITeacherPref[] = await TeacherPref.find().catch((err) => err);
            return prefs;

        } catch (err)
        {
            throw new Error('Error while retrieving the entire teacher preferences');
        }

    }
    
    /**
     * get the teacher preference whose authToken is provided
     * @param {string} authToken 
     * @returns {Promise<ITeacherPref}
     * @memberof TeacherPrefController
     */
    async my(authToken: string): Promise<ITeacherPref>
    {
        let user = await getUser(authToken);

        try
        {
            const teacherPref: ITeacherPref = await TeacherPref.findOne({email: user.email}).catch((err) => err);
            if(!teacherPref) //if it doesn't exist, create one
            {
                await this.update(authToken, user.email, [""], "08:30", "22:00", "false");
            }
            const teacherPref2: ITeacherPref= await TeacherPref.findOne({email: user.email}).catch((err) => err);
            return teacherPref2;
        } catch(err)
        {
            throw new Error('Error while retrieving your preferences');
        }
    }


}