import { ICourse } from '../interfaces/Course';

const Course = require('../models/course.model');

/**
 * Entity lists controller. Lists entities such as course list, teacher list
 * @export 
 * @class CourseController
 */
export class CourseController
{

    /**
     * @returns {*} {Promise<ICourse[]>}
     * @memberof CourseController
     */
    async list(): Promise<ICourse[]>
    {
        try
        {
            const courses: ICourse[] = await Course.find().catch((err) => err);
            return courses;
        } catch (err)
        {
            throw new Error ('Error while retrieving courses list: ' + err);
        }
    }


    async add(course: ICourse): Promise<void>
    {
        try
        {
            await course.save(course).catch((err) => err);
        } catch (err)
        {
            throw new Error('Error adding course.');
        }
    }

    async remove(): Promise<void>
    {
        try
        {
            
        } catch (err)
        {

        }
    }

    async update(): Promise<void>
    {
        try
        {
            
        } catch (err)
        {

        }
    }

    
}