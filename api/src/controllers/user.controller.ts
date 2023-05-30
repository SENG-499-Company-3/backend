const db = require('../models');
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
