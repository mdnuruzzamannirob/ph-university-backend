import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = asyncFunctionHandler(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = asyncFunctionHandler(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic departments fetched successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = asyncFunctionHandler(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is fetched successfully',
    data: result,
  });
});

const updateAcademicDepartment = asyncFunctionHandler(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
