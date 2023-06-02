const db = require('../models');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
const User = db.users;

// Create and Save a new User
export class UserController {
  public create = (req, res) => {
    // Validate request
    if (!req.body.username) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    // Create a User
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    // Encrypt the user's password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        //Set the user's password to the new hashed version
        user.password = hash;

        // Save User in the database
        user
          .save(user)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Some error occurred while creating the User.'
            });
          });
      });
    });
  };

  // Retrieve all Users from the database.
  public list = (req, res) => {
    User.find()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.'
        });
      });
  };

  public self = (req, res) => {
    if (!req.headers.authorization) {
      res.status(400).send({ message: 'Self endpoint requires authorization header.' });
    }

    const authToken = req.headers.authorization.split(' ')[1];
    let decoded_username = "";

    try {
      decoded_username = jwt_decode(authToken).username;
    } catch (err) {
      res.status(401).send({message: "This token was invalid!"});
    }

    User.findOne({ username: decoded_username })
      .then((data) => {
        if (!data) {
          res.send({ message: 'There was no user with that username.' });
        }

        const dbToken = authToken;

        if (authToken != dbToken) {
          res.status(401).send({ message: 'Tokens do not match!' });
        }
        
        //TODO
        //Decide what to send back to the client when their session has been verified.
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occured while trying to retrieve a user.'
        });
      });
  };
}