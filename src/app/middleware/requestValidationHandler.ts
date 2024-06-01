import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const requestValidationHandler = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parseAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};
