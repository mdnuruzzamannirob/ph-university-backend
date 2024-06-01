import { academicSemesterNameCodeChecker } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name equal semester code checker
  if (academicSemesterNameCodeChecker[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code !');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
