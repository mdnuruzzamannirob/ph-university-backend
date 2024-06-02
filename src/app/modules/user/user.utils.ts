import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

// find last student Id
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentStudentId = (await findLastStudentId()) || '0';

  const incrementId = (Number(currentStudentId) + 1)
    .toString()
    .padStart(4, '0');

  return `${payload.year}${payload.code}${incrementId}`;
};
