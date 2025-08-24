import express from "express";
import {
  addOrUpdateLibraryBook,
  getTotalBooks,
  searchLibraryBooks,
} from "../controllers/library.controller";
import { isAdmin } from "../middlewares/admin.middleware";

const router = express.Router();

// Add/Update book
router.post("/", isAdmin, addOrUpdateLibraryBook);

router.get("/search", searchLibraryBooks);

router.get("/total", getTotalBooks);

export default router;
