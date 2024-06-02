import { Types } from 'mongoose';
import { z } from 'zod';

// Custom Zod validator for MongoDB ObjectID
const objectId = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId',
});

const userNameSchema = z.object({
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
    .string()
    .trim()
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

const guardianSchema = z.object({
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

const localGuardianSchema = z.object({
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

const studentValidationSchema = z.object({
  id: z
    .string({
      invalid_type_error: 'id must be string',
      required_error: 'id is required',
    })
    .trim(),

  user: objectId,

  email: z
    .string({
      required_error: 'Email is required',
    })
    .trim()
    .email({ message: 'Invalid email format' }),

  name: userNameSchema,

  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Invalid gender' }),
  }),

  dateOfBirth: z
    .string({
      invalid_type_error: 'Date of birth must be string',
      required_error: 'Date of birth is required',
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

  guardian: guardianSchema,

  localGuardian: localGuardianSchema,

  profileImg: z
    .string({
      invalid_type_error: 'Profile image must be string',
      required_error: 'Profile image is required',
    })
    .trim()
    .optional(),

  admissionSemester: z
    .string({
      invalid_type_error: 'AdmissionSemester must be string',
      required_error: 'Admission Semester is required',
    })
    .trim()
    .optional(),

  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
