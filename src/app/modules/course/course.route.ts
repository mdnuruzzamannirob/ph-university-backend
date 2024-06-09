import express from 'express';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validator';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  requestValidationHandler(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  requestValidationHandler(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
