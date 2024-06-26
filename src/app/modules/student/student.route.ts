import express from 'express';
import { StudentControllers } from './student.controller';
import { requestValidationHandler } from '../../middleware/requestValidationHandler';
import { StudentValidations } from './student.validator';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  requestValidationHandler(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
