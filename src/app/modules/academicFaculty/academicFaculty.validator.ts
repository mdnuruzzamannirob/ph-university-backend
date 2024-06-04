import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be string',
    required_error: 'Name must be required',
  }),
});

const updateAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be string',
    required_error: 'Name must be required',
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
