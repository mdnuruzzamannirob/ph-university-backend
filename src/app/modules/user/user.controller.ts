import { UserServices } from './user.service';
import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';

const createStudent = asyncFunctionHandler(async (req, res) => {
  const studentData = req.body;
  const { password } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const getSingleUser = asyncFunctionHandler(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.getSingleUserFromDB(userId);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

const getAllUsers = asyncFunctionHandler(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User are retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  getSingleUser,
  getAllUsers,
};
