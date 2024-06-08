import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableFields } from './academicFaculty.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const facultyQuery = new QueryBuilder(AcademicFacultyModel.find(), query)
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFacultyModel.findById(_id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  _id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFacultyModel.findByIdAndUpdate(_id, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
