import { IUser, UserRoles } from '../interfaces/User';

const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.users;

export class UserController {
  async create(email: string, password: string, name: string, role: UserRoles): Promise<void> {
    // Create a User
    const user: IUser = new User({
      email: email,
      password: password,
      name: name,
      role: role
    });

    // Encrypt the user's password
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(user.password, salt, async function (err, hash) {
        //Set the user's password to the new hashed version
        user.password = hash;

        // Save User in the database
        try {
          await user.save(user).catch((err) => err);
        } catch (err) {
          throw new Error('Some error occurred while creating the User.');
        }
      });
    });
  }

  // Retrieve all Users from the database.
  async list(): Promise<IUser[]> {
    try {
      const users: IUser[] = await User.find().catch((err) => err);

      return users;
    } catch (err) {
      throw new Error('Some error occurred while retrieving users.');
    }
  }
}
