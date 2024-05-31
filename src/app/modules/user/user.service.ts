import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password not given, use default password
  userData.password = password || (config.default_password as string);

  // set a role
  userData.role = 'student';

  //set manually generated it
  userData.id = '20240001';

  const result = await UserModel.create(userData);

  if (Object.keys(result).length) {
    // set id , _id as user
    studentData.id = result.id;
    studentData.user = result._id;

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
