import Student, { IStudent } from "../models/Student";
import { ClassEnum } from "../utils/enums";

export const createStudentIfNotExistsDao = async (
  name: string,
  className: ClassEnum,
  rollNumber: number
): Promise<IStudent | null> => {
  const existing = await Student.findOne({
    class: className,
    rollNumber,
  }).exec();

  if (existing) {
    return null;
  }

  const student = new Student({
    name,
    class: className,
    rollNumber,
  });

  return await student.save();
};
