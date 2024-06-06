import httpStatus from 'http-status';
import { StudentServices } from './student.service';
import responseHandler from '../../utils/responseHandler';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';

const getSingleStudent = asyncFunctionHandler(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const getAllStudents = asyncFunctionHandler(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
});

const updateStudent = asyncFunctionHandler(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.updateStudentInoDB(studentId, req.body);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent = asyncFunctionHandler(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId, next);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
