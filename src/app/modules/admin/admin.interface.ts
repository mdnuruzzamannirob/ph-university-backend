import { Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TAdminName;
  email: string;
  gender: 'male' | 'female' | 'other';
  contactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profileImg?: string;
  dateOfBirth?: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: Types.ObjectId;
  isDeleted: boolean;
};
