import { sign, verify, SignOptions } from 'jsonwebtoken';
import 'dotenv/config';

export const createToken = (email: string) => {
  const JWT_CONFIG: SignOptions = {
    algorithm: 'HS256',
  };
  const token = sign(email, process.env.JWT_SECRET || 'jwt_secret', JWT_CONFIG);

  return { token };
};

export const verifyToken = (authorization: string) => {
  const data = verify(authorization, process.env.JWT_SECRET || 'jwt_secret');

  return data;
};
