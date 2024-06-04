import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic department must be string',
    required_error: 'Academic department is required',
  }),
  academicFaculty: z.string({
    invalid_type_error: 'Academic faculty must be string',
    required_error: 'Academic faculty must be required',
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic department must be string',
    })
    .optional(),
  academicFaculty: z
    .string({
      invalid_type_error: 'Academic faculty must be string',
    })
    .optional(),
});
export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
