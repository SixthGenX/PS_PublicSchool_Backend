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
  status: ResultStatus
): Promise<IResult | null> => {
  // find the student first
  const student = await Student.findOne({
    rollNumber,
    class: studentClass,
  }).exec();

  if (!student) {
    throw new Error("Student not found for given class and roll number");
  }

  // check if result already exists for this student
  const existingResult = await Result.findOne({
    class: studentClass,
    studentId: student._id,
  }).exec();

  if (existingResult) {
    return null; // means already exists, no new creation
  }

  const result = new Result({
    _id: new Types.ObjectId(),
    class: studentClass,
    studentId: student._id,
    status,
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
  return await Result.findOne({ class: studentClass })
    .populate({
      path: "studentId",
      match: { rollNumber, class: studentClass }, // ensures correct student
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
  const student = await Student.findOne({
    rollNumber,
    class: studentClass,
  }).exec();

  if (!student) return false;

  const result = await Result.findOne({
    class: studentClass,
    studentId: student._id,
  }).exec();

  return !!result;
};
