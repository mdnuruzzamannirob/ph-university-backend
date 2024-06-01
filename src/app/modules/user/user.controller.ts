import { UserServices } from './user.service';
import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';

const createStudent = asyncFunctionHandler(async (req, res) => {
  const studentData = req.body;
  const { password } = req.body;

  // const zodParsedData = studentValidationSchema.parse(studentData);

  const result = await UserServices.createStudentIntoDB(password, studentData);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
