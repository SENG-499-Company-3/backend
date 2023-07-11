//create and add mock data to the database

const Schedule = require('../models/schedule.model');


//creates mock data for a single row of a schedule, adding num to the end of entries
export async function create_schedule_one(num: number)
{
    const schedule1 = new Schedule({
        Term: 202305,
        Subj: 'CSC',
        Num: 100+num,
        Section: "A0"+num,
        Title: 'Fundamental Programming:I',
        SchedType: 'LEC',
        Instructor: 'Stank, Tony',
        Bldg: 'ECS',
        Room: '1'+num,
        Begin: 1000+num,
        End: 1120+num,
        Days: 'MR',
        StartDate: '04 May 2023',
        EndDate: '29 Jul 2023',
        Cap: 20+num
    });

    try
    {
        await schedule1.save(schedule1).catch((err) => err);
    } catch (err)
    {
        throw new Error('Error adding one mock schedule to database. ');
    }
}


//creates mock data for specified number of rows for the schedule
export async function create_schedule(num: number)
{
    await Schedule.deleteMany({});
    var i = 0;
    for(i = 0; i < num; i++)
    {
        try
        {
            await create_schedule_one(i);
        } catch (err)
        {
            throw new Error('Error adding mmock schedule to database.');
        }
    }
}


