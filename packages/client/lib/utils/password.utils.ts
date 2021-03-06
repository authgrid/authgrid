import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const encryptPassword = async (password): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);

      resolve(hash);
    });
  });

export const comparePassword = async (password, hash): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
