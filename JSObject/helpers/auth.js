import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hash, password) => bcrypt.compareSync(hash, password);
dotenv.config();

// eslint-disable-next-line prefer-destructuring
const secretKey = process.env.secretKey;

export const generateToken = payload => jwt.sign(payload, secretKey, { expiresIn: '1week' });

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
