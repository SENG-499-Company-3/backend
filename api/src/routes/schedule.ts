// import express from 'express';
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
