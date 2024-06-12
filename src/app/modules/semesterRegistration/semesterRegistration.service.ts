import QueryBuilder from '../../builder/QueryBuilder';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // semester name equal semester code checker
  //   if (academicSemesterNameCodeChecker[payload.name] !== payload.code) {
  //     throw new Error('Invalid Semester Code !');
  //   }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterQuery = new QueryBuilder(
    SemesterRegistrationModel.find(),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (_id: string) => {
  const result = await SemesterRegistrationModel.findById(_id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  _id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // semester name equal semester code checker
  //   if (
  //     payload.name &&
  //     payload.code &&
  //     academicSemesterNameCodeChecker[payload.name] !== payload.code
  //   ) {
  //     throw new Error('Invalid Semester Code !');
  //   }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    _id,
    payload,
    {
      new: true,
    },
  );
  return result;
};

const deleteSemesterRegistrationFromDB = async (
  _id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // semester name equal semester code checker
  //   if (
  //     payload.name &&
  //     payload.code &&
  //     academicSemesterNameCodeChecker[payload.name] !== payload.code
  //   ) {
  //     throw new Error('Invalid Semester Code !');
  //   }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    _id,
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
