import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';
import { SemesterRegistrationServices } from './semesterRegistration.service';

const createSemesterRegistration = asyncFunctionHandler(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration is created successfully',
    data: result,
  });
});

const getAllSemesterRegistration = asyncFunctionHandler(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req?.query,
    );

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All semester registration fetched successfully',
    data: result,
  });
});

const getSingleSemesterRegistration = asyncFunctionHandler(async (req, res) => {
  const { id } = req.params;

  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration is fetched successfully',
    data: result,
  });
});

const updateSemesterRegistration = asyncFunctionHandler(async (req, res) => {
  const { id } = req.params;

  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body,
    );

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration is updated successfully',
    data: result,
  });
});

const deleteSemesterRegistration = asyncFunctionHandler(async (req, res) => {
  const { id } = req.params;

  const result =
    await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(
      id,
      req.body,
    );

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Semester registration is deleted successfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
