import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;


export default class Jwt {
  static async generateToken(payload) {
    const token = await jwt.sign(payload, secretKey, { expiresIn: '14d' });
    return token;
  }

  static async verifyToken(token) {
    const decoded = await jwt.verify(token, secretKey);
    return decoded;
  }

  static async getOneTimeToken(payload, secret) {
    const token = await jwt.sign(payload, secret);
    return token;
  }
}
