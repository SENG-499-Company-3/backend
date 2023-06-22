const bcrypt = require('bcrypt');

/**
 * Hashes a password
 *
 * @export
 * @param {string} password
 * @return {*}
 */
export async function hashPassword(password: string) {
  const saltRounds: number = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
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
