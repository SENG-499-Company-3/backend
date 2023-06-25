//create and add mock data to the database

const Schedule = require('../models/schedule.model');



export async function create_schedule_one(num: number)
{
    const schedule1 = new Schedule({
        term: "2023-0"+num,
        course: "CSC 11"+num,
        section: "A0"+num,
        instructor: "Tony Stank",
        capacity: 50+num,
        location: "ECS 11"+num,
        days: ["MONDAY", "THURSDAY"],
        start: "09:30",
        end: "11:00"
    });

    try
    {
        await schedule1.save(schedule1).catch((err) => err);
    } catch (err)
    {
        throw new Error('Error adding one mock schedule to database. ');
    }
}


