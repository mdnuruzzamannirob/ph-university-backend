import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
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
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic semester fetched successfully',
    data: result,
  });
});

const getSingleAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is fetched successfully',
    data: result,
  });
});

const updateAcademicSemester = asyncFunctionHandler(async (req, res) => {
  const { semesterId } = req.params;

  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
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

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
