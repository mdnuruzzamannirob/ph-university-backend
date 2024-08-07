import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const requestValidationHandler = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body); // validation check

      next();
    } catch (error) {
      next(error);
    }
  };
};
