import { Types } from 'mongoose';

export type TFacultyName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultyName;
  email: string;
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profileImg?: string;
  dateOfBirth?: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};
