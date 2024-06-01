import { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncFunctionHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default asyncFunctionHandler;
