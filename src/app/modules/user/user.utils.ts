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

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentStudentId = '0';
  const lastStudentId = await findLastStudentId();

  // example : 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030
  const currentCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentCode &&
    lastStudentYear === currentYear
  ) {
    currentStudentId = lastStudentId.substring(6); // 0001
  }
  const incrementId = (Number(currentStudentId) + 1)
    .toString()
    .padStart(4, '0');

  return `${payload.year}${payload.code}${incrementId}`;
};

// find last faculty Id
const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    { role: 'faculty' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id : undefined;
};

export const generateFacultyId = async () => {
  let currentFacultyId = '0';
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentFacultyId = lastFacultyId.substring(2);
  }

  const incrementId = (Number(currentFacultyId) + 1)
    .toString()
    .padStart(4, '0');

  return `F-${incrementId}`;
};

// find last admin id
const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    { role: 'admin' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id : undefined;
};

export const generateAdminId = async () => {
  let currentAdminId = '0';
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentAdminId = lastAdminId.substring(2);
  }

  const incrementId = (Number(currentAdminId) + 1).toString().padStart(4, '0');

  return `A-${incrementId}`;
};
