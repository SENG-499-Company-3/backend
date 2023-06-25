import cors from 'cors';
// import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { userData } from './models/data/userData';
const user = require('./routes/user.routes');
const auth = require('./routes/auth.routes');
const schedule = require('./routes/schedule.routes');

const app = express();

// adding Helmet to enhance your API's security
// app.use(helmet());

// enabling CORS for all local requests
// var corsOptions = {
//   origin: 'http://localhost:10.9.0.4'
// };
// app.use(cors(corsOptions));
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

app.use('/user', user);
app.use('/auth', auth);
app.use('/schedule', schedule);

// Global error handling
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, next) => {
  console.log('err', err);
  res.status(500).send('Uh oh! An unexpected error occured.');
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
