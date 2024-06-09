import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(CourseModel.find(), query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (_id: string) => {
  const result = await CourseModel.findById(_id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (_id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await startSession();
  try {
    session.startTransaction();

    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      _id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course !');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // filtering the deleted fields
      const deletePreRequisiteCourses = preRequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((elem) => elem.course);

      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        _id,
        {
          $pull: {
            preRequisiteCourses: { $in: deletePreRequisiteCourses },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete course !');
      }

      const newPreRequisiteCourses = preRequisiteCourses.filter(
        (elem) => elem.course && !elem.isDeleted,
      );

      const addNewPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        _id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisiteCourses },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!addNewPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course !');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(_id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const deleteCourseFromDB = async (_id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    _id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
