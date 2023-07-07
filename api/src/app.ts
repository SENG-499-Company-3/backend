import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { userData } from './models/data/userData';
import { courseData2023 } from './models/data/courseData';

const user = require('./routes/user.routes');
const auth = require('./routes/auth.routes');
const schedule = require('./routes/schedule.routes');
const teacherPref = require('./routes/teacherpref.routes');
const predictSchedule = require('./routes/predictSchedule.routes');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// Connect to the database
const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

const User = require('./models/user.model');

// Create a new User if one doesn't already exist
User.findOne({ email: userData[0].email }).then((user) => {
  if (!user) {
    User.create(userData[0])
      .then(() => {
        console.log('Users created!');
      })
      .catch((err) => {
        console.log('Error creating users!', err);
      });
  }
});

// Create data for previous enrolment
const Schedule = require('./models/classSizePrediction.model');
Schedule.findOne({ course: courseData2023[0].course }).then((course) => {
  if (!course) {
    courseData2023.forEach((data) => {
      Schedule.create(data);
    });
    console.log('Courses created!');
  }
});

app.use('/user', user);
app.use('/auth', auth);
app.use('/schedule', schedule);
app.use('/teacherpref', teacherPref);
app.use('/schedule', predictSchedule);

// Global error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log('err', err);

  var responseData;

  if (err.name === 'JsonSchemaValidation') {
    // Log the error however you please
    console.log(err.message);
    // logs "express-jsonschema: Invalid data found"

    // Set a bad request http response status or whatever you want
    res.status(400);

    // Format the response body however you want
    responseData = {
      statusText: 'Bad Request',
      jsonSchemaValidation: true,
      validations: err.validations // All of your validation information
    };

    // Take into account the content type if your app serves various content types
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      res.json(responseData);
  } else {
      // If this is an html request then you should probably have
      // some type of Bad Request html template to respond with
      res.render('badrequestTemplate', responseData);
  }
  }else {
    // pass error to next error middleware handler
    return next(err);
  }

  res.status(500).send(responseData);
});

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend :3' });
});

app.post('/', (req, res) => {
  console.log('req.body', req.body);
  res.json({ message: `Basic post request: ${req.body}` });
});

// // set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
