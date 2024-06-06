import { startSession } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const session = await startSession();

  // create a user object
  const userData: Partial<TUser> = {};

  try {
    session.startTransaction();

    // find email exist or not
    const emailExists = await StudentModel.findOne({ email: payload.email });

    if (emailExists) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Email already exists !');
    }

    // if password not given, use default password
    userData.password = password || (config.default_password as string);

    // set a role
    userData.role = 'student';

    // find academic semester information
    const admissionSemester = (await AcademicSemesterModel.findById(
      payload.admissionSemester,
    )) as TAcademicSemester | null;

    if (!admissionSemester) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
    }

    // set automatic generated id
    userData.id = await generateStudentId(admissionSemester);

    const newUser = await UserModel.create([userData], { session }); // return array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to crete a new user');
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newStudent = await StudentModel.create([payload], { session }); // return array

    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to crete a new student',
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

export const UserServices = {
  createStudentIntoDB,
};
