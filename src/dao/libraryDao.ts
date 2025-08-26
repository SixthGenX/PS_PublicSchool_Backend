import mongoose, { Types } from "mongoose";
import Library, { ILibrary } from "../models/Library";
import Student, { IStudent } from "../models/Student";
import { BookStatus, ClassEnum } from "../utils/enums";
import { createStudentIfNotExistsDao } from "./studentDao";

/**
 * Creates a library book entry if not already exists
 * @param bookNumber Unique number of the book
 * @param bookTitle Title of the book
 * @param status Status of the book (default: AVAILABLE)
 * @param studentId Optional studentId if the book is issued
 * @returns ILibrary | null
 */
export const createLibraryBookIfNotExistsDao = async (
  bookNumber: number,
  bookTitle: string,
  status: BookStatus = BookStatus.AVAILABLE,
  studentId?: string
): Promise<ILibrary | null> => {
  const existing = await Library.findOne({ bookNumber }).exec();

  if (existing) {
    return null;
  }

  const book = new Library({
    bookNumber,
    bookTitle,
    status,
    studentId: studentId || null,
  });

  return await book.save();
};

export const addOrUpdateLibraryBookDao = async (
  bookTitle: string,
  bookNumber: number,
  className: ClassEnum,
  studentName: string,
  rollNumber: number,
  issuedTo: string | null,
  bookStatus: BookStatus
): Promise<ILibrary> => {
  // Step 1: Ensure student exists
  let student: IStudent | null = null;

  if (issuedTo) {
    student = await Student.findById(issuedTo).exec();
    if (!student) {
      throw new Error("Invalid student ID provided");
    }
  } else {
    // Auto-create student if rollNo given
    if (studentName && rollNumber) {
      student = await createStudentIfNotExistsDao(
        bookTitle + "_holder", // fallback name
        className,
        rollNumber
      );
    }
  }

  // Step 2: Check if book exists (fix here 👇)
  let existingBook = await Library.findOne({ bookNumber }).exec();

  if (existingBook) {
    // Update existing
    existingBook.bookStatus = bookStatus;
    if (student?._id) {
      existingBook.issuedTo = new Types.ObjectId(student._id.toString());
    }
    return await existingBook.save();
  }

  // Step 3: Create new
  const newBook = new Library({
    bookTitle,
    bookNumber,
    class: className,
    issuedTo: student?._id ? new Types.ObjectId(student._id.toString()) : null,
    bookStatus,
  });

  return await newBook.save();
};

export const searchLibraryBooksDao = async (
  search: string
): Promise<ILibrary[]> => {
  const conditions: any[] = [];

  // 1. If it's a number → check numeric fields
  if (!isNaN(Number(search))) {
    conditions.push({ bookNumber: Number(search) });
    conditions.push({ rollNo: Number(search) });
  }

  // 2. If it's a valid ObjectId → check studentId or _id
  if (mongoose.Types.ObjectId.isValid(search)) {
    conditions.push({ issuedTo: new mongoose.Types.ObjectId(search) });
    conditions.push({ _id: new mongoose.Types.ObjectId(search) });
  }

  // 3. Always allow regex for string fields
  conditions.push({ bookTitle: { $regex: search, $options: "i" } });
  conditions.push({ bookStatus: { $regex: search, $options: "i" } });

  // Build OR query
  const query = conditions.length > 0 ? { $or: conditions } : {};

  return await Library.find(query).exec();
};

export const getTotalBooksDao = async (
  assignedOnly?: boolean
): Promise<ILibrary[]> => {
  const query: any = {};
  if (assignedOnly) {
    query.issuedTo = { $ne: null };
  }

  return await Library.find(query)
    .populate("issuedTo", "name class rollNumber")
    .exec();
};
