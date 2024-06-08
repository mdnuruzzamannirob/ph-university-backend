import { startSession } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';
import { FacultyModel } from '../faculty/faculty.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { TFaculty } from '../faculty/faculty.interface';
import { TAdmin } from '../admin/admin.interface';
import { AdminModel } from '../admin/admin.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // find email exist or not
  const emailExists = await StudentModel.findOne({ email: payload.email });
  if (emailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists !');
  }

  // find academic semester information
  const academicDepartmentExists = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!academicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found !');
  }

  // find academic semester information
  const admissionSemester = (await AcademicSemesterModel.findById(
    payload.admissionSemester,
  )) as TAcademicSemester | null;
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found !');
  }

  // if password not given, use default password
  userData.password = password || (config.default_password as string);

  const session = await startSession();
  try {
    session.startTransaction();

    // set automatic generated id
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await UserModel.create([userData], { session }); // return array

    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new user !',
      );
    }

    // set id , _id as user
    payload.id = newUser[0]?.id;
    payload.user = newUser[0]?._id;

    const newStudent = await StudentModel.create([payload], { session }); // return array

    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new student !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error: any) {
    await session.commitTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // find email exist or not
  const emailExists = await FacultyModel.findOne({ email: payload.email });
  if (emailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists !');
  }

  // find academic faculty information
  const academicFacultyExists = await AcademicFacultyModel.findById(
    payload.academicFaculty,
  );
  if (!academicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found !');
  }

  // find academic department information
  const academicDepartmentExists = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  if (!academicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found !');
  }

  // if password not given, use default password
  userData.password = password || (config.default_password as string);
  //set faculty role
  userData.role = 'faculty';

  const session = await startSession();
  try {
    session.startTransaction();

    // set automatic generated id
    userData.id = await generateFacultyId();

    const newUser = await UserModel.create([userData], { session }); // return array

    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new user !',
      );
    }

    // set id , _id as user
    payload.id = newUser[0]?.id;
    payload.user = newUser[0]?._id;

    const newFaculty = await FacultyModel.create([payload], { session }); // return array

    if (!newFaculty.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new faculty !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error: any) {
    await session.commitTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // find email exist or not
  const emailExists = await FacultyModel.findOne({ email: payload.email });
  if (emailExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists !');
  }

  // // find academic department information
  // const managementDepartmentExists = await AcademicDepartmentModel.findById(
  //   payload.academicDepartment,
  // );
  // if (!academicDepartmentExists) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found !');
  // }

  // if password not given, use default password
  userData.password = password || (config.default_password as string);
  //set faculty role
  userData.role = 'admin';

  const session = await startSession();
  try {
    session.startTransaction();

    // set automatic generated id
    userData.id = await generateAdminId();

    const newUser = await UserModel.create([userData], { session }); // return array

    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new user !',
      );
    }

    // set id , _id as user
    payload.id = newUser[0]?.id;
    payload.user = newUser[0]?._id;

    const newAdmin = await AdminModel.create([payload], { session }); // return array

    if (!newAdmin.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new admin !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.commitTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(UserModel.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ id });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getSingleUserFromDB,
  getAllUsersFromDB,
};
