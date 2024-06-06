import { ErrorRequestHandler } from 'express';
import { zodErrorhandler } from '../errors/zodErrorHandler';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let status = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorhandler(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof AppError) {
    status = error?.status;
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  return res.status(status).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
