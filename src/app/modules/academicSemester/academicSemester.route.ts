import express from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { academicSemesterValidators } from './academicSemester.validator';

const router = express.Router();

router.post(
  '/create-academic-semester',
  requestValidationHandler(
    academicSemesterValidators.createAcademicSemesterValidationSchema,
  ),
  academicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
