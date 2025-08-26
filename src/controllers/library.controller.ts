import { Request, Response, NextFunction } from "express";
import {
  addOrUpdateLibraryBookDao,
  getTotalBooksDao,
  searchLibraryBooksDao,
} from "../dao/libraryDao";
import { libraryBookValidation } from "../validations/library.validator";
import ApplicationError, { ApiCodes } from "../models/apiModel/ApiCode";
import { createResponse } from "../utils/apiUtils/apiUtils";
export const addOrUpdateLibraryBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await libraryBookValidation.validateAsync(req.body);

    const {
      bookTitle,
      bookNumber,
      class: className,
      rollNo,
      studentName,
      issuedTo,
      bookStatus,
    } = req.body;

    const result = await addOrUpdateLibraryBookDao(
      bookTitle,
      bookNumber,
      className,
      studentName,
      rollNo,
      issuedTo || null,
      bookStatus
    );

    res.status(ApiCodes.SUCCESS.statusCode).json(
      createResponse(result, {
        ...ApiCodes.SUCCESS,
        message: "Book added/updated successfully",
      })
    );
  } catch (err: any) {
    console.error("Error processing library request", err);
    next(err);
  }
};

export const searchLibraryBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;

    if (!search || typeof search !== "string") {
      throw new ApplicationError({
        ...ApiCodes.BAD_REQUEST,
        message: "Search query is required and must be a string",
      });
    }

    const results = await searchLibraryBooksDao(search);

    res.status(ApiCodes.SUCCESS.statusCode).json(
      createResponse(results, {
        ...ApiCodes.SUCCESS,
        message: results.length
          ? "Books found successfully"
          : "No books matched your search",
      })
    );
  } catch (error: any) {
    console.error("Error searching books:", error);
    next(error);
  }
};

export const getTotalBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const assignedOnlyFlag = req.query.assignedOnly === "true"; // optional query param
    const books = await getTotalBooksDao(assignedOnlyFlag);

    res.status(ApiCodes.SUCCESS.statusCode).json(
      createResponse(
        {
          totalBooks: books.length,
          books,
        },
        ApiCodes.SUCCESS
      )
    );
  } catch (err: any) {
    console.error("Error fetching total books:", err);
    next(err);
  }
};




import { deleteLibraryBookDao } from "../dao/libraryDao";

export const deleteLibraryBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ApplicationError({
        ...ApiCodes.BAD_REQUEST,
        message: "Book ID is required",
      });
    }

    const deletedBook = await deleteLibraryBookDao(id);

    if (!deletedBook) {
      throw new ApplicationError({
        ...ApiCodes.NOT_FOUND,
        message: "Book not found or already deleted",
      });
    }

    res.status(ApiCodes.SUCCESS.statusCode).json(
      createResponse(deletedBook, {
        ...ApiCodes.SUCCESS,
        message: "Book deleted successfully",
      })
    );
  } catch (err: any) {
    console.error("Error deleting library book:", err);
    next(err);
  }
};
