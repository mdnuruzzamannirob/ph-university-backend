import responseHandler from '../../utils/responseHandler';
import httpStatus from 'http-status';
import asyncFunctionHandler from '../../utils/asyncFunctionHandler';
import { CourseServices } from './course.service';

const createCourse = asyncFunctionHandler(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourses = asyncFunctionHandler(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req?.query);

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'All courses fetched successfully',
    data: result,
  });
});

const getSingleCourse = asyncFunctionHandler(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.getSingleCourseFromDB(id);

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course is fetched successfully',
    data: result,
  });
});

const updateCourse = asyncFunctionHandler(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

const assignFacultiesWithCourse = asyncFunctionHandler(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    req.body,
  );

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculties assigned successfully',
    data: result,
  });
});

const removeFacultiesFromCourse = asyncFunctionHandler(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    req.body,
  );

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Faculties removed successfully',
    data: result,
  });
});

const deleteCourse = asyncFunctionHandler(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.deleteCourseFromDB(id);

  responseHandler(res, {
    status: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  deleteCourse,
};
