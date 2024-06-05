import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';

  return res.status(status).json({
    success: false,
    message,
    error,
  });
};

export default globalErrorHandler;
