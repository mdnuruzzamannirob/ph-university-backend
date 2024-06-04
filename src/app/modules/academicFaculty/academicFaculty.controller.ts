import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = asyncFunctionHandler(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});

const getAllAcademicFaculty = asyncFunctionHandler(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic faculties fetched successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = asyncFunctionHandler(async (req, res) => {
  const { facultyId } = req.params;

  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is fetched successfully',
    data: result,
  });
});

const updateAcademicFaculty = asyncFunctionHandler(async (req, res) => {
  const { facultyId } = req.params;

  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  responseHandler(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated successfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
