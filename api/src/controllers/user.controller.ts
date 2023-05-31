const db = require('../models');
const bcrypt = require("bcrypt");
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
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        
        //Set the user's password to the new hashed version
        user.password = hash;

        // Save User in the database
        user.save(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the User.'
          });
        });

      })
    })
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
}
