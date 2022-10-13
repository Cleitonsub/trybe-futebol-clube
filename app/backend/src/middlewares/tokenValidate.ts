import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/token';
import { Err } from './errorMiddleware';

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token must be a valid token' });

  try {
    const user = verifyToken(authorization);
    if (!user) throw new Err(401, 'Token must be a valid token');
    req.body.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default tokenValidate;
