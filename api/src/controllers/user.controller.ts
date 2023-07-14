import { hashPassword } from '../helpers/auth';
import { IUser, UserRoles } from '../interfaces/User';
import { IUserVisible } from '../interfaces/UserVisible';

const User = require('../models/user.model');

/**
 * User Controller
 *
 * @export
 * @class UserController
 */
export class UserController {
  /**
   * Creates an instance of UserController.
   *
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @param {UserRoles} role
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async create(email: string, password: string, name: string, role: UserRoles): Promise<void> {
    // Create a User
    const user = new User({
      email: email,
      password: password,
      name: name,
      role: role,
      token: ''
    });

    //Set the user's password to the new hashed version
    user.password = await hashPassword(user.password);

    // Save User in the database
    try {
      await user.save(user).catch((err) => err);
    } catch (err) {
      throw new Error('Some error occurred while creating the User.');
    }
  }

  /**
   * List all users
   *
   * @return {*}  {Promise<IUser[]>}
   * @memberof UserController
   */
  async list(): Promise<IUser[]> {
    try {
      let users: IUser[] = await User.find().catch((err) => err);
      
      return users;
    } catch (err) {
      throw new Error('Some error occurred while retrieving users.');
    }
  }


  /**
   * Get user data based on their email
   * @param {string} email 
   * @returns {Promise<IUser>}
   */
  async getUser(email: string): Promise<IUser>
  {
    let user: IUser = {} as IUser;
    user = await User.findOne({email: email}).catch((err) => err);
    if(!user) throw new Error("No user associated with given email.");
    return user;
  }

  //get user by id
  async byId(uid: string): Promise<IUser>
  {
    let user: IUser = {} as IUser;
    user = await User.findOne({_id: uid}).catch((err) => err);
    if(!user) throw new Error("No user associated with given email.");
    return user;
  }
  
}


