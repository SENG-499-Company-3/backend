import { IUser } from '../interfaces/User';

const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');

/**
 * Hashes a password
 *
 * @export
 * @param {string} password
 * @return {*}
 */
export async function hashPassword(password: string) {
  const saltRounds: number = 10;

  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.genSalt(saltRounds, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
  
  return hashedPassword;
}

/**
 * Compares a password to a hash
 *
 * @export
 * @param {string} password
 * @param {string} hash
 * @return {*}
 */
export async function comparePassword(password: string, hash: string) {
  const match = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });

  return match;
}

/**
 * Gets email of the user associated with this authtoken, throws error if cannot
 * @param {string} authToken 
 * @returns {Promise<String>}
 */
export async function getEmail(authToken: string)
{
  let decoded_email = '';
  decoded_email = jwt_decode(authToken).email;
  if(!decoded_email) throw new Error("Invalid authentication token.");
  return decoded_email;
}
// export async function getUser(authToken: string)
// {
//   let decoded_email = '';
//   decoded_email = jwt_decode(authToken).email;
//   if(!decoded_email) throw new Error("Invalid authentication token.");

//   let user: IUser = {} as IUser;
//   user = await User.findOne({email: decoded_email}).catch((err) => err);
//   if(!user) throw new Error("Authentication token not tied to any user.");
//   return user;
// }


/**
 * Returns true if the user associated with the authToken is admin, false otherwise
 * @param {string} authToken 
 * @returns {boolean}
 */
export async function isAdmin(authToken: string)
{
  let decoded_email = '';
  decoded_email = jwt_decode(authToken).email;
  if(!decoded_email) throw new Error("Invalid authentication token.");

  let user: IUser = {} as IUser;
  user = await User.findOne({ email: decoded_email }).catch((err) => err);

  if(!user) return false;

  return user.role=="ADMIN";
}
