export type TSemesterName = 'Autumn' | 'Summer' | 'Fall';

export type TSemesterCode = '01' | '02' | '03';

export type TSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSemester = {
  name: TSemesterName;
  year: string;
  code: TSemesterCode;
  startMonth: TSemesterMonths;
  endMonth: TSemesterMonths;
};

export type TAcademicSemesterNameCodeChecker = {
  [key: string]: string;
};
