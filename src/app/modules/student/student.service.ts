import { startSession } from 'mongoose';
import { TStudent } from './student.interface';
import { StudentModel } from './student.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { NextFunction } from 'express';

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // searching
  let searchTerm = '';
  if (query.searchTerm) searchTerm = query?.searchTerm as string;

  const searchQuery = StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  // filtering
  const queryObject = { ...query };

  const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
  excludeFields.forEach((field) => delete queryObject[field]); // remove excludeFields

  const filterQuery = searchQuery
    .find(queryObject)
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // sorting
  let sort = '-createdAt';
  if (query.sort) sort = query.sort as string;

  const sortQuery = filterQuery.sort(sort);

  // paginating and limiting
  let page = 1;
  let limit = 1;
  let skip = 0;

  if (query.limit) limit = Number(query.limit);
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  // limiting
  let fields = '-__v';

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }

  const fieldsQuery = await limitQuery.select(fields);
  return fieldsQuery;
};

const updateStudentInoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedStudentData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteStudentFromDB = async (id: string, next: NextFunction) => {
  const session = await startSession();

  try {
    session.startTransaction();

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.commitTransaction();
    await session.endSession();
    next(error);
  }
};

export const StudentServices = {
  getSingleStudentFromDB,
  getAllStudentsFromDB,
  updateStudentInoDB,
  deleteStudentFromDB,
};
