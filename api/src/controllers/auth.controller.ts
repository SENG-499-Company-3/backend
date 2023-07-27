import { comparePassword } from '../helpers/auth';
import { IUser } from '../interfaces/User';

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

/**
 * Auth Controller
 *
 * @export
 * @class AuthController
 */
export class AuthController {
  #JWT_SECRET: string = 'sadlfkjsfk';

  //returns a jwt token
  public makeJWT = (user) => {
    var jwtToken = jwt.sign(user, process.env.JWT_SECRET || this.#JWT_SECRET); //TODO can't access JWT_SECRET
    return jwtToken;
  };

  /**
   * Login user
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof AuthController
   */
  async login(email: string, password: string): Promise<string> {
    let verifiedJWT = '';

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error('User not found.');
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      throw new Error('Invalid password.');
    }

    var jwtToken = await this.makeJWT({ email: email });

    await User.findOneAndUpdate({ email: email }, { $set: { token: jwtToken } }).then(async () => {
      verifiedJWT = jwtToken;
    });

    return verifiedJWT;
  }

  /**
   * Get self
   *
   * @param {string} authToken
   * @return {*}  {Promise<IUser>}
   * @memberof AuthController
   */
  async self(authToken: string): Promise<IUser> {
    let decoded_email = '';
    let selfUser: IUser = {} as IUser;

    decoded_email = jwt_decode(authToken).email;

    if (!decoded_email) {
      throw new Error('This token was invalid!');
    }

    selfUser = await User.findOne({ email: decoded_email });
    console.log('selfUser', selfUser);

    if (!selfUser) {
      throw new Error('There was no user with that email.');
    }

    return selfUser;
  }
}
