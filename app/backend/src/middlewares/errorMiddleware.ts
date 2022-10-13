import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

class Err extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (error: Err, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message } = error;
  return res.status(statusCode || 500).json({ message });
};

export { Err };
export default errorMiddleware;
