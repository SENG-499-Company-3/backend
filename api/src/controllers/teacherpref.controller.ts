import { ITeacherPref } from '../interfaces/TeacherPref';
import { IUser } from '../interfaces/User';
import { getUser } from '../helpers/auth';

const User = require('../models/user.model');
const TeacherPref = require('../models/teacherpref.model');
//const jwt_decode = require('jwt-decode');


/**
 * Teacher preferences controller
 * 
 */
export class TeacherPrefController
{
    /**
     * Updates teacher preference, or creates it if it doesn't exist
     */
    async update(authToken: string, email: string, courses: string[], start: string, end: string, peng: string): Promise<void>
    {
        let user = await getUser(authToken);

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
            //await TeacherPref.deleteMany();
            //await TeacherPref.findOneAndUpdate({email: email}, pref, {upsert: true, returnOriginal: false}, function() {console.log("test");});//.catch((err) => err);
            const pref_curr = await TeacherPref.findOne({email: email}).catch((err) => err);
            if(!pref_curr) //insert if doesn't exist
            {
                console.log("no");
                await pref.save(pref).catch((err) => err);
            } else
            {
                console.log("yes");
                const doc = await TeacherPref.findOne({email: email}).catch((err) => err);
                doc.overwrite(pref);
                await doc.save();
                //await TeacherPref.replaceOne({email: email}, pref).catch((err) => err);
            }
        } catch (err) 
        {
            console.log(err);
            //throw new Error('Error updating teacher preference.');
        }
    }
    
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
    
    //get the teacher preference whose authToken is provided
    async my(authToken: string): Promise<ITeacherPref>
    {
        let user = await getUser(authToken);

        try
        {
            const teacherPref: ITeacherPref = await TeacherPref.findOne({email: user.email}).catch((err) => err);
            return teacherPref;
        } catch(err)
        {
            throw new Error('Error while retrieving your preferences');
        }
    }


}