import express from 'express';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { AcademicDepartmentValidations } from './academicDepartment.validator';
import { AcademicFacultyControllers } from './academicDepartment.controller';
const router = express.Router();

router.post(
  '/create-academic-department',
  requestValidationHandler(
    AcademicDepartmentValidations.createAcademicDepartmentValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicDepartment,
);

router.get('/', AcademicFacultyControllers.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicFacultyControllers.getSingleAcademicDepartment,
);

router.patch(
  '/:departmentId',
  requestValidationHandler(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
