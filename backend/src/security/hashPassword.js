import bcrypt, { hash } from "bcryptjs";

export const hashPassword = (hashedText, saltRound = Number(10)) => {
  return bcrypt.hashSync(hashedText, saltRound);
};

export const comparehash = (hashedText, hash) => {
  return bcrypt.compareSync(hashedText, hash);
};
