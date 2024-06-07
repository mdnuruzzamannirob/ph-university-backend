import { Error } from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

export const validationErrorhandler = (
  error: Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (value: Error.ValidatorError | Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );

  return {
    status: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorSources,
  };
};
