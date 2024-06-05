import { Types } from 'mongoose';
import { z } from 'zod';

// Custom Zod validator for MongoDB ObjectID
const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const createUserNameSchema = z.object({
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

const createGuardianSchema = z.object({
  fatherName: z
    .string({
      invalid_type_error: 'Father Name must be string',
      required_error: 'Father Name is required',
    })
    .trim(),

  fatherOccupation: z
    .string({
      invalid_type_error: 'Father occupation must be string',
      required_error: 'Father occupation is required',
    })
    .trim(),

  fatherContactNo: z
    .string({
      invalid_type_error: 'Father Contact No must be string',
      required_error: 'Father Contact No is required',
    })
    .trim(),

  motherName: z
    .string({
      invalid_type_error: 'Mother name must be string',
      required_error: 'Mother name is required',
    })
    .trim(),

  motherOccupation: z
    .string({
      invalid_type_error: 'Mother occupation must be string',
      required_error: 'Mother occupation is required',
    })
    .trim(),

  motherContactNo: z
    .string({
      invalid_type_error: 'Mother Contact No must be string',
      required_error: 'Mother Contact No is required',
    })
    .trim(),
});

const createLocalGuardianSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be string',
      required_error: 'Name is required',
    })
    .trim(),

  occupation: z
    .string({
      invalid_type_error: 'Occupation must be string',
      required_error: 'Occupation is required',
    })
    .trim(),

  contactNo: z
    .string({
      invalid_type_error: 'Contact No must be string',
      required_error: 'Contact No is required',
    })
    .trim(),

  address: z
    .string({
      invalid_type_error: 'Address must be string',
      required_error: 'Address is required',
    })
    .trim(),
});

const createStudentValidationSchema = z.object({
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

  name: createUserNameSchema,

  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),

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

  guardian: createGuardianSchema,

  localGuardian: createLocalGuardianSchema,

  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string',
    })
    .trim()
    .optional(),

  admissionSemester: z
    .string({
      invalid_type_error: 'Admission semester must be string',
    })
    .trim(),
  academicDepartment: z
    .string({
      invalid_type_error: 'Academic department must be string',
    })
    .trim(),

  isDeleted: z.boolean().optional().default(false),
});

const updateUserNameSchema = z.object({
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

const updateGuardianSchema = z.object({
  fatherName: z
    .string({
      invalid_type_error: 'Father Name must be string',
    })
    .trim()
    .optional(),

  fatherOccupation: z
    .string({
      invalid_type_error: 'Father occupation must be string',
    })
    .trim()
    .optional(),

  fatherContactNo: z
    .string({
      invalid_type_error: 'Father Contact No must be string',
    })
    .trim()
    .optional(),

  motherName: z
    .string({
      invalid_type_error: 'Mother name must be string',
    })
    .trim()
    .optional(),

  motherOccupation: z
    .string({
      invalid_type_error: 'Mother occupation must be string',
    })
    .trim()
    .optional(),

  motherContactNo: z
    .string({
      invalid_type_error: 'Mother Contact No must be string',
    })
    .trim()
    .optional(),
});

const updateLocalGuardianSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be string',
    })
    .trim()
    .optional(),

  occupation: z
    .string({
      invalid_type_error: 'Occupation must be string',
    })
    .trim()
    .optional(),

  contactNo: z
    .string({
      invalid_type_error: 'Contact No must be string',
    })
    .trim()
    .optional(),

  address: z
    .string({
      invalid_type_error: 'Address must be string',
    })
    .trim()
    .optional(),
});

const updateStudentValidationSchema = z.object({
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

  name: updateUserNameSchema,

  gender: z
    .enum(['male', 'female', 'other'], {
      errorMap: () => ({ message: 'Invalid gender' }),
    })
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

  guardian: updateGuardianSchema,

  localGuardian: updateLocalGuardianSchema,

  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string',
    })
    .trim()
    .optional(),

  admissionSemester: z
    .string({
      invalid_type_error: 'Admission semester must be string',
    })
    .trim()
    .optional(),
  academicDepartment: z
    .string({
      invalid_type_error: 'Academic department must be string',
    })
    .trim()
    .optional(),

  isDeleted: z.boolean().optional().default(false),
});

export const StudentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
