import { Response } from 'express';
import { TResponse } from '../interface/response';

const responseHandler = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.status).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default responseHandler;
