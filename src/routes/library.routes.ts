import express from "express";
import {
  addOrUpdateLibraryBook,
  getTotalBooks,
  searchLibraryBooks,
} from "../controllers/library.controller";

const router = express.Router();

// Add/Update book
router.post("/", addOrUpdateLibraryBook);

router.get("/search", searchLibraryBooks);

router.get("/total", getTotalBooks);

export default router;
