import QueryBuilder from '../../builder/QueryBuilder';
import {
  academicSemesterNameCodeChecker,
  semesterSearchableFields,
} from './academicSemester.constant';
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

const getAllAcademicSemesterFromDB = async (query: Record<string, unknown>) => {
  const semesterQuery = new QueryBuilder(AcademicSemesterModel.find(), query)
    .search(semesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterQuery.modelQuery;
  return result;
};

const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemesterModel.findById(_id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  _id: string,
  payload: Partial<TAcademicSemester>,
) => {
  // semester name equal semester code checker
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeChecker[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code !');
  }

  const result = await AcademicSemesterModel.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
