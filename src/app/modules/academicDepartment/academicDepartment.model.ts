import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Academic-Faculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exist!',
    );
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartmentModel.findOne({
    query,
  });

  if (!isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department does not exist! ',
    );
  }
  next();
});

export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'Academic-Department',
  academicDepartmentSchema,
);
