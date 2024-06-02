import express from 'express';
import { UserControllers } from './user.controller';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { StudentValidations } from '../student/student.validator';

const router = express.Router();

router.post(
  '/create-student',
  requestValidationHandler(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
