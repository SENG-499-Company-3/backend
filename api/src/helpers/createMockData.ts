//create and add mock data to the database

const Schedule = require('../models/schedule.model');
const User = require('../models/user.model');
import { userData } from '../models/data/userData';
import { hashPassword } from './auth';


//creates mock data for a single row of a schedule, adding num to the end of entries
export async function create_schedule_one(num: number) {
    const schedule1 = new Schedule({
        term: "2023-0" + num,
        course: "CSC 11" + num,
        section: "A0" + num,
        instructor: "Tony Stank",
        email: "tony@gmail.com",
        capacity: 50 + num,
        location: "ECS 11" + num,
        days: ["MONDAY", "THURSDAY"],
        start: "09:30",
        end: "11:00"
    });

    try {
        await schedule1.save(schedule1).catch((err) => err);
    } catch (err) {
        throw new Error('Error adding one mock schedule to database. ');
    }
}


//creates mock data for specified number of rows for the schedule
export async function create_schedule(num: number) {
    var i = 0;
    for (i = 0; i < num; i++) {
        try {
            await create_schedule_one(i);
        } catch (err) {
            throw new Error('Error adding mmock schedule to database.');
        }
    }
}

export async function create_professors() {
    // Create a new User if one doesn't already exist
    userData.forEach(async (data, index) => {
        data.password = await hashPassword(data.password);
        User.findOne({ email: data.email }).then((user) => {
            if (!user) {
                User.create(data)
                    .then(() => {
                        console.log('User ' + index +  ' created!');
                    })
                    .catch((err) => {
                        console.log('Error creating users!', err);
                    });
            }
        });
    });
}


