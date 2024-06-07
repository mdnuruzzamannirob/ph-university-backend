import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

export const castErrorhandler = (
  error: Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    status: httpStatus.BAD_REQUEST,
    message: 'Invalid Id',
    errorSources,
  };
};
