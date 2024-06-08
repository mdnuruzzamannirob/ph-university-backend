import QueryBuilder from '../../builder/QueryBuilder';
import { departmentSearchableFields } from './academicDepartment.constant';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async (
  query: Record<string, unknown>,
) => {
  const departmentQuery = new QueryBuilder(
    AcademicDepartmentModel.find().populate('academicFaculty'),
    query,
  )
    .search(departmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await departmentQuery.modelQuery;
  return result;
};

const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result =
    await AcademicDepartmentModel.findById(_id).populate('academicFaculty');
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  _id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
