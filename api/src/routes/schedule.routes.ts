import express from 'express';
import { ScheduleController } from '../controllers/schedule.controller';

const router = express.Router();
const scheduleController: ScheduleController = new ScheduleController();


/**
 * admin triggers build schedule
 * Make schedule by running the algorithms (currently just creates a mock schedule)
 * @param {*} req
 * @param {*} res
 * @return {*}
 * */
const create = async (req, res) => {
    try
    {
        const response = await scheduleController.create();
        res.status(200).send("Created schedule.");
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/create', create);



/**
 * Admin list entire schedule
 * Get the entire schedule that has been created from the database
 * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
*/
const list = async (req, res) => {
    if(!req.headers.authorization)
    {
        res.status(400).send({ message: "This endpoint requires authorization header."});
    }

    const token = req.headers.authorization;

    try
    {
        const response = await scheduleController.list(token);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/list', list);


/** teacher: get my schedule
 *  * @param {*} req
 * @param {*} res
 * @return {*} ISchedule[]
*/
const my = async (req, res) => {
    if(!req.headers.authorization)
    {
        res.status(400).send({ message: "This endpoint requires authorization header."});
    }

    const token = req.headers.authorization;

    try
    {
        const response = await scheduleController.my(token);
        res.status(200).send(response);
    } catch (err)
    {
        res.status(401).send({message: err});
    }
}
router.get('/my', my);

//export schedule 


//teacher set preferences: courses, time slots, peng (boolean), userid, 

//teacher: view my preference

//admin: view all teachers' preference

//admin: change schedule?

//admin: get all coureses list

//admin: choose which courses to offer in the year

//change course type (elective and core)

//export schedule




module.exports = router;














//old code:
// import { parseAndStore } from '../database/db';
// import { Room } from '../interfaces/ClassDetails';

// const router = express.Router();

// // POST ROOM
// // Adds a new class room to the database
// router.post('/ROOM', async (req, res) => {
//   res.send(await parseAndStore<Room>(req.body, 'rooms'));
// });

// // TODO GET SCHEDULE
// // Gets the most recently generated schedule
// //
// // Example Curl Command For Testing
// // curl http://localhost:3000/SCHEDULE
// app.get('/SCHEDULE', async (_req, res) => {
//     try {
//       // Connect the client to the server (optional starting in v4.7)
//       await mongoClient.connect();
//       // Send a ping to confirm a successful connection
//       await mongoClient.db('admin').command({ ping: 1 });
//       console.log('Pinged your deployment. You successfully connected to MongoDB!');
//       const classes = mongoClient.db('schedule_backend').collection<Course>('courses');
//       const newCourse: Course = {
//         days: 'MTW',
//         inPerson: false,
//         length: 50,
//         name: 'ECE 696',
//         requiredFor: ['ECE'],
//         weeksOffered: undefined
//       };
//       const result = await classes.insertOne(newCourse);
//       res.send(`Inserted ${newCourse} with id ${result.insertedId}`);
//     } catch (e) {
//       console.log(`Failed ${e}`);
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await mongoClient.close();
//     }
//   });

//   // POST PROFESSOR
//   // Adds a new professor to the database
//   app.post('/PROFESSOR', async (req, res) => {
//     res.send(await parseAndStore<Professor>(req.body, 'professor'));
//   });

//   // POST COURSE
//   // Adds a new course to the database
//   //
//   // Example Curl Command For Testing
//   // curl -H "Content-Type: application/json" -X POST -d '{
//   //       "days": "MTW",
//   //       "inPerson": false,
//   //       "length": 50,
//   //       "name": "ECE 696",
//   //       "requiredFor": ["ECE"]
//   //     }' http://localhost:3000/COURSE

//   app.post('/COURSE', async (req, res) => {
//     res.send(await parseAndStore<Course>(req.body, 'courses'));
//   });
