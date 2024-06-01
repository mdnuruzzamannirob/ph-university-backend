import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
};
