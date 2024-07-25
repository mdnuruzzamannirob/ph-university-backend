/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { TErrorSources } from '../interface/error';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const errorSources: TErrorSources = [
    {
      path: '',
      message: 'API Not Found !',
    },
  ];

  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !',
    errorSources,
    stack: null,
  });
};

export default notFoundHandler;
