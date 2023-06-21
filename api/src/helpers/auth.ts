const bcrypt = require('bcrypt');

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
