import { MongoClient, ServerApiVersion, Document } from 'mongodb';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

// Placeholder for types I haven't come up with yet
type TODO = undefined;

// how many minutes a class can run for
type ClassLength = 50 | 80 | 180;

// what days is a class running
type ClassDays = 'MTW' | 'TH' | 'ONCE';

// range of time and day that a class or professor is available
type Availability = Array<{ day: Day; times: Array<TimeRange> }>;

// start and end of a time block
type TimeRange = { start: number; end: number };

type Day = 'Monday' | 'Tuesday' | 'Wednsday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

// Programs that our system is planned to support
type Program = 'SENG' | 'CSC' | 'ECE' | 'BIOMED';

interface Room extends Document {
	name: string;
	size: number;
	speakerSystem: boolean;
	projector: boolean;
	cameras: boolean;
}

interface Professor extends Document {
	name: string;
	timesICanTeach: Availability;
	timesIWant2Teach: Availability;
}

// interface SatisfiedCourse {
// 	course: Course;
// 	professor: Professor;
// 	room: Room;
// }

// TODO check that this starts after 8am and ends before 10pm
// const validClassTime( time: Availability ): boolean

interface Course extends Document {
	name: string;
	inPerson: boolean;
	days: ClassDays;
	length: ClassLength;
	requiredFor: Array<Program>;
	weeksOffered: TODO;
}

const mongoHost: string = process.env.MONGO_HOST ? process.env.MONGO_HOST : 'localhost';

const mongoUri = 'mongodb://admin:admin@' + mongoHost + ':27017';
console.log(mongoUri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(mongoUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
});

const app = express();
// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const port = 3001;

/*
  Basic structure for any request that requires inserting a type into the database based on the request
 */
async function parseAndStore<T extends Document>(body: T, collection: string): Promise<string> {
	try {
		console.log(body);
		const course: T = body;

		// Connect the client to the server (optional starting in v4.7)
		await mongoClient.connect();
		// Send a ping to confirm a successful connection
		await mongoClient.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
		const classes = mongoClient.db('schedule_backend').collection<T>(collection);

		const result = await classes.insertOne(
			// TODO casting to any since I couldn't figure out how to satisfy this
			<any>course
		);
		await mongoClient.close();
		return `Inserted ${course} with id ${result.insertedId}`;
	} catch (e) {
		await mongoClient.close();
		return `Failed ${e}`;
	}
}

// TODO GET SCHEDULE
// Gets the most recently generated schedule
//
// Example Curl Command For Testing
// curl http://localhost:3000/SCHEDULE
app.get('/SCHEDULE', async (_req, res) => {
	try {
		// Connect the client to the server (optional starting in v4.7)
		await mongoClient.connect();
		// Send a ping to confirm a successful connection
		await mongoClient.db('admin').command({ ping: 1 });
		console.log('Pinged your deployment. You successfully connected to MongoDB!');
		const classes = mongoClient.db('schedule_backend').collection<Course>('courses');
		const newCourse: Course = {
			days: 'MTW',
			inPerson: false,
			length: 50,
			name: 'ECE 696',
			requiredFor: ['ECE'],
			weeksOffered: undefined
		};
		const result = await classes.insertOne(newCourse);
		res.send(`Inserted ${newCourse} with id ${result.insertedId}`);
	} catch (e) {
		console.log(`Failed ${e}`);
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoClient.close();
	}
});

// POST PROFESSOR
// Adds a new professor to the database
app.post('/PROFESSOR', async (req, res) => {
	res.send(await parseAndStore<Professor>(req.body, 'professor'));
});

// POST COURSE
// Adds a new course to the database
//
// Example Curl Command For Testing
// curl -H "Content-Type: application/json" -X POST -d '{
//       "days": "MTW",
//       "inPerson": false,
//       "length": 50,
//       "name": "ECE 696",
//       "requiredFor": ["ECE"]
//     }' http://localhost:3000/COURSE

app.post('/COURSE', async (req, res) => {
	res.send(await parseAndStore<Course>(req.body, 'courses'));
});

// POST ROOM
// Adds a new class room to the database
app.post('/ROOM', async (req, res) => {
	res.send(await parseAndStore<Room>(req.body, 'rooms'));
});

app.listen(port, () => {
	console.log(`listening on ${port}`);
});
