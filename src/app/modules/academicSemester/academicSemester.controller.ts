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

const getAllAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters is fetched successfully',
    data: result,
  });
});

const getSingleAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is fetched successfully',
    data: result,
  });
});

const updateAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const { semesterId } = req.params;

  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is updated successfully',
    data: result,
  });
});

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
