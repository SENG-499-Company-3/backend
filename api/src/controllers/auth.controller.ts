const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//login user
export class AuthController {
  #JWT_SECRET: string = 'sadlfkjsfk';
  #saltRounds: number = 10;

  public makeJWT = (user) => {
    var jwtToken = jwt.sign(user, process.env.JWT_SECRET || this.#JWT_SECRET); //TODO can't access JWT_SECRET
    return jwtToken;
  };

  //returns the username if jwt token is invalid, else returns empty string.
  public verifyJWT = (jwtToken) => {
    try {
      const user = jwt.verify(jwtToken, process.env.JWT_SECRET || this.#JWT_SECRET, { expiresIn: 60 * 60 * 4 });
      return user;
    } catch (err) {
      return '';
    }
  };

  public login = (req, res) => {
    //Validate request
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
    }

    bcrypt.genSalt(this.#saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        //attempt to login the user
        //if user and password found, generate jwt token, store it in database
        //and return it
        User.findOne({ email: `${req.body.email}`, password: hash })
          .then(() => {
            var jwtToken = this.makeJWT({ email: req.body.email });
            User.findOneAndUpdate({ email: `${req.body.email}` }, { $set: { token: jwtToken } }).then(
              res.send({ Authorization: jwtToken })
            );
          })
          .catch((err) => {
            res.status(401).send({
              message: err.message || 'Wrong email or password.'
            });
          });
      });
    });
  };
}
