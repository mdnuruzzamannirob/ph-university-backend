import express from 'express';
import { UserControllers } from './user.controller';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { StudentValidations } from '../student/student.validator';
import { FacultyValidations } from '../faculty/faculty.validator';
import { AdminValidations } from '../admin/admin.validator';

const router = express.Router();

router.post(
  '/create-student',
  requestValidationHandler(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  requestValidationHandler(FacultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  requestValidationHandler(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);

export const UserRoutes = router;
