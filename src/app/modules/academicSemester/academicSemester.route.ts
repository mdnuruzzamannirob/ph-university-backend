import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { AcademicSemesterValidators } from './academicSemester.validator';

const router = express.Router();

router.post(
  '/create-academic-semester',
  requestValidationHandler(
    AcademicSemesterValidators.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);

router.patch(
  '/:semesterId',
  requestValidationHandler(
    AcademicSemesterValidators.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
