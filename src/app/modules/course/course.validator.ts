import { z } from 'zod';

const createPreRequisiteCourseValidationSchema = z.object({
  course: z.string({
    invalid_type_error: 'Course must be string',
    required_error: 'Course is required',
  }),
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be Boolean',
    })
    .default(false)
    .optional(),
});
const createCourseValidationSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be string',
    required_error: 'Title is required',
  }),
  prefix: z.string({
    invalid_type_error: 'Prefix must be string',
    required_error: 'Prefix is required',
  }),
  code: z.number({
    invalid_type_error: 'Code must be number',
    required_error: 'Code is required',
  }),
  credits: z.number({
    invalid_type_error: 'Credits must be number',
    required_error: 'Credits is required',
  }),
  preRequisiteCourses: z
    .array(createPreRequisiteCourseValidationSchema)
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be Boolean',
    })
    .default(false)
    .optional(),
});

const updatePreRequisiteCourseValidationSchema = z.object({
  course: z
    .string({
      invalid_type_error: 'Course must be string',
    })
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be Boolean',
    })
    .default(false)
    .optional(),
});

const updateCourseValidationSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be string',
    })
    .optional(),
  prefix: z
    .string({
      invalid_type_error: 'Prefix must be string',
    })
    .optional(),
  code: z
    .number({
      invalid_type_error: 'Code must be number',
    })
    .optional(),
  credits: z
    .number({
      invalid_type_error: 'Credits must be number',
    })
    .optional(),
  preRequisiteCourses: z
    .array(updatePreRequisiteCourseValidationSchema)
    .optional(),
  isDeleted: z
    .boolean({
      invalid_type_error: 'isDeleted must be Boolean',
    })
    .default(false)
    .optional(),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
