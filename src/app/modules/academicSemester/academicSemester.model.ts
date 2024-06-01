import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  semesterCode,
  semesterMonths,
  semesterName,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: semesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: semesterMonths,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExist) {
    throw new Error('Semester already exists !');
  }

  next();
});

// Pre-hook for findOneAndUpdate
academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as Partial<TAcademicSemester>;

  // Extracting name and year from the update object
  const name = update.name;
  const year = update.year;

  // Checking if the name and year are being updated
  if (name && year) {
    const isSemesterExist = await AcademicSemesterModel.findOne({
      name,
      year,
    });

    if (isSemesterExist) {
      throw new Error('Semester already exists !');
    }
  }

  next();
});

export const AcademicSemesterModel = model<TAcademicSemester>(
  'Academic-Semester',
  academicSemesterSchema,
);
