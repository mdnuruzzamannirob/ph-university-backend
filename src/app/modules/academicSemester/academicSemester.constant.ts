import {
  TAcademicSemesterNameCodeChecker,
  TSemesterCode,
  TSemesterMonths,
  TSemesterName,
} from './academicSemester.interface';

export const semesterName: TSemesterName[] = ['Autumn', 'Summer', 'Fall'];

export const semesterCode: TSemesterCode[] = ['01', '02', '03'];

export const semesterMonths: TSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterNameCodeChecker: TAcademicSemesterNameCodeChecker =
  {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

export const semesterSearchableFields = [
  'name',
  'year',
  'code',
  'startMonth',
  'endMonth',
];
