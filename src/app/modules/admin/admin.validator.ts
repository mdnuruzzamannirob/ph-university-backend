import { z } from 'zod';

const createAdminNameSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be string',
      required_error: 'First Name is required',
    })
    .trim()
    .min(1, { message: 'Name can not be less than 1 characters' })
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),

  middleName: z
    .string({ invalid_type_error: 'Middle Name must be string' })
    .trim()
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Middle Name must start with a capital letter',
    })
    .optional(),

  lastName: z
    .string({
      invalid_type_error: 'Last Name must be string',
      required_error: 'Last Name is required',
    })
    .trim()
    .min(1, { message: 'Name can not be less than 1 characters' })
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter',
    }),
});

const createAdminValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .min(8, { message: 'Password can not be less than 8 characters' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .email({ message: 'Invalid email format' }),

  name: createAdminNameSchema,

  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),

  designation: z
    .string({
      invalid_type_error: 'Designation must be string',
      required_error: 'Designation is required',
    })
    .trim(),

  dateOfBirth: z
    .string({
      invalid_type_error: 'Date of birth must be string',
    })
    .trim()
    .optional(),

  contactNo: z
    .string({
      invalid_type_error: 'Contact No must be string',
      required_error: 'Contact No is required',
    })
    .trim(),

  emergencyContactNo: z
    .string({
      invalid_type_error: 'Emergency Contact No must be string',
      required_error: 'Emergency Contact No is required',
    })
    .trim(),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),

  presentAddress: z
    .string({
      invalid_type_error: 'Present address must be string',
      required_error: 'Present address is required',
    })
    .trim(),

  permanentAddress: z
    .string({
      invalid_type_error: 'Permanent address must be string',
      required_error: 'Permanent address is required',
    })
    .trim(),

  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string',
    })
    .trim()
    .optional(),

  managementDepartment: z
    .string({
      invalid_type_error: 'Management department must be string',
      required_error: 'Management department is required',
    })
    .trim(),

  isDeleted: z.boolean().optional().default(false),
});

const updateAdminNameSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be string',
    })
    .trim()
    .min(1, { message: 'Name can not be less than 1 characters' })
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    })
    .optional(),

  middleName: z
    .string({ invalid_type_error: 'Middle Name must be string' })
    .trim()
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Middle Name must start with a capital letter',
    })
    .optional(),

  lastName: z
    .string({
      invalid_type_error: 'Last Name must be string',
    })
    .trim()
    .min(1, { message: 'Name can not be less than 1 characters' })
    .max(20, { message: 'Name can not be more than 20 characters' })
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'Last Name must start with a capital letter',
    })
    .optional(),
});

const updateAdminValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .min(8, { message: 'Password can not be less than 8 characters' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),

  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email format' })
    .optional(),

  name: updateAdminNameSchema,

  gender: z
    .enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: 'Invalid gender' }),
    })
    .optional(),

  designation: z
    .string({
      invalid_type_error: 'Designation must be string',
    })
    .trim()
    .optional(),

  dateOfBirth: z
    .string({
      invalid_type_error: 'Date of birth must be string',
    })
    .trim()
    .optional(),

  contactNo: z
    .string({
      invalid_type_error: 'Contact No must be string',
    })
    .trim()
    .optional(),

  emergencyContactNo: z
    .string({
      invalid_type_error: 'Emergency Contact No must be string',
    })
    .trim()
    .optional(),

  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),

  presentAddress: z
    .string({
      invalid_type_error: 'Present address must be string',
    })
    .trim()
    .optional(),

  permanentAddress: z
    .string({
      invalid_type_error: 'Permanent address must be string',
    })
    .trim()
    .optional(),

  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string',
    })
    .trim()
    .optional(),

  managementDepartment: z
    .string({
      invalid_type_error: 'management department must be string',
    })
    .trim()
    .optional(),

  isDeleted: z.boolean().optional().default(false),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
