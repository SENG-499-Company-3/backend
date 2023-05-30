// import { MongoClient, ServerApiVersion, Document } from 'mongodb';
import dbConfig from '../config/db.config';
import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const db = {
  mongoose: Mongoose,
  url: dbConfig.database.url,
  users: require('./user.model.ts')(Mongoose)
};

module.exports = db;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// export const mongoClient =  MongoClient.connect(config.database.url, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// });

// /*
//   Basic structure for any request that requires inserting a type into the database based on the request
//  */
// export async function parseAndStore<T extends Document>(body: T, collection: string): Promise<string> {
//   try {
//     console.log(body);
//     const course: T = body;

//     // Connect the client to the server (optional starting in v4.7)
//     await mongoClient.connect();
//     // Send a ping to confirm a successful connection
//     await mongoClient.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment. You successfully connected to MongoDB!');
//     const classes = mongoClient.db('schedule_backend').collection<T>(collection);

//     const result = await classes.insertOne(
//       // TODO casting to any since I couldn't figure out how to satisfy this
//       <any>course
//     );
//     await mongoClient.close();
//     return `Inserted ${course} with id ${result.insertedId}`;
//   } catch (e) {
//     await mongoClient.close();
//     return `Failed ${e}`;
//   }
// }
