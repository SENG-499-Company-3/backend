import { hashPassword } from '../helpers/auth';
import { IUser } from '../interfaces/User';

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

//login user
export class AuthController {
  #JWT_SECRET: string = 'sadlfkjsfk';

  //returns a jwt token
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

  //login user
  async login(email: string, password: string): Promise<string> {
    let verifiedJWT = '';

    //attempt to login the user
    //if user and password found, generate jwt token, store it in database
    //and return it
    const hash = await hashPassword(password);

    await User.findOne({ email: email, password: hash })
      .then(async () => {
        var jwtToken = await this.makeJWT({ email: email });
        await User.findOneAndUpdate({ email: email }, { $set: { token: jwtToken } }).then(async () => {
          verifiedJWT = jwtToken;
        });
      })
      .catch((err) => err);

    return verifiedJWT;
  }

  // Self
  async self(authToken: string): Promise<IUser> {
    let decoded_email = '';
    let selfUser: IUser = {} as IUser;

    try {
      decoded_email = jwt_decode(authToken).email;
    } catch (err) {
      throw new Error('This token was invalid!');
    }

    try {
      selfUser = await User.findOne({ email: decoded_email }).catch((err) => err);
      if (!selfUser) {
        throw new Error('There was no user with that email.');
      }
    } catch (err) {
      throw new Error('Some error occurred while retrieving user.');
    }

    return selfUser;
  }
}
