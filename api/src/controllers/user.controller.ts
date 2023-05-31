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

  public self = (req, res) => {

    if(!req.body.username || !req.body.authToken) {
      res.status(400).send({message: 'Self endpoint requires a username and token!'});
    }

    User.findOne({ username: req.body.username})
      .then((data) => {
        if(!data) {
          res.send({message: "There was no user with that username."})
        }

        // TODO
        // Will be replaced by a real token found in database
        const tempToken = "tempToken";

        if(req.body.authToken != tempToken) {
          res.status(401).send({message: "Tokens do not match!"});
        }

        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occured while trying to retrieve a user.'
        });
      });
  }
}
