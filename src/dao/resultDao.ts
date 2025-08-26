import Result, { IResult } from "../models/Result";
import Student from "../models/Student";
import { Types } from "mongoose";
import { ClassEnum, ResultStatus } from "../utils/enums";

/**
 * Create a new result entry for a student.
 * Ensures uniqueness by class + rollNumber (via student).
 */
export const createResultDao = async (
  rollNumber: number,
  studentClass: ClassEnum,
  status: ResultStatus,
  marks: number
): Promise<IResult | null> => {
  // find the student first
  const student = await Student.findOne({
    rollNumber,
    class: studentClass,
  }).exec();

  if (!student) {
    throw new Error("Student not found for given class and roll number");
  }

  // check if result already exists for this student + rollNumber
  const existingResult = await Result.findOne({
    class: studentClass,
    rollNumber,
    studentId: student._id,
  }).exec();

  if (existingResult) {
    return null; // already exists
  }

  const result = new Result({
    _id: new Types.ObjectId(),
    class: studentClass,
    rollNumber,
    studentId: student._id,
    status,
    marks, // 🔹 Added
  });

  return await result.save();
};

/**
 * Find a result by class and roll number.
 */
export const findResultByClassAndRollDao = async (
  rollNumber: number,
  studentClass: ClassEnum
): Promise<IResult | null> => {
  return await Result.findOne({ class: studentClass, rollNumber })
    .populate({
      path: "studentId",
      match: { rollNumber, class: studentClass },
    })
    .exec();
};

/**
 * Check existence of result (class + rollNumber unique).
 */
export const resultExistsDao = async (
  rollNumber: number,
  studentClass: ClassEnum
): Promise<boolean> => {
  const result = await Result.findOne({
    class: studentClass,
    rollNumber,
  }).exec();

  return !!result;
};

export const findResultsDao = async (filters: {
  class?: string;
  rollNumber?: number;
}) => {
  const query: any = {};
  if (filters.class) query.class = filters.class;
  if (filters.rollNumber) query.rollNumber = filters.rollNumber;

  return await Result.find(query)
    .populate({
      path: "studentId",
      select: "name rollNumber", // still useful for student name
    })
    .exec();
};

export const deleteResultByIdDao = async (id: string) => {
  return await Result.findByIdAndDelete(id).exec();
};

export const deleteAllResultsDao = async () => {
  return await Result.deleteMany({}).exec();
};







// import Result, { IResult } from "../models/Result";
// import Student from "../models/Student";
// import { Types } from "mongoose";
// import { ClassEnum, ResultStatus } from "../utils/enums";

// /**
//  * Create a new result entry for a student.
//  * Ensures uniqueness by class + rollNumber (via student).
//  */
// export const createResultDao = async (
//   rollNumber: number,
//   studentClass: ClassEnum,
//   status: ResultStatus
// ): Promise<IResult | null> => {
//   // find the student first
//   const student = await Student.findOne({
//     rollNumber,
//     class: studentClass,
//   }).exec();

//   if (!student) {
//     throw new Error("Student not found for given class and roll number");
//   }

//   // check if result already exists for this student + rollNumber
//   const existingResult = await Result.findOne({
//     class: studentClass,
//     rollNumber,
//     studentId: student._id,
//   }).exec();

//   if (existingResult) {
//     return null; // already exists
//   }

//   const result = new Result({
//     _id: new Types.ObjectId(),
//     class: studentClass,
//     rollNumber, // 🔹 added field
//     studentId: student._id,
//     status,
//   });

//   return await result.save();
// };

// /**
//  * Find a result by class and roll number.
//  */
// export const findResultByClassAndRollDao = async (
//   rollNumber: number,
//   studentClass: ClassEnum
// ): Promise<IResult | null> => {
//   return await Result.findOne({ class: studentClass, rollNumber })
//     .populate({
//       path: "studentId",
//       match: { rollNumber, class: studentClass },
//     })
//     .exec();
// };

// /**
//  * Check existence of result (class + rollNumber unique).
//  */
// export const resultExistsDao = async (
//   rollNumber: number,
//   studentClass: ClassEnum
// ): Promise<boolean> => {
//   const result = await Result.findOne({
//     class: studentClass,
//     rollNumber,
//   }).exec();

//   return !!result;
// };

// export const findResultsDao = async (filters: {
//   class?: string;
//   rollNumber?: number;
// }) => {
//   const query: any = {};
//   if (filters.class) query.class = filters.class;
//   if (filters.rollNumber) query.rollNumber = filters.rollNumber;

//   return await Result.find(query)
//     .populate({
//       path: "studentId",
//       select: "name rollNumber", // still useful for student name
//     })
//     .exec();
// };

// export const deleteResultByIdDao = async (id: string) => {
//   return await Result.findByIdAndDelete(id).exec();
// };

// export const deleteAllResultsDao = async () => {
//   return await Result.deleteMany({}).exec();
// };
