import { z } from 'zod';
import {
  semesterCode,
  semesterMonths,
  semesterName,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  name: z.enum([...semesterName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...semesterCode] as [string, ...string[]]),
  startMonth: z.enum([...semesterMonths] as [string, ...string[]]),
  endMonth: z.enum([...semesterMonths] as [string, ...string[]]),
});

const updateAcademicSemesterValidationSchema = z.object({
  name: z.enum([...semesterName] as [string, ...string[]]).optional(),
  year: z.string().optional(),
  code: z.enum([...semesterCode] as [string, ...string[]]).optional(),
  startMonth: z.enum([...semesterMonths] as [string, ...string[]]).optional(),
  endMonth: z.enum([...semesterMonths] as [string, ...string[]]).optional(),
});

export const academicSemesterValidators = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
