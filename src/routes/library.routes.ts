import express from "express";
import {
  addOrUpdateLibraryBook,
  searchLibraryBooks,
} from "../controllers/library.controller";

const router = express.Router();

// Add/Update book
router.post("/", addOrUpdateLibraryBook);

router.get("/search", searchLibraryBooks);

export default router;
