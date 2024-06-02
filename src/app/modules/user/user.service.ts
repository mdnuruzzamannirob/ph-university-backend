import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not given, use default password
  userData.password = password || (config.default_password as string);

  // set a role
  userData.role = 'student';

  // find academic semester information
  const admissionSemester = (await AcademicSemesterModel.findById(
    payload.admissionSemester,
  )) as TAcademicSemester | null;

  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  // set automatic generated id
  userData.id = await generateStudentId(admissionSemester);

  // set manually generated id
  // userData.id = '20240002';

  const newUser = await UserModel.create(userData);

  if (newUser) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }

  throw new Error('Failed to create new user');
};

export const UserServices = {
  createStudentIntoDB,
};
