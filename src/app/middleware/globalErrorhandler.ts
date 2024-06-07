import { ErrorRequestHandler } from 'express';
import { zodErrorhandler } from '../errors/zodErrorHandler';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import { castErrorhandler } from '../errors/castErrorHandler';
import { validationErrorhandler } from '../errors/validationErrorHandler';
import { duplicateErrorhandler } from '../errors/duplicateErrorHandler';

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
  } else if (error.name === 'ValidationError') {
    const simplifiedError = validationErrorhandler(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error.name === 'CastError') {
    const simplifiedError = castErrorhandler(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error.code === 11000) {
    const simplifiedError = duplicateErrorhandler(error);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return res.status(status).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
