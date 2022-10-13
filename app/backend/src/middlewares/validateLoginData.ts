import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/ILogin';
import { Err } from './errorMiddleware';

const validateLoginData = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body as ILogin;
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!(email.match(emailRegex)) || password.length <= 6) {
      throw new Err(400, 'All fields must be filled');
    }
  } catch (error) {
    next(error);
  }
  next();
};

export default validateLoginData;
